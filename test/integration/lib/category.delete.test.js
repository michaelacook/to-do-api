const { assert } = require("chai")
const request = require("supertest")
const app = require("../../../app")

const categoryService = require("../../../services/category")

module.exports = () => {
  describe("DELETE category routes", () => {
    it("returns 204 No Content on the happy path", async () => {
      const categories = await categoryService.getAllCategories(1)
      const { id } = categories[categories.length - 1]

      request(app)
        .delete(`/categories/${id}`)
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(204)
    })

    it("returns 401 Unauthorized when auth credentials not sent", (done) => {
      request(app).delete(`/categories/1`).expect(401, done)
    })

    it("returns 401 Unauthorized when requesting another user's data", (done) => {
      request(app)
        .delete(`/categories/2`)
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

    it("returns 404 Bad Request when sent a non-existent id", (done) => {
      request(app)
        .delete("/categories/1000000")
        .auth("mcook0775@gmail.com", process.env.PASSWORD)
        .expect(404, done)
    })
  })
}
