const homeowner = require("../controllers/owner.controller.js");

const request = require("supertest");
const app = require("../../server");
describe("Post Endpoints", () => {
  it("should create a new Owner", async () => {
    const res = await request(app)
      .post("/api/homeowner")
      .send({
        name: "Soheyl10",
        address: "candiac",
        dob: "1983-06-12",
        coordinates: [-73.9667, 40.78],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("address");
  });
});
