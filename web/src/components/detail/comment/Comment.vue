<template>
  <div id="paper-comment">
    <h2 class="text-gray mt-0">
      <i class="el-icon-edit mr-2 bg-primary text-white p-1" style="border-radius: 0.25rem"></i> 评论区
      <span class="fs-sm text-gray-1 ml-2 fw-4">共 {{total}} 条评论</span>
    </h2>
    <my-divider class="mb-4"></my-divider>
    <el-row class="write-comment">
      <el-col :span="2">
        <el-avatar :size="60" :src="user.avatar" v-if="user && user.avatar !== ''"></el-avatar>
        <el-avatar :size="60" v-else icon="el-icon-user-solid" class="fs-xxl"></el-avatar>
      </el-col>
      <el-col :span="22">
        <comment-card :type="'comment'"></comment-card>
      </el-col>
    </el-row>

    <el-row class="comment-list">
      <div class="hot">
        <h3 class="text-gray mt-5 mb-2 pb-1">
          热门评论
          <span class="suffix-tag important">Hot !</span>
        </h3>
        <el-divider class="bg-primary mt-2" height="2"></el-divider>
        <comment-list :comment-type="'hot'"></comment-list>
      </div>
      <div class="new">
        <h3 class="text-gray mt-5 mb-2 pb-1">
          最新评论
          <span class="suffix-tag important">New !</span>
        </h3>
        <el-divider class="bg-primary mt-2" height="2"></el-divider>
        <comment-list :comment-type="'new'"></comment-list>
      </div>
    </el-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "paper-comment",

  data() {
    return {
    
    };
  },
  computed: {
    ...mapState({
     user: 'user',
     total: 'total'
    }),

  }
};
</script>

<style lang="scss" scoped>
// #paper-comment {

// }
</style>