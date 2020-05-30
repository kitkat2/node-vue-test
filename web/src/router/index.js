import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../components/Home.vue'
import Classify from '../components/classify/Classify.vue'
import Login from '../components/login/Login.vue'
import UserCenter from '../components/user/UserCenter.vue'
import UserEdit from '../components/user/UserEdit.vue'
import BasisEdit from '../components/user/edit/BasisEdit.vue'
import PasswdEdit from '../components/user/edit/PasswdEdit.vue'
import HistoryView from '../components/history/HistoryView.vue'
import PaperDetail from '../components/detail/PaperDetail.vue'
import ReadView from '../components/detail/reading/ReadView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/classify',
    name: 'classify',
    component: Classify
  },
  {
    path: '/login/:id',
    name: 'login',
    component: Login
  },
  {
    path: '/userCenter',
    name: 'userCenter',
    component: UserCenter,
  },
  {
    path: '/userEdit',
    name: 'userEdit',
    component: UserEdit,
    children: [{
        path: 'basis',
        name: 'basis',
        component: BasisEdit,
      },
      {
        path: 'passwd',
        name: 'passwd',
        component: PasswdEdit,
      }
    ]
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/detail',
    name: 'detail',
    component: PaperDetail,
    children: [

    ]
  },
  {
    path: '/reading',
    name: 'reading',
    component: ReadView
  }



]

const router = new VueRouter({
  routes
})

export default router