const request = require("supertest");

const app = require("./index.js");

describe("Server Test", () => {
  beforeEach(async () => {
    server = app.listen(process.env.PORT);
    global.agent = request.agent(server);
  });

  afterEach(async () => {
    await server.close();
  });

  describe("Scoops", () => {
    test("Scoops Status Code Test", () => {
      return request(server)
        .get("/scoops")
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    test("Scoops Test", () => {
      return request(server)
        .get("/scoops")
        .then((response) => {
          expect(response.body.data.length).toBe(4);
          response.body.data.forEach((flavor) => {
            expect(typeof flavor.name).toBe("string");
            expect(typeof flavor.imageUrl).toBe("string");
          });
        });
    });
  });

  describe("Toppings", () => {
    test("Toppings Status Code Test", () => {
      return request(server)
        .get("/toppings")
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });

    test("Toppings Test", () => {
      return request(server)
        .get("/toppings")
        .then((response) => {
          expect(response.body.data.length).toBe(6);
          response.body.data.forEach((topping) => {
            expect(typeof topping.name).toBe("string");
            expect(typeof topping.imageUrl).toBe("string");
          });
        });
    });
  });

  describe("Order", () => {
    test("Order Status Code Test", () => {
      return request(app)
        .post("/order")
        .then((response) => {
          expect(response.statusCode).toBe(201);
        });
    });

    test("Order Number Test", () => {
      return request(app)
        .post("/order")
        .then((response) => {
          const orderNumber = response.body.data.orderNumber;
          expect(orderNumber).toBeLessThan(10000000000);
          expect(orderNumber).toBeGreaterThan(0);
        });
    });
  });
});
