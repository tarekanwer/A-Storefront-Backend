import express, { Response, Request } from "express";
import { Product, ProductStore } from "../models/products";
import { verifyAuthToken } from "./helpers";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.status(200);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const product = await store.show(id);
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addedProduct: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };
    const product = await store.create(addedProduct);
    res.status(200);
    res.json(`product ${product.id} was added successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    await store.delete(id);
    res.status(200);
    res.json(`product ${id} was removed successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ProductRoutes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products/:id", verifyAuthToken, remove);
};

export default ProductRoutes;
