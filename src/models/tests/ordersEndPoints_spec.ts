import supertest from "supertest";
import { User } from "../users";
import { Order } from "../orders";
import { Product } from "../products";
import app from "../../server";
import clearDatabase from "./helpers";


let token: string;
const request = supertest(app);

describe("Orders end point test", () => {
  console.clear();
  ("use strict");
  let response;
  const newUser: User = {
    firstname: "John",
    lastname: "Doe",
    password: "password123",
  };

  const addedOrder: Order = {
    product_id: 1,
    quantity: 1,
    user_id: 1,
    status: "active",
  };

  const newProduct: Product = {
    name: "Novel",
    price: 20,
    category: "books",
  };

  beforeEach(function () {
    response = {};
  });
  beforeAll(async () => {
    const tokenResponse = await request.post("/users").send(newUser);
    token = tokenResponse.body as unknown as string;
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return status 200 upon adding order", async () => {
    response = await request
      .post("/orders")
      .send(JSON.stringify(addedOrder))
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return status 200 upon requesting all orders", async () => {
    response = await request
      .get("/orders")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return 401 status upon unauthorized requesting of certain product", async () => {
    response = await request.get("/orders/1");
    expect(response.status).toBe(401);
  });

  it("should return 200 status upon requesting of certain order", async () => {
    response = await request
      .get("/orders/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("delete method should return 401 status upon unauthorized request", async () => {
    response = await request.delete("/orders/1");
    expect(response.status).toBe(401);
  });

  it("delete method should return 200 status upon request", async () => {
    response = await request
      .delete("/orders/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe("Orders end point test", () => {
  console.clear();
  ("use strict");
  let response;
  const newUser: User = {
    firstname: "John",
    lastname: "Doe",
    password: "password123",
  };

  const addedOrder: Order = {
    product_id: 1,
    quantity: 1,
    user_id: 1,
    status: "active",
  };

  const newProduct: Product = {
    name: "Novel",
    price: 20,
    category: "books",
  };
  afterAll(async () => {
    await clearDatabase();
  });
  beforeEach(function () {
    response = {};
  });
  beforeAll(async () => {
    const tokenResponse = await request.post("/users").send(newUser);
    token = tokenResponse.body as unknown as string;
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    await request
      .post("/orders")
      .send(JSON.stringify(addedOrder))
      .set("Authorization", `bearer ${token}`);
  });
  it("should return status 200 upon adding product to order", async () => {
    response = await request
      .post("/orders/1/products")
      .send(JSON.stringify(addedOrder))
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
