import express, { Request, Response } from "express";
import { User, UserStore } from "../models/users";

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
    const id = req.body.id;
    const user = await store.show(id);
    res.status(200);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const addUser: User = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      password: req.body.password,
    };
    const user = await store.create(addUser);
    res.status(200);
    res.json(`user ${user.id} was added successfully`);
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
    res.json(`user ${id} was removed successfully`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const UserRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.delete("users/:id", remove);
};

export default UserRoutes;
