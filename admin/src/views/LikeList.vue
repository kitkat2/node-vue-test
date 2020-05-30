<template>
  <div id="like-list">
    <h1 class="list-header">
      <span>点赞列表</span>
    </h1>
    <el-table :data="likes" height="500" border :default-sort="{prop: 'date', order: 'ascending'}">
      <el-table-column prop="_id" label="_id" sortable width="250"></el-table-column>
      <el-table-column prop="user.name" label="用户名"></el-table-column>

      <el-table-column prop="comment" label="评论id" width="220"></el-table-column>
      <el-table-column prop="likeCount" label="评论被点赞次数" width="150"></el-table-column>
      <el-table-column
        prop="type"
        label="点赞对象"
        width="200"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === 'c' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.type === 'c'? '评论': '笔记'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page.crtPage"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="page.total"
      style="margin-top: 1rem;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  methods: {
    // 获取分类列表
    async fetch(crtPage) {
      const res = await this.$http.post("rest/likes/page/favo", {
        page: { crtPage, pageSize: this.page.pageSize, sortedBy: { date: 1 } }
      });
      if (res) {
        this.likes = res.data.datas;
        console.log(this.likes);
        this.page.total = res.data.total;
      }
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`确定要删除此条点赞记录吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/likes/${row._id}`,  {params: {update: 'likeCount'}});
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch(this.page.crtPage);
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
    // 分页处理
    async handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
      this.fetch(crtPage);
    },
    filterType(value, row) {
      return row.tag === value;
    }
  },
  created() {
    this.fetch(this.page.crtPage);
  }
};
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
}
</style>
