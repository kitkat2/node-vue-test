<template>
  <div id="comment-list">
    <div v-if="comments.length > 0">
      <comment-item
        v-for="(comment, index) in comments"
        :key="index"
        class="my-3"
        :comment="comment"
      ></comment-item>
      <el-pagination
        background
        layout="prev, pager, next, total, jumper"
        :total="page.total"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        class="my-4 text-center"
        v-if="commentType === 'new'"
      ></el-pagination>
    </div>

    <div v-else class="fs-sm text-gray w-100 text-center py-3">暂时还没有评论哦~ 明天再来看看吧~</div>
  </div>
</template>

<script>
export default {
  name: "comment-list",
  props: ["commentType"],
  data() {
    return {
      comments: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  computed: {
    commentSubmit() {
      return this.$store.state.commentSubmit;
    }
  },
  methods: {
    async fetchHot() {
      const _id = this.$route.query.paperid;
      const res = await this.$http.get("/comments/hot", {
        params: { paperId: _id }
      });
      if (res) {
        this.comments = res.data.map(item => {
          item.date = this.dateFormatter(new Date(item.createTime));
          return item;
        });        
      }
    },
    async fetchNew() {
      const query = this.$route.query.paperid
        ? { paperId: this.$route.query.paperid }
        : {};
      const page = { ...this.page, sortedBy: { createTime: -1 } };
      const res = await this.$http.post("/comments/new", { page, query });
      if (res) {
        this.page.total = res.data.total;
        this.comments = res.data.datas.map(item => {
          item.date = this.dateFormatter(new Date(item.createTime));
          return item;
        });
        this.$store.commit('setTotal', this.page.total)

      }
    },
    handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
      this.fetchNew();
    },
    dateFormatter(date) {
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 > 9
          ? `${date.getMonth() + 1}`
          : `0${date.getMonth() + 1}`;
      let day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
      let hour =
        date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`; //获取当前小时数(0-23)
      let minute =
        date.getMinutes() > 9
          ? `${date.getMinutes()}`
          : `0${date.getMinutes()}`; //获取当前分钟数(0-59)
      let second =
        date.getSeconds() > 9
          ? `${date.getSeconds()}`
          : `0${date.getSeconds()}`; //获取当前秒数(0-59)
      return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`;
    }
  },
  created() {
    if (this.commentType === "new") this.fetchNew();
    else this.fetchHot();
  },
  watch: {
    commentSubmit() {
      if (this.commentType === "new") this.fetchNew();
      else this.fetchHot();
    }
  }
};
</script>

<style lang="scss" scoped>
#comment-list {
  .icon {
    &.active {
      color: #ffc300;
    }
  }
}
</style>