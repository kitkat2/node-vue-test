<template>
  <el-card id="card-main" style="height: 14rem;">
    <ul class="paper-list" v-if="datas.length > 0">
      <li class="py-2 text-gray" v-for="data in datas" :key="data._id" @click="$router.push({name: 'detail',query: {paperid: data._id}})">
        <el-row>
          <el-col :span="14" class="title" :title="data.title">{{data.title}}</el-col>
          <el-col :span="6">
            <i class="el-icon-view fs-sm">
              <span class="ml-2">浏览: {{data.viewCount}}</span>
            </i>
          </el-col>
          <el-col :span="4">
            <span class="fs-sm">{{data.publishDate}}</span>
          </el-col>
        </el-row>
      </li>
    </ul>
    <div v-else class="mt-5 py-5 text-center text-gray-1">暂无数据</div>
  </el-card>
</template>


<script>
export default {
  name: "card-main",
  props: ["typeVal"],
  data() {
    return {
      datas: [],
      page: {
        crtPage: 1,
        pageSize: 5,
      }
    };
  },
  methods: {
    async fetch() {
      const query = this.typeVal ? { type: this.typeVal } : {};
      const page = { ...this.page, sortedBy: { viewCount: -1 } };
      const res = await this.$http.post(`rest/papers/page`, { query, page });
      if (res) {
        this.datas = [...res.data.datas];
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
#card-main {
  border: 1px solid #ffccbc;
  // border-left: none;
  .paper-list {
    margin: 0;
    padding: 0;
    width: 100%;
    list-style: none;
    li {
      position: relative;
      width: 100%;
      padding-left: 1.75rem;
      cursor: pointer;
      &::before {
        content: " ";
        display: block;
        position: absolute;
        left: 1rem;
        width: 0.25rem;
        height: 1rem;
        background: #fed802;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &:hover {
        color: #ffc300;
      }
    }
  }
}
</style>