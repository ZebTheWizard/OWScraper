'use strict'
const __init__ = use('app/models/__init__')

/**
 * This is your new User model.
 * To save to the database properly set "this.__key__"
 * before you call the SAVE(), GET(), or DROP() methods.
 * This is the absolute bare minimum you can have,
 * so don't delete this stuff! Except this comment.
**/


class User extends __init__{
  constructor(obj) {
    super()
  }
}

module.exports = User
