import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import userEdit from '../views/UserEdit.vue'
import userList from '../views/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path:'/users/create',
        component: userEdit,
      },
      {
        path:'/users/edit/:id',
        component: userEdit,
        props: true
      },
      {
        path:'/users/list',
        component: userList,
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
