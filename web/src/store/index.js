import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import upload from './modules/upload'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    upload,
  },
  state: {
    crtCategory: '0',
    paperType: '',
    emoji: {},
    commentSubmit: false,
    total: 0,
    resInfo: {}
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    removeAll(state){
      for (let k of Object.keys(state)) {
        Vue.delete(state, k);
      }
    },
    setCrtCategory(state, payload){
      state.crtCategory = payload
    },
    emoji(state, payload) {
      state.emoji = payload
    },
    COMMENT_SUBMIT(state){
      state.commentSubmit = !state.commentSubmit
    },
    setTotal(state, payload){
      state.total = payload
    },
    PAPER_TYPE(state, payload){
      state.paperType =  payload
    },
    READ_INFO(state, payload){      
      state.resInfo = payload      
    }


  },
  actions: {
  
  },
  
})


export default store