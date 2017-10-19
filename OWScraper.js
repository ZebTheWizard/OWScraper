const axios = require('axios')
const cheerio = require('cheerio');
let $


class OWScraper {
  constructor(obj) {
    this.regions = ['eu', 'kr', 'us']
    this.current = {}
    this.data = {
      names: {},
    }
    this.urls = []
    this.fetched = {}
  }

  get() {
    return this.data
  }
  // device(a) {
  //   let regions = []
  //   if (a == 'xbl' || a == 'psn'){
  //     this.tmp = this.get()[a]['global']
  //     return this
  //   }
  //   if (a != 'pc') return {}
  //   this.regions.forEach(r => {
  //     if (this.get()['pc'][r]) regions.push(this.get()['pc'][r])
  //   })
  //
  //   if (regions.length <= 1) this.tmp = regions[0]
  //   else this.tmp = regions
  //
  //   return this
  // }

  stats(a){
    if (!this.tmp[a]) return null
    this.tmp = this.tmp[a].stats
    return this
  }

  _fetch(obj) {
    let p = obj
    // console.log(p);
    return new Promise((resolve, reject) => {
      axios.get(p.url)
      .then(response => {
        $ = cheerio.load(response.data)

        let heros = $(`select[data-js="career-select"][data-group-id="stats"] option`).map(function (option, el) {
          if (option > 25) return
          switch (option) {
            case 0:
              $(this).html("all")
              break;
            case 5:
              $(this).html("torbjorn")
              break;
            case 18:
              $(this).html("soldier76")
              break;
            case 19:
              $(this).html("lucio")
              break;
            case 20:
              $(this).html("dva")
              break;
            default:

          }
          return $(this).html().toLowerCase()
        }).get()


        $(`div[data-mode="${p.mode}"] div[data-group-id="stats"]`).each(function (table, el) {
          let hero = heros[table]
          p.stats[hero] = {}
          // if (table != 0) return
          $(this).find('.data-table .stat-title').each(function () {
            let sect = $(this).text()
            p.stats[hero][sect] = {}
            $(this).parents().eq(4).find('tbody tr').each(function (row, el) {
              let prop = $(this).find('td').eq(0).text()
              let val = $(this).find('td').eq(1).text()
              p.stats[hero][sect][prop] = val
            });
          })
        })

        if (!this.data[p.platform]) this.data[p.platform] = {}
        if (!this.data[p.platform][p.region]) this.data[p.platform][p.region] = {}
        if (!this.data[p.platform][p.region][p.mode]) this.data[p.platform][p.region][p.mode] = {}

        this.data.names[p.platform] = p.name
        this.data[p.platform].name = p.name
        this.data[p.platform][p.region][p.mode].stats = p.stats
        resolve(this.get())
      })
      .catch(err => {
        resolve(this.get())
      })
    });
  }

  fetch(obj) {
    // let p = this
    let p = {
      platform: obj.platform,
      region: (obj.platform != 'pc') ? 'global': obj.region,
      name: obj.name,
      mode: obj.mode,
      url: (obj.platform != 'pc') ?
        `https://playoverwatch.com/en-us/career/${obj.platform}/${obj.name}` :
        `https://playoverwatch.com/en-us/career/${obj.platform}/${obj.region}/${obj.name}`,
      stats: {}
    }
    this.fetched[`${p.platform}:${p.region}:${p.name}:${p.mode}`] = p
    return this._fetch(p)
  }

  update() {
    let proms = []
    Object.keys(this.fetched).forEach(f => {
      this.fetched[f].stats = {}
      proms.push(this._fetch(this.fetched[f]))
    })
    this.data = {
      names: {},
    }
    return new Promise((resolve, reject) =>{
      Promise.all(proms).then(values => resolve(this.get()))
    })

  }
}

module.exports = OWScraper
