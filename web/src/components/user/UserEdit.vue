<template>
  <div id="user-edit">
    <my-divider></my-divider>
    <el-row class="bg-light-grey">
      <el-col :span="16" :offset="4" class="bg-white user-info">
        <el-page-header @back="$router.go(-1)" content="个人中心" class="mt-4 ml-4"></el-page-header>
        <el-tabs
          type="border-card"
          class="my-5 mx-4"
          style="min-height: 37.5rem;"
          v-model="active"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="基础信息" name="basis" ></el-tab-pane>
          <el-tab-pane label="更改密码" name="passwd"></el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row>
      <my-footer></my-footer>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "user-edit",
  data() {
    return {
      active: "basis"
    };
  },
  computed: {},
  methods: {
    handleTabClick() {
      const path = this.active;
      this.$router.push({ name: path }).catch(err => {err});
    }
  },
  created () {
    this.handleTabClick()
  }
};
</script>

<style lang="scss" scoped>
</style>