<template>
<!-- 100vh 代表整个屏幕的高度 -->
  <el-container style="height: 100vh;">
    <el-aside width="15rem" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/users/create">新增用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>论文资源管理
          </template>
          <el-menu-item-group>
            <template slot="title">论文分类</template>
            <el-menu-item index="/categories/create">新增分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="论文信息">
            <el-menu-item index="/papers/create">新增论文</el-menu-item>
            <el-menu-item index="/papers/list">论文列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-comment"></i>评论管理
          </template>
          <el-menu-item-group>
            <template slot="title">评论</template>
            <el-menu-item index="/comments/list">评论列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-notebook-1"></i>笔记管理
          </template>
          <el-menu-item-group>
            <template slot="title">笔记</template>
            <el-menu-item index="/notes/list">笔记列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown  @command="handleCommand">
          <i class="el-icon-s-custom" style="cursor: pointer;"><span style="margin-left: 0.5rem;">{{username}}</span></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出登录</el-dropdown-item> 
          </el-dropdown-menu>
        </el-dropdown>
        
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    return  {
      username: ''
    }
  },
  methods: {
    getUsername(){
      this.username = this.$route.params.username || localStorage.username
    },
    handleCommand(command) {
      if(command === 'logout'){
        localStorage.clear()
        this.$router.push('/login')
      }
      
    }
  },
  created () {
    this.getUsername()
  }

};
</script>