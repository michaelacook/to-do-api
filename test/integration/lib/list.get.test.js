const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("GET list routes", () => {
    it("returns 200 OK and a list object on the happy path", (done) => {
      request(app)
        .get("/lists/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isObject(response.body)
          assert.hasAllDeepKeys(response.body, [
            "id",
            "categoryId",
            "title",
            "ListItems",
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
      request(app).get("/lists/1").expect(401, done)
    })

    it("returns 404 Not Found when non-existent id sent", (done) => {
      request(app)
        .get("/lists/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(404, done)
    })
  })
}
