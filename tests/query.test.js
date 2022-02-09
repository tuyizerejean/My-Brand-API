import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app.js";
import {userData,validUser}from "../tests/dummyData.js";
import "dotenv/config";
import User from "../src/models/user.js";
import { query } from "express";

chai.use(chaiHttp);
let token = "";
describe("QUERY TESTING", () => {
  before(async () =>{
    await User.deleteMany({email: userData.email})
  })
  it("Should register a user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/register")
      .send(userData)
      .end((err, res) => {
        expect(res).to.have.status([201]);
        done();
      });
  });
  it("Should not register a user", (done) => {
    chai
      .request(app)
      .post("/api/v1/users/registe")
      .send(userData)
      .end((err, res) => {
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
  it("While logged in Should retrieve the queries", (done) => {
    chai
      .request(app)
      .get("/api/v1/queries/")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.property("status");
        expect(res).to.have.status([200]);
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
console.log(token);