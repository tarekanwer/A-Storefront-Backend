import supertest from "supertest";
import { User } from "../users";
import { Order } from "../orders";
import { Product } from "../products";
import app from "../../server";

let token: string;
const request = supertest(app);

describe("dashboard end point test", () => {
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
    await request
      .post("/orders")
      .send(JSON.stringify(addedOrder))
      .set("Authorization", `bearer ${token}`);
    await request
      .post("/orders/1/products")
      .send(JSON.stringify(addedOrder))
      .set("Authorization", `bearer ${token}`);
  });

  it("should return 200 status upon requesting users with orders", async () => {
    response = await request.get("/users-with-orders");
    expect(response.status).toBe(200);
  });

  it("should return 200 status upon requesting products in orders", async () => {
    response = await request.get("/products-in-orders");
    expect(response.status).toBe(200);
  });

  it("should return 200 status upon requesting top 5 expensive products", async () => {
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    response = await request.get("/five-most-expensive");
    expect(response.status).toBe(200);
  });
});
