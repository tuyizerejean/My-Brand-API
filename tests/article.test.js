import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import { generateToken } from "../src/helpers/jwtFunctions.js"
import "dotenv/config";

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
    let id;
    it("Should created the articles", (done) => {
        chai.request(app).post("/api/v1/aritcles")
            .set("Authorization", `${generateToken({ id: 1 })}`)
            .set('Content-Type', 'multipart/form-data')
            .field({ title: 'postt1request', content: 'common news' })
            .attach('image', './test.jpg')
            .end((err, res) => {
                expect(res).to.have.status([200])
                id = res.body.data._id;
                console.log(res);
                done()
            })
    })
  it("Should retrieve the articles", (done) => {
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
  it("Should retrieve one article", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritcles/61ff0b4fc7aae2233473e7ab")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        done();
      });
  });
  it("Should not retrieve one article", (done) => {
    chai
      .request(app)
      .get("/api/v1/aritc/61fd11824a0d582896b668")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
  it("Should not retrieve the articles", (done) => {
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
