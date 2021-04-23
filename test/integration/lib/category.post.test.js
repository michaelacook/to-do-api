const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("POST category routes", () => {
    it("returns 201 Created and a category object on the happy path", (done) => {
      request(app)
        .post("/categories")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          userId: 1,
          title: "Test Category",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then((response) => {
          assert.isObject(response.body)
          assert.hasAllDeepKeys(response.body, [
            "userId",
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

    it("returns 401 Unauthorized when basic auth credentials not sent", (done) => {
      request(app)
        .post("/categories")
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 400 Bad Request when client data missing required properties", (done) => {
      request(app)
        .post("/categories")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({})
        .set("Accept", "application/json")
        .expect(400, done)
    })
  })
}
