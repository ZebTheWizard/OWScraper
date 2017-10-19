const fs = require('fs');
const path = require('path')
const file = path.join(__dirname, '../../' + 'env.example.json')
const newfile = path.join(__dirname, '../../' + 'env.json')
const env = require(file)
const randtoken = require('rand-token');

env.secret = randtoken.generate(64)

fs.writeFile(newfile, JSON.stringify(env, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('Env created successfully.');
})
