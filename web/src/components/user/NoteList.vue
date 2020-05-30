<template>
  <div id="note-list" class="mt-2">
    <el-table :data="noteData" style="width: 100%; min-height: 400px;">
      <el-table-column label="论文">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" width="500">
            <p>
              <strong class="pointer">标题: {{ scope.row.paperId.title }}</strong>
            </p>
            <p>作者: {{ scope.row.paperId.author.names }}</p>
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
                @click="$router.push({name:'reading', query:{ paperid: scope.row.paperId._id}})"
              >{{ scope.row.paperId.title }}</span>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" v-if="isCrtUser">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除笔记</el-button>
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
  name: "note-list",
  props: ["isCrtUser", "crtActive"],
  data() {
    return {
      noteData: [],
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
        creator: this.uid,
        paperId: row.paperId._id
      };
      const res = await this.$http.post(`/rest/notes/delete`, params);
      if (res) {
        this.fetch();
      }
    },
    handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
      this.fetch();
    },
    async fetch() {
      const query = this.uid ? { creator: this.uid } : {};
      const page = { ...this.page, sortedBy: { createTime: -1 } };
      const res = await this.$http.post("rest/notes/page", { page, query });
      if (res) {
        this.page.total = res.data.total;
        this.noteData = res.data.datas.map(item => {
          item.time = this.dateFormatter(new Date(item.createTime));
          item.keyword = item.paperId.keyword.split(";") || [];
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
    // if(this.crtActive === "notes"){
      
    // }
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