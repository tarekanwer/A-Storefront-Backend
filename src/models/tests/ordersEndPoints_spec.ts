import supertest from "supertest";
import { User } from "../users";
import { Order } from "../orders";
import { Product } from "../products";
import app from "../../server";

let token: string;
const request = supertest(app);

describe("Orders end point test", () => {
  console.clear();
  ("use strict");
  let response;
  beforeEach(function () {
    response = {};
  });

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
    name: "novel",
    price: 20,
    category: "books",
  };

  it("should return status 200 upon adding order", async () => {
    const tokenResponse = await request.post("/users").send(newUser);
    token = tokenResponse.body as unknown as string;
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

  it("should return status 200 upon adding product to order", async () => {
    await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    response = await request
      .post("/orders/1/products")
      .send(JSON.stringify(addedOrder))
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
