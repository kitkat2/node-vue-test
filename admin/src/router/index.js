import Vue from 'vue'
import VueRouter from 'vue-router'

// 登录
import Login from '../views/Login.vue'

// 后台管理主界面
import Main from '../views/Main.vue'
// 用户管理
import userEdit from '../views/UserEdit.vue'
import userList from '../views/UserList.vue'
// 用户操作
import favoriteList from '../views/FavoriteList.vue'
import historyList from '../views/HistoryList.vue'
import likeList from '../views/LikeList.vue'
// 分类管理
import categoryEdit from '../views/CategoryEdit.vue'
import categoryList from '../views/CategoryList.vue'
// 论文管理
import paperEdit from '../views/PaperEdit.vue'
import paperList from '../views/PaperList.vue'

// 评论管理
import commentList from '../views/CommentList.vue'

// 笔记管理
import noteList from '../views/NoteList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true}
  },
  {
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
      path: '/favorites/list',
      component: favoriteList,
    },
    {
      path: '/history/list',
      component: historyList,
    },
    {
      path: '/like/list',
      component: likeList,
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
    {
      path: 'comments/list',
      component:commentList,
    },
    {
      path: '/notes/list',
      component: noteList,
    },
  ]
}, ]

const router = new VueRouter({
  routes
})

// 利用路由守卫对用户的登录进行校验
router.beforeEach((to, from, next) =>{
  if(!to.meta.isPublic && !localStorage.token){
    Vue.prototype.$message({
      type: 'error',
      message: '请先登录'
    })
    return next('/login')
  }
  next()
})
export default router