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
        "SELECT * FROM products INNER JOIN order_products ON product.id = order_products.id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
}
