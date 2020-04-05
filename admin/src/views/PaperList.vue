<template>
  <div id="paper-list">
    <h1 class="list-header">
      <span>论文列表</span>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="$router.push('/papers/create')"
      >新增论文</el-button>
    </h1>
    <el-table :data="papers">
      <el-table-column prop="title" label="论文标题"></el-table-column>
      <el-table-column prop="author.names" label="作者" width="250"></el-table-column>
      <el-table-column prop="publishDate" label="发布日期" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/papers/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      papers: [],
      page: {
        current: 1,
        total: 13,
      }

    };
  },
  methods: {
    // 获取分类列表
    async fetch() {
      const res = await this.$http.get("rest/papers");
      if (res) this.papers = res.data;
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`确定要删除分类 '${row.name}'?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/papers/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
    // 分页处理
    handleCurrentChange(){
      console.log("分页");
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
}
</style>
