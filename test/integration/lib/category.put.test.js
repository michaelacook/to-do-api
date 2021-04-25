const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("PUT category routes", () => {
    it("returns 200 OK and an updated category object on the happy path", (done) => {
      request(app)
        .put("/categories/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          title: "Updated Title",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isObject(response.body)
          assert.hasAllDeepKeys(response.body, [
            "id",
            "title",
            "userId",
            "createdAt",
            "updatedAt",
            "Lists",
          ])
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 400 Bad Request when title not sent", (done) => {
      request(app)
        .put("/categories/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .set("Accept", "application/json")
        .expect(400, done)
    })

    it("returns 401 when auth credentials not sent", (done) => {
      request(app)
        .put("/categories/1")
        .send({
          title: "Updated Title",
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 401 Unauthorized when requesting another user's data", (done) => {
      request(app)
        .put("/categories/2")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          title: "Updated Title",
        })
        .set("Accept", "application/json")
        .expect(401)
        .then((response) => {
          assert.equal(
            response.body,
            "You do not have authorization to modify the requested resource."
          )
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })

    it("returns 404 Not Found when non-existent id sent", (done) => {
      request(app)
        .put("/categories/10000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .set("Accept", "application/json")
        .expect(404, done)
    })
  })
}
