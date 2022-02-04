import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import "dotenv/config";
import { userData, validUser } from "./dummyData.js";
import User from "./../src/models/user.js";

chai.use(chaiHttp);
describe("QUERY END-POINT TESTING", () => {
  before(async () => {
    await User.deleteOne({ email: userData.email });
  });

  it("Should register the user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/register")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
        console.log(res);
      });
  });

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
  it("While logged in Should retrieve the queries", (done) => {
    chai
      .request(app)
      .get("/api/v1/queries/")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        done();
      });
  });

  it("When not logged in, you can not retrieve the queries", (done) => {
    chai
      .request(app)
      .get("/api/v1/queries/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([401]);
        done();
      });
  });

  it("Should not retrieve the queries", (done) => {
    chai
      .request(app)
      .get("/api/v1/qeury/")
      .send()
      .end((err, res) => {
        expect(res).to.have.status([404]);
        done();
      });
  });
});
