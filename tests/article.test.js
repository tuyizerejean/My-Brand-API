import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import { generateToken } from "../src/helpers/jwtFunctions.js"
import { validUser } from "./dummyData.js";
import "dotenv/config";

chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {


  let token = "";
  it("Experiencing server error", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send(validUser)
      .end((err, res) => {
        token = res.body.accessToken;
        expect(res).to.have.status([500]);
        done();
      });
  });
  it("Should loggin the user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send(validUser)
      .end((err, res) => {
        token = res.body.accessToken;
        expect(res).to.have.status([200]);
        done();
      });
  });

  let id;
  it("Should created the articles", (done) => {
      chai.request(app).post("/api/v1/aritcles")
          .set("Authorization", `Bearer ${token}`)
          .set('Content-Type', 'multipart/form-data')
          .field({ title: 'What about Kigali??', content: 'Kigali is looking very good' })
          .attach('image', './test.jpg')
          .end((err, res) => {
              expect(res).to.have.status([200])
              id = res.body.data._id;
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
      .get("/api/v1/aritc/6204460d3bd05d4cdf322d86")
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

  it("Should  update one articles", (done) => {
    chai.request(app).put(`/api/v1/aritcles/6204460d3bd05d4cdf322d86`)
        .set("Authorization", `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .field({ title: 'postt1request', content: 'common news' })
        .attach('image', './test.jpg')
        .end((err, res) => {
            expect(res).to.have.status([200])
            done()
        })
})
it("Should  delete one articles", (done) => {
  chai.request(app).delete(`/api/v1/aritcles/6204cd2ce8afdd6a09251c73`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
          expect(res).to.have.status([200])
          done()
      })
})
});

