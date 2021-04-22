const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("GET category routes", () => {
    it("returns 200 OK and an array of categories on the happy path", (done) => {
      request(app)
        .get("/categories")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isArray(response.body)
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 401 Unauthorized when auth credentials not passed", (done) => {
      request(app).get("/categories").expect(401, done)
    })
  })
}
