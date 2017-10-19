// console.log(process.argv);
const fs = require('fs');
const path = require('path')

let c = process.argv[2]
let file = path.join(__dirname, '../controllers/' + c +'.js')
let data = `
/**
 * This is your new ${c} controller.
 * All methods you wish to export must be followed by a comma.
 * Access the method by putting something like following in the routes file.
 * - app.all('/', ${c}.read),
 * - app.post('/update', ${c}.update),
 * so don't delete this stuff! Except this comment.
**/

module.exports = {
  create (req, res) {

  },

  read (req, res) {

  },

  update (req, res) {

  },

  delete (req, res) {

  }
}
`

let exists = fs.existsSync(file)

if (exists) console.log('Controller already exists. Please choose a different name.');
else fs.writeFile(file, data, function (err) {
  if (err) return console.log(err);
  console.log(c + ' controller created successfully.');
})
