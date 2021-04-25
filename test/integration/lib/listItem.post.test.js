const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("POST list-items route", () => {
    it("returns 201 Created and a list item object on the happy path", (done) => {
      request(app)
        .post("/list-items")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({
          listId: 1,
          content: "Add authorization middleware for protected routes",
          comments: "This is a test to-do item",
          complete: false,
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
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
      request(app)
        .post("/list-items")
        .send({
          listId: 1,
          content: "Add authorization middleware for protected routes",
          comments: "This is a test to-do item",
          complete: false,
        })
        .set("Accept", "application/json")
        .expect(401, done)
    })

    it("returns 400 Bad Request when required data not sent", (done) => {
      request(app)
        .post("/list-items")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .send({})
        .set("Accept", "application/json")
        .expect(400, done)
    })
  })
}
