'use strict'
const __init__ = use('app/models/__init__')
const DB = use('DB')

class Player extends __init__{
  constructor(obj) {
    super()
    this.__key__  = obj.name
    this.bname    = obj.bname
    this.device   = obj.device
    this.region   = obj.region
    this.SAVE()
  }
}

module.exports = Player
