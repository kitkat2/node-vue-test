<template>
  <div id="login" class style="height: 100vh;">
    <el-row class="bg-primary w-100 py-5">
      <el-col :span="10" class="my-5 py-5">
        <el-row class="logo my-3 text-center">
          <el-col :span="4" :offset="10">
            <img src="../../static/img/logo-zn-gray.png" alt style="height: 6rem;" />
          </el-col>
          <el-col :span="6" :offset="8" class="mt-3">
            <img src="../../static/img/brand-en-gray.png" alt style="height: 5rem;" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14" class="my-5 py-4">
        <el-tabs
          type="border-card"
          style="width: 30rem; height: 22rem;"
          class="login-tabs"
          :stretch="true"
          v-model="active"
        >
          <el-tab-pane name="login" label="登 录">
            <login-pane></login-pane>
          </el-tab-pane>
          <el-tab-pane name="register" label="注 册">
            <register-pane></register-pane>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: "login",
 
  data() {
    return {
      panes: ["login", "register"],
      active: ""
    };
  },
  methods: {
    getActivePane() {
      this.active = this.$route.params.id
        ? this.panes[this.$route.params.id]
        : this.panes[0];
      console.log(this.$route.params.id);
    }
  },
  created() {
    this.getActivePane();
  }
};
</script>

<style lang="scss" scoped>
#login {
  .login-tabs {
    margin: 0 auto;
    box-shadow: 10px 10px 5px rgba($color: #c99a00, $alpha: 0.78);
    border-radius: 0.5rem;
  }
}
</style>