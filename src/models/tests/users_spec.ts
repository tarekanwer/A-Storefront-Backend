import { User, UserStore } from "../users";

const store = new UserStore();

describe("Users Model tests", () => {
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
    const result = await store.create({
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    });
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    });
  });
  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        password: "password123",
      },
    ]);
  });
  it("show method should return the correct user", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      id: 1,
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    });
  });
  it("delete method should remove certain user", async () => {
    store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
