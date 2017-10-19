
const OWScraper = use('OWScraper');
const ow = new OWScraper()
const DB = use('DB');
const Player = use('app/models/Player')
//
module.exports = {
  index(req, res) {
    ow.fetch({
      platform: req.params.platform,
      region: req.params.region,
      name: req.params.name,
      mode: req.params.mode
    })
    .then(player => {
      res.json(player)
    })
    .catch(err => res.json(player))
  },


  test(req, res) {
    let p = new Player({
      name: "george",
      bname: "george-122123",
      device: "xbox",
      region: "us"
    })

    p.extra = "this is an extra variable"
    p._private = "this shouldn't show up in redis"
    p.SAVE()

    res.json(p.EXPORT())
  }
}
