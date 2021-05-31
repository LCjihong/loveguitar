import { createStore } from 'vuex'
const qs = require('qs');

export default createStore({
  state: {
    stringify:qs.stringify,
    colors:[
      {
        color: 'rgb(158,158,158)',
        id:0
      },
      {
        color: 'rgb(61,168,245)',
        id:2
      },
      {
        color: 'rgb(117,201,64)',
        id:3
      },
      {
        color: 'rgb(121,126,201)',
        id:4
      },
      {
        color: 'rgb(255,175,56)',
        id:5
      },
      {
        color: 'rgb(255,79,62)',
        id:6
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
