import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";
import dotenv from "dotenv";
import { getTokenByUser, verifyAuthToken } from "./helpers";
dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const user = await store.show(id);
    res.status(200);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const addUser: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };
  try {
    const user = await store.create(addUser);
    // const token = jwt.sign({ user: addUser }, secret_token);
    res.status(200);
    res.json(getTokenByUser(user));
  } catch (err) {
    res.status(400);
    res.json(`${err}`);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    await store.delete(id);
    res.status(200);
    res.json(`user was removed successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const UserRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.delete("/users/:id", verifyAuthToken, remove);
};

export default UserRoutes;
