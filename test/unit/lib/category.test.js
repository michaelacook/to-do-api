const { assert } = require("chai")
const category = require("../../../services/category")
// https://www.npmjs.com/package/chai-as-promised

module.exports = () => {
  describe("category service", () => {
    describe(".getAllCategories", () => {
      it("returns an array", async () => {
        const categories = await category.getAllCategories(1)
        assert.isArray(categories)
      })

      it("includes an associated Lists array for each entry", async () => {
        const categories = await category.getAllCategories(1)
        let pass = true
        for (let cat of categories) {
          if (!Array.isArray(cat.Lists)) {
            pass = false
          }
        }
        assert.isOk(pass)
      })

      it("Lists array include associated ListItems", async () => {
        const categories = await category.getAllCategories(1)
        const lists = categories.map((el) => el.Lists).flat()
        let pass = true
        for (let item of lists) {
          if (!Array.isArray(item.ListItems)) {
            pass = false
          }
        }
        assert.isOk(pass)
      })

      it("returns a rejected promise on error", () => {
        // leave out required argument to create an error
        category.getAllCategories().then((result) => {
          result.should.be.rejected
        })
      })
    })
  })
}
