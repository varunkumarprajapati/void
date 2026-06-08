import path from "node:path";
import fs from "node:fs";

const MIGRATION_DIR = path.join(process.cwd(), "src", "config", "migrations");
const migrationName = process.argv[2];

if (!migrationName) {
  console.error("❌ Please provide a name: npm run migration:create <name>");
  process.exit(1);
}

if (!fs.existsSync(MIGRATION_DIR)) {
  fs.mkdirSync(MIGRATION_DIR);
}

const timestamp = new Date().getTime();
const fileName = `${timestamp}_${migrationName.replace(/\s+/g, "_")}.sql`;
const filePath = path.join(MIGRATION_DIR, fileName);

const template = `
-- Migration: ${migrationName}
-- Created at: ${new Date().toISOString()}

START TRANSACTION;

-- ---------------------------------------------------------
-- Write your UP migration here
-- ---------------------------------------------------------

-- Example: CREATE TABLE test (id INT);


COMMIT;
`;
try {
  fs.writeFileSync(filePath, template);
  console.log(`✅ Migration created: ./migrations/${fileName}`);
} catch (err) {
  console.error("❌ Error creating file:", err);
}
