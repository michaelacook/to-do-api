const request = require("supertest")
const app = require("../../../app")
const { assert } = require("chai")

const userService = require("../../../services/user")

module.exports = () => {
  describe("DELETE user routes", () => {
    it("returns 204 No Content on the happy path", async () => {
      const users = await userService._getAllUsers()
      const { id } = users[users.length - 1]

      request(app)
        .delete(`/users/${id}`)
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(204)
    })

    it("returns 401 Unauthorized when no auth credentials sent", async () => {
      const users = await userService._getAllUsers()
      const { id } = users[users.length - 1]

      request(app).delete(`/users/${id}`).expect(401)
    })

    it("returns 401 Unauthorized when requesting another user's data", (done) => {
      request(app)
        .delete("/users/2")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(401)
        .then((response) => {
          assert.equal(
            response.body,
            "You do not have authorization to delete the requested resource."
          )
          done()
        })
        .catch((err) => {
          console.log(err)
          done()
        })
    })
  })
}
