import Client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the users . Error ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find the user ${id} . Error ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users(firstName, lastName , password_digest ) VALUES($1, $2, $3) RETURNING *";

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new user . Error ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id} . Error ${err}`);
    }
  }

  async authenticate(u: User): Promise<User | null> {
    const conn = await Client.connect();
    const sql =
      "SELECT password_digest FROM users WHERE firstname = ($1) AND lastname = ($2)";
    const result = await conn.query(sql, [u.firstname, u.lastname]);
    console.log(u.password + pepper);
    if (result.rows.length) {
      const user = result.rows[0];
      console.log(user);
      if (bcrypt.compareSync(u.password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
}
