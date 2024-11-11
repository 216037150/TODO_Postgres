const { Client } = pkg;
import pkg from "pg";

// Database connection
const db = new Client({
  user: "siyabonga",
  host: "localhost",
  database: "todotask_db",
  password: "Siya@100",
  port: 5432,
});

//Test connection
async function connectDb() {
  try {
    await db.connect();
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.error("Failed to connect:", error.message);
  }
}
connectDb();
export default db
