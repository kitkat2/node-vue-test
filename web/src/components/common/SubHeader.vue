<template>
  <div id="sub-header" class="bg-white">
    <el-row class="text-center fs-xs my-4">
      <el-col :span="2" :offset="5">
        <img src="../../static/img/logo-zn.png" alt style="height: 4rem;" />
      </el-col>

      <el-col :span="10">
        <el-input placeholder="请输入搜索内容" v-model="search" style="width: 60%;" class="mr-3 mt-2"></el-input>
        <el-button type="primary" class="bg-primary el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: -1.5rem;" class="mb-5">
      <el-col class="fs-xs text-secondary pl-3"  :span="5" :offset="5" style=" word-spacing: 0.5rem;">m a k e  t h e  m i n d  w i l d e r.</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "sub-header",
  data() {
    return {
      search: ""
    };
  }
};
</script>

<style lang="scss" scoped>
</style>