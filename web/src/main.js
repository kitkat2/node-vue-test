import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import VueCropper from 'vue-cropper'
import vuescroll from 'vuescroll' 
import store from './store'
// import openOffice from 'open-office'
import mavonEditor from 'mavon-editor'
import http from './http'


//-- common
// -header
import Header from './components/common/Header.vue'
import SubHeader from './components/common/SubHeader.vue'
// -aside
import UserCard from './components/common/UserCard.vue'
// -mian
import PaperCard from './components/home/PaperCard.vue'
import CardAside from './components/home/CardAside.vue'
import CardMain from './components/home/CardMain.vue'

// -footer
import Footer from './components/common/Footer.vue'
// -divider
import Divider from './components/common/Divider.vue'
import Cropper from './components/common/Cropper.vue' 


// --classify
import Classify from './components/classify/Classify.vue'
import Filter from './components/classify/Filter.vue'
import PaperList from './components/classify/PaperList.vue'
import ListCard from './components/classify/ListCard.vue'

// --login
import LoginPane from './components/login/LoginPane.vue'
import RegisterPane from './components/login/RegisterPane.vue'

// userCenter
import UserInfo from './components/user/UserInfo.vue'
import UserTabs from './components/user/UserPaperTab.vue'
import FavoriteList from './components/user/FavoriteList.vue'
import NoteList from './components/user/NoteList.vue'
import History from './components/user/History.vue'

// detail
import Comment from './components/detail/comment/Comment.vue'
import CommentList from './components/detail/comment/CommentList.vue'
import CommentCard from './components/detail/comment/CommentCard.vue'
import CommentItem from './components/detail/comment/CommentItem.vue'


// // 引用font-awesome
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)


Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';
import './normalize.scss'
import '../src/common/style/element-variables.scss'



// font-awesome
Vue.component('font-awesome-icon', FontAwesomeIcon)


// common
Vue.component(Header.name, Header)
Vue.component(SubHeader.name, SubHeader)
Vue.component(UserCard.name, UserCard)
Vue.component(PaperCard.name, PaperCard)
Vue.component(CardAside.name, CardAside)
Vue.component(CardMain.name, CardMain)
Vue.component(Footer.name, Footer)
Vue.component(Divider.name, Divider)
Vue.component(Cropper.name, Cropper)

// classify
Vue.component(Classify.name, Classify)
Vue.component(Filter.name, Filter)
Vue.component(PaperList.name, PaperList)
Vue.component(ListCard.name, ListCard)

// login
Vue.component(LoginPane.name, LoginPane)
Vue.component(RegisterPane.name, RegisterPane)

// user center
Vue.component(UserInfo.name, UserInfo)
Vue.component(UserTabs.name, UserTabs)
Vue.component(FavoriteList.name, FavoriteList)
Vue.component(NoteList.name, NoteList)
Vue.component(History.name, History)

// detail
Vue.component(Comment.name, Comment)
Vue.component(CommentList.name, CommentList)
Vue.component(CommentCard.name, CommentCard)
Vue.component(CommentItem.name, CommentItem)



Vue.use(ElementUI)
Vue.use(VueCropper)
Vue.use(vuescroll) 
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.prototype.$http = http

Vue.mixin({
  // computed: {
  //   commonBaseUrl() {
  //     return ' http://localhost:3000/common/api'
  //   }
  // },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  store,
  render : h => h(App)
}).$mount("#app")

