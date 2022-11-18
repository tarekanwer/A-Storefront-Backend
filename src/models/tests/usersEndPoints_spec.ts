import supertest from "supertest";
import { User } from "../users";
import app from "../../server";
import clearDatabase from "./helpers";

let token: string;

const request = supertest(app);

describe("User end point Handler", () => {
  console.clear();
  ("use strict");
  let response;
  beforeEach(function () {
    response = {};
  });
  afterAll(async () => {
    await clearDatabase();
  });
  const newUser: User = {
    firstname: "John",
    lastname: "Doe",
    password: "password123",
  };
  it("should return 200 status upon adding new user", async () => {
    response = await request.post("/users").send(newUser);
    token = response.body as unknown as string;
    expect(response.status).toBe(200);
  });
  it("should return 200 status upon requesting index method", async () => {
    response = await request
      .get("/users")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it("show method should return 200 status upon request", async () => {
    response = await request
      .get("/users/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("show method should return 400 status upon unauthorized request", async () => {
    response = await request.get("/users/1");
    expect(response.status).toBe(401);
  });

  it("delete method should return 200 status upon request", async () => {
    response = await request.delete("/users/1");
    expect(response.status).toBe(401);
  });

  it("delete method should return 200 status upon request", async () => {
    response = await request
      .delete("/users/1")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
