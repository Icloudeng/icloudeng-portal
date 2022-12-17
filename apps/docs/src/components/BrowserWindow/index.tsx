import React, { type ReactNode, useState, useEffect } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
  minHeight?: number;
  url: string;
}

export default function BrowserWindow({
  children,
  minHeight,
  url = "",
}: Props): JSX.Element {
  const [nurl, setNurl] = useState(url);

  useEffect(() => {
    setNurl(window.location.origin);
  }, []);

  return (
    <div className={styles.browserWindow} style={{ minHeight }}>
      <div className={styles.browserWindowHeader}>
        <div className={styles.buttons}>
          <span className={styles.dot} style={{ background: "#f25f58" }} />
          <span className={styles.dot} style={{ background: "#fbbe3c" }} />
          <span className={styles.dot} style={{ background: "#58cb42" }} />
        </div>
        <div className={clsx(styles.browserWindowAddressBar, "text--truncate")}>
          {nurl}
        </div>
        <div className={styles.browserWindowMenuIcon}>
          <div>
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </div>
        </div>
      </div>

      <div className={styles.browserWindowBody}>{children}</div>
    </div>
  );
}