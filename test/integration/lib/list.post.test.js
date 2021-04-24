const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("POST list routes", (done) => {
    it("returns 201 Created and a list object on the happy path", (done) => {
      request(app)
        .post("/lists")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          categoryId: 1,
          title: "Test Created List",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          assert.isObject(response.body)
          assert.hasAllDeepKeys(response.body, [
            "id",
            "categoryId",
            "title",
            "createdAt",
            "updatedAt",
          ])
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app)
        .post("/lists")
        .send({
          categoryId: 1,
          title: "Test Created List",
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 400 Bad Request when required data not sent", (done) => {
      request(app)
        .post("/lists")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({})
        .set("Accept", "application/json")
        .expect(400, done)
    })
  })
}
