import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import {sendComment}from "../tests/dummyData.js";
import "dotenv/config";

chai.use(chaiHttp);
describe("COMMENT END-POINT TESTING", () => {
  it("Should Send a comment", (done) => {
    chai
      .request(app)
      .post("/api/v1/comments/61fd6ec1a89ecd7d813c5a3b")
      .send(sendComment)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
      });
  });
  it("Should not create Comments without Fill the field validations", (done) => {
    chai.request(app).post("/api/v1/comments/61fd6ec1a89ecd7d813c5a3b")
        .field({ comment:'you are done!!!'})
        .end((err, res) => {
            expect(res).to.have.status([400]);        
            done();
        });
});
  it("Should not create Comments Wrong path", (done) => {
    chai.request(app).post("/api/v1/comments/")
        .field({ name:'tuyizere', comment:'you are done!!!'})
        .end((err, res) => {
            expect(res).to.have.status([404]);        
            done();
        });
});
  it("Should retrieve the comments", (done) => {
    chai
      .request(app)
      .get("/api/v1/comments/61fd6ec1a89ecd7d813c5a3b")
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res).to.have.status([200]);
        done();
      });
  });

  it("Should not retrieve the comments", (done) => {
    chai
      .request(app)
      .get("/api/v1/commentss/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
});
