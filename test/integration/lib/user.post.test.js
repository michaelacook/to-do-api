const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("POST user routes", () => {
    it("returns 201 Created and a user object on the happy path", (done) => {
      request(app)
        .post("/users")
        .send({
          email: "email@email.com",
          password: "asdf",
          firstName: "Jane",
          lastName: "Doe",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .then((response) => {
          assert.isObject(response.body)
          assert.containsAllKeys(response.body, [
            "email",
            "password",
            "firstName",
            "lastName",
            "createdAt",
            "updatedAt",
          ])
          done()
        })
    })

    it("returns 400 Bad Request when send an empty object", (done) => {
      request(app)
        .post("/users")
        .send({})
        .set("Accept", "application/json")
        .expect(400, done)
    })
  })
}
