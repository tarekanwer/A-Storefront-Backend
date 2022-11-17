import { OrderStore } from "../orders";
import { UserStore } from "../users";
import { ProductStore } from "../products";
import dotenv from "dotenv";



const store = new OrderStore();
const product_store = new ProductStore();
const user_store = new UserStore();

describe("Orders Model tests", () => {
  "use strict";
  let result;
  beforeEach(function () {
    result = {};
  });
  beforeAll(async () => {
    await user_store.create({
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    });
    await product_store.create({
      name: "Novel",
      price: 10,
      category: "Books",
    });
  });
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
  it("create method should add new order", async () => {
    result = await store.create({
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    });
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    });
  });
  it("index method should list all orders", async () => {
    result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        product_id: 1,
        quantity: 1,
        user_id: 1,
        status: "active",
      },
    ]);
  });
  it("show method should return intended order", async () => {
    result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    });
  });
  it("delete method should remove intended order", async () => {
    await store.delete(1);
    result = await store.index();
    expect(result).toEqual([]);
  });
});
