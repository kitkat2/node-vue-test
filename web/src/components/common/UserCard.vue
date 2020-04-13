<template>
  <div id="user-card" style="padding-top: 1.25rem;">
    <el-card shadow="hover" style="border-color: #fed802">
      <div id="loged" v-if="user" class="pt-4">
        <el-row class="avatar">
          <img src="../../static/img/cx.jpg" alt />
        </el-row>
        <el-row>
          <el-col :span="24" class="text-center my-3" style="line-height: 2rem;">你好！ {{user}}</el-col>
          <el-col :span="16" :offset="4">
            <el-button type="primary" style="width: 100%;">进入个人中心</el-button>
          </el-col>
        </el-row>
      </div>
      <div id="not-loged" v-else>
        <el-row class="avatar text-center">
          <i class="el-icon-user-solid text-white mt-1"></i>
           <!-- <el-avatar icon="el-icon-user-solid text-white mt-1"></el-avatar> -->
        </el-row>
        <el-row >
          <el-col :span="16" class="mt-3" :offset="4">
            <el-button type="primary" style="width: 100%;">立即登录</el-button>
          </el-col>
          <el-col :span="16" class="my-3" :offset="4">
            <el-button type="primary" style="width: 100%;">注 册</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "user-card",
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style lang="scss" scoped>
#user-card {
  .avatar {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    border-radius: 50%;
    border: #fed802;
    background: #fed802;
    font-size: 4rem ;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>