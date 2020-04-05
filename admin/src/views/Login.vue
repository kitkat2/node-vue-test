<template>
  <div id="login">
    <el-card header="请先登录" class="login-card">
      <el-form v-model="model" @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.passwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
    //   保存获取到的token
    // sessionStorage
    localStorage.token = res.data.token;
    this.$router.push('/')
    this.$message({
        type: 'success',
        message: '登录成功'
    })
    }
  }
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>