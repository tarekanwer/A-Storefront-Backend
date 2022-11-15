import supertest from "supertest";
import { User } from "../users";
import dotenv from "dotenv";
import app from "../../server";

dotenv.config();
let token: string;

const request = supertest(app);

describe("User Handler", () => {
  "use strict";
  let response;
  beforeEach(function () {
    response = {};
  });
  const newUser: User = {
    firstname: "tarek",
    lastname: "anwer",
    password: "password123",
  };
  it("should return 200 status upon adding new user", async (done) => {
    response = await request.post("/users").send(newUser);
    token = response.body as unknown as string;
    expect(response.status).toBe(200);
    done();
  });
  it("should return 200 status upon requesting index method", async (done) => {
    response = await request.get("/users");
    expect(response.status).toBe(200);
    done();
  });
  it("show method should return 200 status upon request", async (done) => {
    const userData = {
      "id": 1,
    };
    response = await request
      .get("/users/1")
      .send(userData)
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });

  it("show method should return 400 status upon unauthorized request", async (done) => {
    const userData = {
      "id": 1,
    };
    response = await request.get("/users/1").send(userData);
    expect(response.status).toBe(401);
    done();
  });

  it("delete method should return 200 status upon request", async (done) => {
    const userData = {
      "id": 1,
    };
    response = await request.delete("/users/1").send(userData);
    expect(response.status).toBe(401);
    done();
  });

  it("delete method should return 200 status upon request", async (done) => {
    const userData = {
      "id": 1,
    };
    response = await request
      .delete("/users/1")
      .send(userData)
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    done();
  });
});
