const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("PUT list-items route", () => {
    it("returns 200 OK and an updated list item on the happy path", (done) => {
      request(app)
        .put("/list-items/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          comments: "This is an updated list item for testing purposes",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isObject(reponse.body)
          assert.hasAllDeepKeys(response.body, [
            "id",
            "listId",
            "content",
            "comments",
            "complete",
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
        .put("/list-items/1")
        .send({
          comments: "This is an updated list item for testing purposes",
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 404 Not Found when sent non-existent id", (done) => {
      request(app)
        .put("/list-items/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          comments: "This is an updated list item for testing purposes",
        })
        .expect(404, done)
    })
  })
}
