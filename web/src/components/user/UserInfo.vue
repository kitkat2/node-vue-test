<template>
  <div id="user-info-card" class="py-5 px-5 d-flex">
    <div class="avatar px-2 py-2">
      <el-avatar shape="square" :size="150" :src="user.avatar" v-if="user.avatar"></el-avatar>
      <el-avatar shape="square" :size="150" v-else>假装是个默认头像</el-avatar>
    </div>
    <div class="info ml-4 flex-1">
      <h2 class="text-black mt-2 d-flex">
        <span
          class="flex-1 pl-3"
          style="line-height: 2rem; border-left: 0.25rem solid #fed802"
        >{{user.name}}</span>
        <el-button
          type="primary"
          size="small"
          @click="$router.push(`/userEdit/basis?uid=${user._id}`).catch(err => {err})"
          v-if="user._id === crtUser._id"
        >编辑个人资料</el-button>
      </h2>
      <el-divider></el-divider>
      <p class="text-gray fs-sm">
        个人简介:
        <span v-if="user.brief">{{user.brief}}</span>
        <span v-else-if="user._id === crtUser._id && !user.brief">您还没有填写简介，赶快点击右边编辑个人资料按钮填写简介吧~</span>
        <span v-else>这个人很懒，还没有填写简介~</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-info-card",
  props: ["uid", "crtUser"],
  data() {
    return {
      user: {}
    };
  },

  methods: {
    async fecthUserInfo(val) {
      const res = await this.$http.post("rest/users", val);
      if (res) {
        this.user = res.data.pop();
      }
    }
  },
  created() {
    this.fecthUserInfo({ _id: this.uid });
  },
  watch: {
    $route() {
      // //做一些路由变化的响应
      // //打开加载动画
      // this.loading = true;
      // //重新获取数据
      // this.initData();
      // /** 初始化其他数据 */
      let uid = this.$route.query.uid;
      if (uid) {
        this.fecthUserInfo({ _id: uid });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#user-info-card {
  .avatar {
    border: 1px solid #c5c5c5;
    border-radius: 0.25rem;
  }
}
</style>