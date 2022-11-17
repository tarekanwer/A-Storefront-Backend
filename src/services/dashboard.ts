import Client from "../database";
import { Product } from "../models/products";
import { User } from "../models/users";
export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT name , price , category  FROM products INNER JOIN order_products ON products.id = order_products.product_id";

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstname: string; lastname: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT firstname , lastname FROM users INNER JOIN orders ON users.id = orders.user_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  async fiveMostExpensive(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products ORDER BY price DESC LIMIT 5";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }
}
