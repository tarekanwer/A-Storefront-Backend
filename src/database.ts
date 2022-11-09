import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_test,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  Port,
  ENV,
} = process.env;

let client;
console.log(ENV);

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    port: Port as unknown as number,
    database: POSTGRES_DB_test,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    port: Port as unknown as number,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client as Pool;
