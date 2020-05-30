<template>
  <div id="home">
    <el-container class="bg-light-grey">
      <el-header style="height: auto; padding: 0;">
        <sub-header></sub-header>
      </el-header>
      <el-container style="width: 75%; margin: 0 auto;" class="d-flex main-container">
        <el-main class="flex-1 pt-4">
          <paper-card></paper-card>
        </el-main>
        <el-aside width="18rem" class="aside">
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
      </template>-->
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
@media only screen and (max-width: 768px) {
  #home {
    
    .main-container{
      width: 100%;
      .aside {
      display: none;
    }
    }

  }
}
</style>