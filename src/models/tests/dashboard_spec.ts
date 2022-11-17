import { DashboardQueries } from "../../services/dashboard";
import { Order, OrderStore } from "../orders";
import { User, UserStore } from "../users";
import { Product, ProductStore } from "../products";

const store = new DashboardQueries();
const orderStore = new OrderStore();
const userStore = new UserStore();
const productStore = new ProductStore();

describe("dashboard Model tests", () => {
  beforeAll(async () => {
    await userStore.create({
      firstname: "John",
      lastname: "Doe",
      password: "password123",
    });
    await productStore.create({
      name: "Novel",
      price: 10,
      category: "Books",
    });
    await orderStore.create({
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    });

    await orderStore.addProduct({
      id: 1,
      product_id: 1,
      quantity: 1,
      user_id: 1,
      status: "active",
    });
  });
  it("should have five most expensive method", () => {
    expect(store.fiveMostExpensive).toBeDefined();
  });
  it("should have products in order method", () => {
    expect(store.productsInOrders).toBeDefined();
  });
  it("should have users with orders method", () => {
    expect(store.usersWithOrders).toBeDefined();
  });

  it("should return users with orders", async () => {
    const result = await store.usersWithOrders();
    expect(result).toEqual([
      {
        firstname: "John",
        lastname: "Doe",
      },
    ]);
  });
  it("should return product in the order", async () => {
    const result = await store.productsInOrders();
    expect(result).toEqual([
      {
        name: "Novel",
        price: 10,
        category: "Books",
      },
    ]);
  });

  it("should return top 5 most expensive products", async () => {
    await productStore.create({
      name: "Novel2",
      price: 15,
      category: "Books",
    });
    await productStore.create({
      name: "Novel3",
      price: 20,
      category: "Books",
    });
    await productStore.create({
      name: "Novel4",
      price: 30,
      category: "Books",
    });
    await productStore.create({
      name: "Novel5",
      price: 40,
      category: "Books",
    });
    const result = await store.fiveMostExpensive();
    expect(result).toEqual([
      { id: 5, name: "Novel5", price: 40, category: "Books" },
      { id: 4, name: "Novel4", price: 30, category: "Books" },
      { id: 3, name: "Novel3", price: 20, category: "Books" },
      { id: 2, name: "Novel2", price: 15, category: "Books" },
      { id: 1, name: "Novel", price: 10, category: "Books" },
    ]);
  });
});
