<template>
  <div id="user-paper-tabs" class="px-5 pb-5">
    <el-tabs v-model="active">
      <el-tab-pane name="favorite">
        <span slot="label" class="fs-md">
          <i class="el-icon-collection"></i> {{isCrtUser? '我' : '他'}}的收藏
        </span>
        <favorite-list :is-crt-user="isCrtUser"></favorite-list>
      </el-tab-pane>
      <el-tab-pane name="views">
        <span slot="label" class="fs-md">
          <i class="el-icon-reading"></i> 历史浏览
        </span>
        <history :is-crt-user="isCrtUser" :crt-active="active"></history>
      </el-tab-pane>
      <el-tab-pane name="notes">
        <span slot="label" class="fs-md">
          <i class="el-icon-notebook-1"></i> {{isCrtUser? '我' : '他'}}的笔记
        </span>
        <note-list :is-crt-user="isCrtUser" :crt-active="active"></note-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "user-paper-tabs",
  props: ["uid", "crtUser"],
  data() {
    return {
      active: "favorite"
    };
  },
  computed: {
    isCrtUser() {
      return this.$route.query.uid === this.crtUser._id
    }
  }
};
</script>

<style lang="scss" scoped>
</style>