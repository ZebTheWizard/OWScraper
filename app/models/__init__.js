'use strict'
const DB = use('DB');

class __init__ {
  constructor() {
    this.__type__ = this.constructor.name
  }
  EXPORT () {
    let e = JSON.parse(JSON.stringify(this))
    Object.keys(e).forEach(k => {
      if (k[0] == '_') delete e[k]
    })
    return JSON.stringify(e)
  }

  GET () {
    return DB.hget(this.__type__, this.__key__)
  }

  DROP () {
    return DB.hdel(this.__type__, this.__key__)
  }


  ALL () {
    return new Promise((resolve, reject) =>{
      DB.hgetall(this.__type__)
      .then(response => {
        let obj = {}
        Object.keys(response).forEach(k => {
          try {
            obj[k] = JSON.parse(response[k])
          } catch (e) {
            obj[k] = response[k]
          }
        })
        resolve(obj)
      })
    });
  }


  SAVE () {
    return DB.hset(this.__type__, this.__key__, this.EXPORT())
  }
}

module.exports = __init__
