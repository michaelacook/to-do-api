const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("PUT list routes", () => {
    it("returns 200 OK and an updated list object on the happy path", (done) => {
      request(app)
        .put("/lists/1")
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

    it("returns 400 Bad Request when required data not sent", (done) => {
      request(app)
        .put("/lists/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(400, done)
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app)
        .put("/lists/1")
        .send({
          title: "Updated Title",
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 404 Not Found when non-existent id sent", (done) => {
      request(app)
        .put("/lists/1000000")
        .send({
          title: "Updated Title",
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })
  })
}
