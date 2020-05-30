<template>
  <div id="favorite-list" class="mt-2">
    <el-table :data="favoriteData" style="width: 100%; min-height: 400px;">
      <el-table-column label="论文">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" width="500">
            <p>
              <strong class="pointer">标题: {{ scope.row.paper.title }}</strong>
            </p>
            <p>作者: {{ scope.row.paper.author.names }}</p>
            <p>
              <el-tag
                v-for="(word, index) in scope.row.keyword"
                :key="index"
                size="small"
                type="primary"
                class="mr-2"
              >{{word}}</el-tag>
            </p>
            <div slot="reference" class="name-wrapper">
              <span
                class="pointer"
                @click="$router.push({name:'detail', query:{ paperid: scope.row.paper._id}})"
              >{{ scope.row.paper.title }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="收藏日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" v-if="isCrtUser">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next, total, jumper"
      :total="page.total"
      @current-change="handleCurrentChange"
      :page-size="page.pageSize"
      class="mt-3"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "favorite-list",
  props: ["isCrtUser"],
  data() {
    return {
      favoriteData: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
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
    async handleDelete(index, row) {
      const params = {
        user: this.uid,
        paper: row.paper._id
      };
      const res = await this.$http.post(`/rest/favorites/delete`, params);
      if (res) {
        this.fetch();
      }
    },
    handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
      this.fetch();
    },
    async fetch() {
      const query = this.uid ? { user: this.uid } : {};
      const page = { ...this.page, sortedBy: { date: -1 } };
      const res = await this.$http.post("rest/favorites/page", { page, query });
      if (res) {
        this.page.total = res.data.total;
        this.favoriteData = res.data.datas.map(item => {
          item.time = this.dateFormatter(new Date(item.date));
          item.keyword = item.paper.keyword.split(";") || [];
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
    console.log(this.uid);
    this.fetch();
  },
  watch: {
    $route() {
      // //做一些路由变化的响应
      // //打开加载动画
      // this.loading = true;
      // //重新获取数据
      // this.initData();
      // /** 初始化其他数据 */
      let uid = this.$route.query.uid;
      if (uid) {
        this.fetch();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>