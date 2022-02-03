import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
  it("Should retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritcles/")
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  it("Should not retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/artcle/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
});
// import { expect, request, use } from "chai";
// import chaiHttp from "chai-http";
// import app from "../src/app";
// import "dotenv/config";
// use(chaiHttp);
// describe("ARTICLE END-POINT TESTING", () => {
//   it("Should retrieve the articles", async () => {
//     const res = await request(app).get("/api/v1/aritcles");
//     expect(res).to.have.status([200]);
//     expect(res.type).to.have.equal("application/json");
//   });
//   it("Should retrieve one article", async () => {
//     const res = await request(app).get(
//       "/api/v1/aritcles/61f42658024bb5a58db76237"
//     );
//     expect(res).to.have.status([200]);
//     // expect(res.type).to.have.equal("application/json");
//   });
//   it("Should not retrieve the articles", async () => {
//     const res = await request(app).get("/api/v1/artcle/");
//     expect(res).to.have.status([404]);
//   });
// });
