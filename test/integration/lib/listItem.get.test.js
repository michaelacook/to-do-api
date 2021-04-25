const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("GET list-items route", () => {
    it("returns 200 OK and a listItem object on the happy path", (done) => {
      request(app)
        .get("/list-items/1")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isObject(response.body)
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
      request(app).get("/list-items/1").expect(401, done)
    })

    it("returns 404 Not Found when sent a non-existent id", (done) => {
      request(app)
        .get("list-items/100000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(404, done)
    })
  })
}
