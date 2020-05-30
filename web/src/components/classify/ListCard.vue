<template>
  <div id="list-card">
    <el-card>
      <div>
        <h4 class="d-flex my-0">
          <span
            class="flex-1 pl-2 pointer"
            style="border-left: 3px solid #FFC300; line-height: 2rem;"
          >{{paper.title}}</span>
          <el-button type="primary" class="button" size="small" @click="getDetail(paper._id)">查看详情</el-button>
        </h4>
        <el-divider class="my-2"></el-divider>
        <p style="text-indent: 1rem;" class="fs-sm summary">
          {{summary}}
          <router-link
            :to="{name: 'detail',query: { paperid: paper._id}}"
            v-if="showMore"
            class="ml-2"
          >查看更多>></router-link>
        </p>

        <p>
          <el-tag
            v-for="(tag, index) in tags"
            :key="index"
            :type="tag.type"
            size="small"
            class="mr-2"
          >{{tag.value}}</el-tag>
        </p>
        <div class="d-flex jc-between fs-xs text-gray">
          <el-popover
            placement="top-start"
            width="400"
            trigger="hover"   
            class="author"         
          >
            <p class="fs-xs  my-0"><span class="text-secondary">简介：</span>{{paper.author.brief}}</p>
            <span slot="reference">作者: {{paper.author.names}}</span>
          </el-popover>
          <span>发布日期: {{paper.publishDate}}</span>
          <span><i class="el-icon-view mr-2"></i>浏览: {{paper.viewCount}} 次</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "list-card",
  props: ["paper"],
  data() {
    return {
      tagTypes: ["", "success", "info", "warning", "danger"]
    };
  },
  computed: {
    tags() {
      let values = this.paper.keyword ? this.paper.keyword.split(";") : [];
      let tags = [];
      for (let val of values) {
        let rIndex = Math.floor(Math.random() * 4);
        tags.push({ value: val, type: this.tagTypes[rIndex] });
      }
      return tags;
    },
    summary() {
      return this.paper.summary.length > 280
        ? this.paper.summary.slice(0, 280) + "..."
        : this.paper.summary;
    },
    showMore() {
      return this.paper.summary.length > 280 ? true : false;
    }
  },
  methods: {
    getDetail(_id) {
      this.$router.push({
        name: "detail",
        query: {
          paperid: _id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#list-card{
  .author{
    &:hover{
      color: #FFC300;
    }
  }
}
</style>