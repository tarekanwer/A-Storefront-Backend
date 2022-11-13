import express, { Request, Response } from "express";
import { Order, OrderStore } from "../models/orders";
import { verifyAuthToken } from "./helpers";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.status(200);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const order = await store.show(id);
    res.status(200);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addedOrder: Order = {
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const order = await store.create(addedOrder);
    res.status(200);
    res.json(`order ${order.id} was added successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    await store.delete(id);
    res.status(200);
    res.json(`order ${id} was removed successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const OrderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get("/orders/:id", verifyAuthToken, show);
  app.post("orders", verifyAuthToken, create);
  app.delete("/orders/:id", verifyAuthToken, remove);
};

export default OrderRoutes;
