import "dotenv/config";
import server from "./server.js";
import pool from "./config/db.js";
import transporter from "./modules/email/transporter.js";

const PORT = process.env.PORT;

async function main() {
  try {
    server.listen(PORT, async () => {
      console.log(`Listing at port ${PORT}`);
      const connection = await pool.getConnection();
      console.log(`Database Connected`);
      connection.release();
      await transporter.verify();
      console.log("Mail Service is working");
    });
  } catch (error) {
    console.error(`[INDEX FILE ERROR]: ${error}`);
  }
}

main();
