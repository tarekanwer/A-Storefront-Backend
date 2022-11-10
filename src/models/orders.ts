import Client from "../database";

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: string;
};

export class OrderStore {}
