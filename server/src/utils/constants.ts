import path from "node:path";

const SRC_DIR = path.join(process.cwd(), "src");

const TEMPLATE_DIR = path.join(SRC_DIR, "modules/email/templates");

export { SRC_DIR, TEMPLATE_DIR };
