import { User, UserStore } from "../users";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import clearDatabase from "./helpers";

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;

const store = new UserStore();

describe("Users Model tests", () => {
  "use strict";
  let result;
  let hash;
  beforeEach(function () {
    result = {};
    hash = false;
  });
  
  afterAll(async () => {
    await clearDatabase();
  });

  const newUser = {
    firstname: "John",
    lastname: "Doe",
    password: "password123",
  };
  it("should have index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have an update method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("create method should add user", async () => {
    result = await store.create(newUser);
    // console.log(result);
    hash = bcrypt.compareSync(newUser.password + pepper, result.password);
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: hash ? result.password : "not defined",
    });
  });
  it("index method should return a list of users", async () => {
    result = await store.index();
    // console.log(result);
    hash = bcrypt.compareSync(newUser.password + pepper, result[0].password);
    expect(result).toEqual([
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: hash ? result[0].password : "not defined",
      },
    ]);
  });
  it("show method should return the correct user", async () => {
    result = await store.show(1);
    // console.log(result);
    hash =  bcrypt.compareSync(newUser.password + pepper, result.password);
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: hash ? result.password : "not defined",
    });
  });
  it("delete method should remove certain user", async () => {
    await store.delete(1);
    result = await store.index();
    expect(result).toEqual([]);
  });
});
