<template>
  <div id="history-view">
    <my-divider></my-divider>
    <div class="infinite-list-wrapper"></div>
    <el-row class="bg-light-grey">
      <el-col
        :span="16"
        :offset="4"
        class="bg-white py-5 px-4"
        style="min-height: 20rem; overflow:auto"
      >
        <h3 class="text-gray mt-0 mb-3">
          <i class="el-icon-reading text-secondary mr-2 fs-xl"></i>
          <span style="line-height: 1.5rem;">历史阅读</span>
        </h3>
        <my-divider class="mb-5"></my-divider>

        <el-timeline v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <el-timeline-item
            timestamp="2018/4/12"
            placement="top"
            v-for="(i, index) in count"
            class="list-item"
            :key="index"
            color="#ffe60f"
          >
            <el-card>
              <h4>更新 Github 模板</h4>
              <p>王小虎 提交于 2018/4/12 20:46</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <p v-if="loading" class="text-center text-gray"><i class="el-icon-loading mr-2"></i>加载中...</p>
        <p v-if="noMore" class="text-center text-gray" >已经看到底了，没有更多了~</p>
      </el-col>
    </el-row>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: "history-view",
  data() {
    return {
      count: 10,
      loading: false
    };
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

