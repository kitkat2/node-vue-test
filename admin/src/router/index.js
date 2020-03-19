import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
// 用户管理
import userEdit from '../views/UserEdit.vue'
import userList from '../views/UserList.vue'
// 分类管理
import categoryEdit from '../views/CategoryEdit.vue'
import categoryList from '../views/CategoryList.vue'
// 论文管理
import paperEdit from '../views/PaperEdit.vue'
import paperList from '../views/PaperList.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  component: Main,
  children: [{
      path: '/users/create',
      component: userEdit,
    },
    {
      path: '/users/edit/:id',
      component: userEdit,
      props: true
    },
    {
      path: '/users/list',
      component: userList,
    },
    {
      path: '/categories/create',
      component: categoryEdit,
    },
    {
      path: '/categories/edit/:id',
      component: categoryEdit,
      props: true
    },
    {
      path: '/categories/list',
      component: categoryList,
    },
    {
      path: '/papers/create',
      component: paperEdit,
    },
    {
      path: '/papers/edit/:id',
      component: paperEdit,
      props: true
    },
    {
      path: '/papers/list',
      component: paperList,
    },
  ]
}, ]

const router = new VueRouter({
  routes
})

export default router