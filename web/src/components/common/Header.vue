<template>
  <div id="header">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo bg-dark fs-xs text-white"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#ffe60f"
      background-color="#3c3c3c"
      text-color="#909399"
    >
      <el-row>
        <el-col :span="12" class="d-flex">
          <el-menu-item index="1" class="el-icon-s-home"><span class="ml-2">首 页</span></el-menu-item>

          <el-menu-item index="2">论文分类</el-menu-item>
          <el-menu-item index="3">历史阅读</el-menu-item>
        </el-col>
        <el-col :span="2" :offset="8">
          <el-submenu index="4" v-if="user">
            <template slot="title">
             <div >
                <img src="../../static/img/cx.jpg" alt="" class="mr-2 avatar">
               {{user}}
             </div>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-d-arrow-right mr-2"></i> 退出登录
            </el-menu-item>
            <el-menu-item index="4-2">
              <i class="el-icon-user-solid mr-2"></i> 个人中心
            </el-menu-item>
          </el-submenu>
          <el-row v-else>
            <el-col :span="12"><el-menu-item index="5">登录</el-menu-item></el-col>
            <el-col :span="12"><el-menu-item index="6">注册</el-menu-item></el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "my-header",
  data() {
    return {
      activeIndex2: "1",
      user: '吃吃喝喝',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss">
// \deep\
#header {
  .el-menu--horizontal {
    .el-menu-item {
      height: 2rem;
      line-height: 2rem;
      border-bottom: 2px;
      font-size: 0.75rem;
    }

    .el-submenu {
      .el-submenu__title {
        height: 2rem;
        line-height: 2rem;
        border-bottom: 2px;
        font-size: 0.75rem;
      }
      .avatar{
        width: 1.5rem;
        height: 1.5rem; 
        margin-left: -0.625rem;
        border-radius: 50%;
      }
    }
  }
}
.el-menu--horizontal {
  .el-menu--popup {
    min-width: 8rem;
  }
}
</style>