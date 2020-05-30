import Vue from 'vue'

const user = {

  state: {
    avatar: '',
    _id: ''
  },
  mutations: {
    setUser(state, payload) {
      state = payload
    },
    setAvatar(state, payload){
      state.avatar = payload
    },
    removeUser(state) {
      for (let k of Object.keys(state)) {
        Vue.delete(state, k);
      }
    }
  },
  actions: {}

}

export default user;