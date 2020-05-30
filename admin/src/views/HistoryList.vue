<template>
  <div id="favorite-list">
    <h1 class="list-header">
      <span>历史记录</span>
    </h1>
    <el-table :data="favorites"   height="500" border :default-sort = "{prop: 'value', order: 'ascending'}">
      <el-table-column prop="_id" label="_id" width="250" sortable></el-table-column>
      <el-table-column prop="userId.name" label="用户名" width="200"></el-table-column>
      <el-table-column prop="paperId.title" label="论文"></el-table-column>
      <el-table-column prop="date" label="时间" width="200" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
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
import tools from  '../util'
export default {
  data() {
    return {
      favorites: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10,
      }
    };
  },
  methods: {
    // 获取分类列表
    async fetch(crtPage) {
      const res = await this.$http.post("rest/history/page/favo", {
        page: {crtPage, pageSize: this.page.pageSize, sortedBy:  { viewTime: -1 }}
      });
      if (res) {
        this.favorites = res.data.datas.map(item => {
          item.date =tools.dateFormatter(new Date(item.viewTime))
          return item
        });
        this.page.total = res.data.total;
      }
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`确定要删除此条历史记录?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/history/${row._id}`,  {params: {update: 'viewCount'}});
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
      this.page.crtPage = crtPage
      this.fetch(crtPage);
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
