<template>
  <div id="header">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo bg-dark fs-xs text-white"
      mode="horizontal"
      active-text-color="#ffe60f"
      background-color="#3c3c3c"
      text-color="#909399"
      router
    >
      <el-row>
        <el-col :span="12" class="d-flex">
          <el-menu-item index="/" class="el-icon-s-home">
            <span class="ml-2">首 页</span>
          </el-menu-item>
          <el-menu-item index="/classify">论文分类</el-menu-item>
          <el-menu-item index="/history">历史阅读</el-menu-item>
        </el-col>
        <el-col :span="3" :offset="7">
          <el-submenu index="4" v-if="Object.keys(this.user).length > 0" class="pl-0">
            <template slot="title">
              <div class="user">
                <img :src="user.avatar" :alt="user.name" class="mr-2 avatar" v-if="user.avatar" />
                <el-avatar icon="el-icon-user-solid" :size="24" v-else></el-avatar>
                <span class="username ml-1" :title="user.name">{{user.name}}</span>
              </div>
            </template>
            <el-menu-item @click="logout">
              <i class="el-icon-d-arrow-right mr-2"></i> 退出登录
            </el-menu-item>
            <el-menu-item @click="enterUserCenter">
              <i class="el-icon-user-solid mr-2"></i> 个人中心
            </el-menu-item>
          </el-submenu>
          <el-row v-else>
            <el-col :span="12" class="text-center">
              <el-menu-item index="/login/0">登录</el-menu-item>
            </el-col>
            <el-col :span="12" class="text-center">
              <el-menu-item index="/login/1">注册</el-menu-item>
            </el-col>
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
      user: {}
    };
  },
  methods: {
    logout() {
      for (let k of Object.keys(this.user)) {
        this.$delete(this.user, k);
      }
      localStorage.clear();
      this.$store.commit("removeUser");
      this.$store.commit("removeAll");
    },
    enterUserCenter() {
      this.$router.push({name:'userCenter', query:{ uid: this.user._id}})
    },
    async getUser() {
      try {
        const res = await this.$http.get("/userinit");
        this.user = res ? res.data : {};
        this.$store.commit("setUser", this.user);
      } catch (err) {
        console.log( err.response)
        this.$store.commit("removeUser");
        this.$message({
          type: "warning",
          message: err.response.data.message
        });
        localStorage.clear();
      }
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (oldVal) {
          if (oldVal.name === "login") {
            this.getUser();
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (this.$route.name !== "login" && localStorage.token) {
      this.getUser();
    }
  }
};
</script>

<style lang="scss">
// \deep\
#header {
  position: sticky;
  top: 0;
  z-index: 1000;
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
        padding-left: 0.25rem;
        line-height: 2rem;
        border-bottom: 2px;
        font-size: 0.75rem;
      }
      .user {
        .avatar {
          width: 1.5rem;
          height: 1.5rem;
          margin-left: -0.625rem;
          border-radius: 50%;
        }
        .username {
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis; //文本溢出显示省略号
          display: -webkit-inline-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
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