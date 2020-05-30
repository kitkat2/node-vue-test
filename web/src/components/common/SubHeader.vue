<template>
  <div id="sub-header" class="bg-white">
    <el-row class="text-center fs-xs py-4">
      <el-col :span="2" :offset="5">
        <img src="../../static/img/logo-zn.png" alt style="height: 4rem;" />
      </el-col>

      <el-col :span="10">
        <el-input placeholder="请输入搜索内容" class="inline-input mr-3 mt-2" :fetch-suggestions="querySearch" v-model="search" style="width: 60%;"  :trigger-on-focus="false" @select="handleSelect"></el-input>
        <el-button type="primary" class="bg-primary el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: -1.5rem;" class="mb-4">
      <el-col class="fs-xs text-secondary pl-3"  :span="16" :offset="5" style=" word-spacing: 0.5rem;">
        <span class="mr-3"> m a k e </span>
        <span class="mr-3"> t h e </span>
        <span class="mr-3"> m i n d </span>
        <span class="mr-3"> w i l d e r </span> .
      </el-col>
    </el-row>
    <my-divider></my-divider>
  </div>
</template>

<script>
// <el-autocomplete
//       class="inline-input"
//       v-model="state2"
//       :fetch-suggestions="querySearch"
//       placeholder="请输入内容"
//       :trigger-on-focus="false"
//       @select="handleSelect"
//     ></el-autocomplete>
export default {
  name: "sub-header",
  data() {
    return {
      search: "",
      restaurants: []
    };
  },
  methods: {
     querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
       handleSelect(item) {
        console.log(item);
      }
  }
};
</script>

<style lang="scss" scoped>
</style>