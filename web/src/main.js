import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'



import axios from 'axios'


// common
// header
import Header from './components/common/Header.vue'
import SubHeader from './components/common/SubHeader.vue'
// aside
import UserCard from './components/common/UserCard.vue'
// mian
import PaperCard from './components/home/PaperCard.vue'
import CardAside from './components/home/CardAside.vue'
import CardMain from './components/home/CardMain.vue'

// footer
import Footer from './components/common/Footer.vue'



// 引用font-awesome
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

Vue.use(ElementUI)
Vue.prototype.$http = axios

new Vue({
  render : h => h(App)
}).$mount("#app")

