import supertest from "supertest";
import { Product } from "../products";
import { User } from "../users";
import app from "../../server";

let token: string;
const request = supertest(app);

describe("Product end point handler", () => {
  console.clear();
  ("use strict");
  let response;
  beforeEach(function () {
    response = {};
  });
  const newProduct: Product = {
    name: "novel",
    price: 20,
    category: "books",
  };
  const newUser: User = {
    firstname: "John",
    lastname: "Doe",
    password: "password123",
  };
  it("should return status 200 upon adding product", async () => {
    const tokenResponse = await request.post("/users").send(newUser);
    token = tokenResponse.body as unknown as string;
    response = await request
      .post("/products")
      .send(JSON.stringify(newProduct))
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("should return status 200 upon requesting all products", async () => {
    response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("should return 401 status upon unauthorized requesting of certain product", async () => {
    const productData = {
      id: 1,
    };
    response = await request
      .get("/products/1")
      .send(JSON.stringify(productData));
    expect(response.status).toBe(401);
  });

  it("should return 200 status upon requesting of certain product", async () => {
    const productData = {
      id: 1,
    };
    response = await request
      .get("/products/1")
      .send(JSON.stringify(productData))
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("delete method should return 401 status upon unauthorized request", async () => {
    const productData = {
      id: 1,
    };
    response = await request
      .delete("/products/1")
      .send(JSON.stringify(productData));
    expect(response.status).toBe(401);
  });

  it("delete method should return 200 status upon request", async () => {
    const productData = {
      id: 1,
    };
    response = await request
      .delete("/products/1")
      .send(JSON.stringify(productData))
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
