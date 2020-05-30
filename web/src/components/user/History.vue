<template>
  <div id="history" class="mt-2">
    <div v-if="isCrtUser">
      <el-timeline>
        <el-timeline-item
          :timestamp="history.date"
          placement="top"
          v-for="(history, index) in historyData"
          :key="index"
          color="#ffe60f"
        >
          <el-card class="info-card">
            <p class="my-0 fs-sm text-gray">
              您于 {{history.date}} 浏览了
              <span>{{history.author}}</span> 等的
              <a
                href="javascript:;"
                @click="$router.push({name: 'detail', query: {paperid: history.paperId._id}})"
              >{{history.paperId.title}}</a>
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <p class="mt-3 fs-xs text-gray text-center">
        此处只显示最近10条浏览记录，点击
        <router-link to="/history" class="fs-sm">历史阅读</router-link>查看更多
      </p>
    </div>
    <div v-else class="py-5">
      <p class="my-5 fs-md text-gray text-center">抱歉，您没有权限查看当前用户的历史浏览</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "history",
  props: ["isCrtUser", "crtActive"],
  data() {
    return {
      historyData: [],
      reverse: true,
      page: {
        crtPage: 1,
        pageSize: 10
      }
    };
  },
  computed: {
    uid() {
      return this.$route.query.uid;
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getHistory() {
      const query = this.uid ? { userId: this.uid } : {};
      const page = { ...this.page, sortedBy: { viewTime: -1 } };
      const res = await this.$http.post("rest/history/page", { page, query });
      if (res) {
        this.historyData = res.data.datas.map(item => {
          item.date = this.dateFormatter(new Date(item.viewTime));
          item.author = item.paperId.author.names.split(",")[0];
          return item;
        });
      }
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
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },
  created() {
    this.getHistory();

    // if (this.crtActive === "views") {
    // }
  }
};
</script>

<style lang="scss" scoped>
#history {
  .info-card {
    .el-card__body {
      padding: 0.75rem;
    }
  }
}
</style>