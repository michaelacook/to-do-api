const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

module.exports = () => {
  describe("user routes", () => {
    describe("/users/:id", () => {
      it("returns 200 OK and a user on happy path", (done) => {
        request(app)
          .get("/users/1")
          .auth("mcook0775@gmail.com", process.env.PASSWORD)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            assert.isObject(response.body)
            assert.containsAllKeys(response.body, [
              "email",
              "password",
              "firstName",
              "lastName",
            ])
            done()
          })
          .catch((err) => done(err))
      })

      it("returns 401 Unauthorized when auth credentials not given", (done) => {
        request(app).get("/users/1").expect(401, done)
      })
    })
  })
}
