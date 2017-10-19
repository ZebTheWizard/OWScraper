window.Vue = require('vue')
window._ = require('lodash');
window.axios = require('axios');
window.jQuery = window.$ = require('jquery')

Vue.component('main', require('./components/main.vue'))

const main = new Vue({
  el: '#main'
})
