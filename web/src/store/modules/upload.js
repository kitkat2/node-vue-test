
const upload = {

  state: {
    showCropper: false,
    url: ""
  },
  mutations: {
   upload(state, payload) {
    state.url = payload
    state.showCropper = false
   },
   openCropper(state) {
     state.showCropper = true
   }
  },

}

export default upload;