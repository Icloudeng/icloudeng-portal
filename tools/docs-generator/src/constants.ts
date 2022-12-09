import path from "path";

export const DOCS_APP_PATH = path.resolve(process.cwd(), "../../apps/docs");

export const PROJECT_ROOT_PATH = path.resolve(process.cwd(), "../../");

export const DOCS_APP_NAME = "docs";

export const PM2_NAME = process.env.PM2_NAME;

export const I18N_PATH = path.resolve(DOCS_APP_PATH, "i18n");

export const I18N_FILES = {
  current: "docusaurus-plugin-content-docs/current.json",
  footer: "docusaurus-theme-classic/footer.json",
  navbar: "docusaurus-theme-classic/navbar.json",
  code: "code.json",
} as const;

export const I18N_CONTENT_DOCS_FOLDER = "docusaurus-plugin-content-docs";
export const CONTENT_DOCS_PATH = path.resolve(DOCS_APP_PATH, "docs");

export const METAFILE_PATH = path.resolve(DOCS_APP_PATH, "meta.json");

const url = process.env.DIRECTUS_URL || "";
export const DIRECTUS_URL = url.endsWith("/")
  ? url.slice(0, url.length - 1)
  : url;

export const DIRECTUS_HOST = process.env.DIRECTUS_HOST || "";

export const DIRECTUS_STATIC_TOKEN = process.env.DIRECTUS_STATIC_TOKEN || "";

export const WEBSITE_URL = process.env.WEBSITE_URL || "";

export const IN_PROD = process.env.ENV === "prod";

export const DEFAULT_LANG = process.env.DEFAULT_LANG || "en";
export const DEFAULT_LANG_NAME = process.env.DEFAULT_LANG_NAME || "English";
