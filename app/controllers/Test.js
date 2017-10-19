
/**
 * This is your new Test controller.
 * All methods you wish to export must be followed by a comma.
 * Access the method by putting something like following in the routes file.
 * - app.all('/', Test.read),
 * - app.post('/update', Test.update),
 * so don't delete this stuff! Except this comment.
**/

module.exports = {
  create (req, res) {
    res.json('test.create')
  },

  read (req, res) {
    res.json('test.read')
  },

  update (req, res) {
    res.json('test.update')
  },

  delete (req, res) {
    res.json('test.delete')
  }
}
