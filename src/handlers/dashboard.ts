import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.status(200);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostExpensive();
    res.status(200);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};
const dashboardRoutes = (app: express.Application) => {
  app.get("/products-in-orders", productsInOrders);
  app.get("/users-with-orders", usersWithOrders);
  app.get("/five-most-expensive", fiveMostExpensive);
};
export default dashboardRoutes;
