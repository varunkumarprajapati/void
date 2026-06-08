import pool from "./db.js";
import fs from "node:fs/promises";
import path from "node:path";
// 1. Get the absolute path to your migrations folder
// Assuming your folder structure is: src/config/migrations/
const MIGRATIONS_DIR = path.join(process.cwd(), "src", "config", "migrations");

async function runMigrations() {
  try {
    // Create tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const [rows] = await pool.query("SELECT name FROM migrations");
    const executed = new Set((rows as any[]).map((r) => r.name));

    // 2. Use the absolute path here
    const files = (await fs.readdir(MIGRATIONS_DIR))
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      if (!executed.has(file)) {
        console.log(`🚀 Running migration: ${file}`);

        // 3. Use the same absolute path for reading the file
        const filePath = path.join(MIGRATIONS_DIR, file);
        const sql = await fs.readFile(filePath, "utf-8");

        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction(); // Start a transaction

          // Execute the migration SQL
          // Note: If your .sql file has multiple queries,
          // ensure your pool is configured with multipleStatements: true
          await conn.query(sql);

          // Mark as executed
          await conn.query("INSERT INTO migrations (name) VALUES (?)", [file]);

          await conn.commit();
          console.log(`✅ Success: ${file}`);
        } catch (err) {
          await conn.rollback();
          console.error(`❌ Failed: ${file}`, err);
          throw err;
        } finally {
          conn.release();
        }
      }
    }
    console.log("⭐ All migrations processed.");
  } catch (error) {
    console.error("Migration error:", error);
  } finally {
    process.exit(1);
  }
}

runMigrations();
