<template>
  <div id="user-center">
    <my-divider></my-divider>
    <el-row class="bg-light-grey">
      <el-col :span="16" :offset="4" class="bg-white user-info">
        <el-page-header @back="$router.go(-1)" content="个人中心" class="mt-5 mx-4"></el-page-header>
        <user-info-card :uid="uid" :crt-user="crtUser"></user-info-card>
        <user-paper-tabs :uid="uid" :crt-user="crtUser"></user-paper-tabs>
      </el-col>
    </el-row>
    <el-row>
      <my-footer></my-footer>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "user-center",
  data() {
    return {};
  },
  computed: {
    uid() {
      return this.$route.query.uid;
    },
    ...mapState({
      crtUser: "user"
    })
  }
};
</script>

<style lang="scss" scoped>
#user-center {
  .user-info {
    min-height: 20rem;
    border: 1px solid #ffc300;
  }
}
</style>