const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("GET category routes", () => {
    describe("/categories", () => {
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

    describe("/categories/:id", () => {
      it("returns 200 OK and a category object on the happy path", (done) => {
        request(app)
          .get("/categories/1")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
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

      it("returns 401 Unauthorized when auth credentials not sent", (done) => {
        request(app)
          .get("/categories/1")
          .set("Accept", "application/json")
          .expect(401, done)
      })

      it("returns 404 Not Found when sent a non-exisent id", (done) => {
        request(app)
          .get("/categories/1000000")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect(404, done)
      })
    })
  })
}
