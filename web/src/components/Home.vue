<template>
  <div class="home">
    <el-container>
      <el-header style="height: auto; padding: 0;">
        <my-header></my-header>
        <sub-header></sub-header>
      </el-header>
      <el-container style="width: 75%; margin: 0 auto;">
        <el-main>
          <paper-card></paper-card>
        </el-main>
        <el-aside width="18rem">
          <user-card></user-card>
        </el-aside>
      </el-container>
      <el-footer style="padding: 0;">
        <my-footer></my-footer>
      </el-footer>
      <!-- <template>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap" >
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >UP</div>
      </el-backtop>
    </template> -->
    </el-container>
    
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>