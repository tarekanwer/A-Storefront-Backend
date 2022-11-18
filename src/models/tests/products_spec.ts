import { Product, ProductStore } from "../products";
import clearDatabase from "./helpers";


const store = new ProductStore();

describe("Products Model tests", () => {
  "use strict";
  let result;
  beforeEach(function () {
    result = {};
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add product", async () => {
    result = await store.create({
      name: "Novel",
      price: 10,
      category: "Books",
    });
    expect(result).toEqual({
      id: 1,
      name: "Novel",
      price: 10,
      category: "Books",
    });
  });

  it("index method should return a list of products", async () => {
    result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "Novel",
        price: 10,
        category: "Books",
      },
    ]);
  });

  it("show method should return the correct products", async () => {
    result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      name: "Novel",
      price: 10,
      category: "Books",
    });
  });

  it("delete method should remove intended product", async () => {
    store.delete(1);
    result = await store.index();
    expect(result).toEqual([]);
  });
});
