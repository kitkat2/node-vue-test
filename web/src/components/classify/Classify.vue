<template>
  <div id="classify">
    <el-container class="bg-light-grey">
      <el-header style="height: auto; padding: 0;">
        <sub-header></sub-header>
      </el-header>
      <el-container style="width: 75%; margin: 0 auto;">
        <el-main class="bg-white mt-4 p-0 mr-3">
          <h4 class="fs-lg mt-0 text-border bg-primary">
            <i class="mr-2 fs-xl el-icon-folder-opened py-2 pl-4"></i>论文分类
          </h4>
          <div class="w-100 p-4">
            <classify-filter></classify-filter>
            <el-divider class="bg-secondary"></el-divider>
            <paper-list></paper-list>
          </div>
        </el-main>
        <el-aside width="18rem" class="aside">
          <user-card></user-card>
        </el-aside>
      </el-container>
      <el-footer style="padding: 0;">
        <my-footer></my-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "classify",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>