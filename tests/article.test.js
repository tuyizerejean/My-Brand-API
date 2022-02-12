import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import { validUser } from "./dummyData.js";
import "dotenv/config";
chai.use(chaiHttp);
describe("ARTICLE END-POINT TESTING", () => {
  let token = "";
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
  let id= "";
  it(" While logged in Should create the article", (done) => {
      chai.request(app).post("/api/v1/aritcles")
          .set("Authorization", `Bearer ${token}`)
          .set('Content-Type', 'multipart/form-data')
          .field({ title: 'What about Kigali??', content: 'Kigali is looking very good' })
          .attach('image', './index.jpeg')
          .end((err, res) => {
              expect(res).to.have.status([200]);
              id= res.body.data._id;
              done();
          });
  });
  it("Should retrieve one article", (done) => {
    chai
      .request(app)
      .get(`/api/v1/aritcles/${id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status([200]);
        done();
      });
  });
  it(" While logged in Should  Update one articles", (done) => {
    chai.request(app).put(`/api/v1/aritcles/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .set('Content-Type', 'multipart/form-data')
        .field({ title: 'FridayVibe', content: 'We are enjoying Friday vibe' })
        .attach('image', './index.jpeg')
        .end((err, res) => {
            expect(res).to.have.status([200]);
            done();
        });
});
it(" While logged in Should  delete one articles", (done) => {
  chai.request(app).delete(`/api/v1/aritcles/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
          expect(res).to.have.status([200])
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


});

