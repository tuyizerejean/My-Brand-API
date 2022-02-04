import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
  it("It will create the article", (done) => {
    chai
      .request(app)
      .post("/api/v1/aritcles/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        done();
      });
  });
  it("It will retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritcles/")
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res).to.have.status([200]);
        done();
      });
  });
  it("It will retrieve one article", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritcles/61fd11824a0d582896b66828")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        done();
      });
  });
  it("It will not retrieve one article", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritc/61fd11824a0d582896b668")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
  it("Can  not retrieve the articles", (done) => {
    chai
      .request(app)
      .get("/api/v1/artcles/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
});
