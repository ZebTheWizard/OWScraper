// console.log(process.argv);
const fs = require('fs');
const path = require('path')

let c = process.argv[2]
let file = path.join(__dirname, '../models/' + c +'.js')
let data = `'use strict'
const __init__ = use('app/models/__init__')

/**
 * This is your new ${c} model.
 * To save to the database properly set "this.__key__"
 * before you call the SAVE(), GET(), or DROP() methods.
 * This is the absolute bare minimum you can have,
 * so don't delete this stuff! Except this comment.
**/


class ${c} extends __init__{
  constructor(obj) {
    super()
  }
}

module.exports = ${c}
`

let exists = fs.existsSync(file)

if (exists) console.log('Model already exists. Please choose a different name.');
else fs.writeFile(file, data, function (err) {
  if (err) return console.log(err);
  console.log(c + ' model created successfully.');
})
