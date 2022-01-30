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

describe("Post Endpoints", () => {
  it("get owner by ID", async () => {
    const res = await request(app)
      .get("/api/homeowner/61f5f7763d7b9904e07d6f45")
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("address");
  });
});

describe("Post Endpoints", () => {
  it("get all Owners", async () => {
    const res = await request(app).get("/api/homeowner?address=candiac").send();
    expect(res.statusCode).toEqual(200);
    //expect(res.body).anything();
  });
});
