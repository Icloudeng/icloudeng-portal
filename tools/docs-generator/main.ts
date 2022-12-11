import "./src/env";
import debounce from "lodash/debounce";
import { connect, DataPayload, DataType } from "@apps/docs-pubsub";
import { Logger } from "./src/logger";
import { createLogQuery, getCompanyDetailsQuery } from "./src/cms/queries";
import { execFooterEvent, execGenerateAllEvent } from "./src/executors";
import { IN_PROD, DEBOUNCE_EXECUTOR } from "./src/constants";
import { executorQueue } from "./src/queue";

/**
 * --------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------
 * !IMPORTANT
 * For now we're not handle each event action particulary, means normaly we should handle them
 * by providing the correspond process or executor, for item delete, create, updateF
 * --------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------
 * --------------------------------------------------------------------------------------
 */

const client = connect(); // Init redis connection
const TIMEOUT_PROCESS = DEBOUNCE_EXECUTOR ? 2 * 60000 : 5000; // 2 minutes if DEBOUNCE, otherwise 5 seconds

async function main() {
  const subscriber = await client;

  IN_PROD && Logger.info("=============== PROD Observing =================");
  !IN_PROD && Logger.info("=============== DEV Observing =================");
  DEBOUNCE_EXECUTOR &&
    Logger.info("======== Running with DEBOUNCE_EXECUTOR ========");

  /**
   * Start observing
   */
  subscriber.subscribe(process);
}
main();

/**
 * Process data
 *
 * @param param0
 */
async function process({ type, data }: { type: DataType; data: DataPayload }) {
  Logger.info(`New Event, type: ${type} | event: ${data.event}`);

  const company_details = await getCompanyDetailsQuery();
  if (!company_details) {
    Logger.warn("Company details must be set from cms to complete the process");
    return;
  }

  /**
   * For languages, namespaces and pages alway rebuild whole docs app
   * !important this is not good for optimization spacialy when there are many content,
   * !we should handle every event action (create, update, delete) on its own logic or executorF
   */
  if (
    type === "languages" ||
    type === "namespaces" ||
    type === "pages" ||
    type === "meta"
  ) {
    IN_PROD && processGenerateAllDebounce(type, data);
    !IN_PROD && processGenerateAll(type, data);

    /**
     * Footer event
     */
  } else if (type === "footer") {
    IN_PROD && processGenerateFooterDebounce(type, data);
    !IN_PROD && processGenerateFooter(type, data);
  }
}

/**
 * Proccess generate all
 * @param type
 * @param data
 */
const processGenerateAll = (type: DataType, data: DataPayload) => {
  logEvent(`All Docs - Executor, type: ${type} | event: ${data.event}`);
  executorQueue.exec(execGenerateAllEvent);
};
const processGenerateAllDebounce = debounce(
  processGenerateAll,
  TIMEOUT_PROCESS
);

/**
 * Proccess generate footer
 *
 * @param type
 * @param data
 */
const processGenerateFooter = (type: DataType, data: DataPayload) => {
  logEvent(`Footer - Executor, type: ${type} | event: ${data.event}`);
  executorQueue.exec(execFooterEvent);
};
const processGenerateFooterDebounce = debounce(
  processGenerateFooter,
  TIMEOUT_PROCESS
);

// ================================================ Logger =================================//
function logEvent(message: string) {
  createLogQuery({ log: message + ` (PROD: ${IN_PROD})`, type: "info" }).catch(
    console.error
  );
  Logger.info(message + ` (PROD: ${IN_PROD})`);
}
