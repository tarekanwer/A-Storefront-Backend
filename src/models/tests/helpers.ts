import Client from "../../database";

async function clearDatabase(): Promise<void> {
  const conn = await Client.connect();
  const sql =
    "DELETE FROM order_products; ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\n  DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n  DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n";
  await conn.query(sql);
  conn.release();
}

export default clearDatabase;
