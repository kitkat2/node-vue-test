<template>
  <div id="user-card" class="mt-4">
    <el-card shadow="hover">
      <div id="loged" v-if="user._id" class="pt-4">
        <el-row class="avatar">
          <img :src="user.avatar" :alt="user.name" v-if="user.avatar" />
          <i class="el-icon-user-solid text-white px-2 pt-1" v-else></i>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-center my-3  text-gray" style="line-height: 2rem;">你好！ {{user.name}}</el-col>
          <el-col :span="16" :offset="4">
            <el-button type="primary" style="width: 100%;" @click="$router.push({name:`userCenter`, query: {uid: user._id}})">进入个人中心</el-button>
          </el-col>
        </el-row>
      </div>
      <div id="not-loged" v-else>
        <el-row class="avatar text-center">
          <i class="el-icon-user-solid text-white mt-1"></i>
        </el-row>
        <el-row >
          <el-col :span="16" class="mt-3" :offset="4">
            <el-button type="primary" style="width: 100%;" @click="$router.push('/login/0')">立即登录</el-button>
          </el-col>
          <el-col :span="16" class="my-3" :offset="4">
            <el-button type="primary" style="width: 100%;" @click="$router.push('/login/1')">注 册</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "user-card",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(['user']),
  }
};
</script>

<style lang="scss" scoped>
#user-card {
  border-top: 2.5rem solid #fed802;
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