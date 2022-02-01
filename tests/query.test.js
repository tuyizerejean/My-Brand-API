import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";

use(chaiHttp);

describe("ARTICLE END-POINT TESTING", () => {
  it("Should retrieve the query", async () => {
    const res = await request(app).get("/api/v1/query/");
    expect(res).to.have.status([200]);
    expect(res.type).to.have.equal("application/json");
  });
  it("Should not retrieve the query", async () => {
    const res = await request(app).get("/api/v1/query/");
    expect(res).to.have.status([404]);
  });
});
