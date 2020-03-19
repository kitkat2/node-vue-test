<template>
  <div id="category-list">
    <h1 class="list-header">
      <span>分类列表</span>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="$router.push('/categories/create')"
      >新增分类</el-button>
    </h1>
    <el-table :data="categories">
      <el-table-column prop="value" label="分类代码" width="150"></el-table-column>
      <el-table-column prop="parent.name" label="父级分类" width="200"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
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
      categories: [],
      page: {
        current: 1,
        total: 13,
      }

    };
  },
  methods: {
    // 获取分类列表
    async fetch() {
      const res = await this.$http.get("rest/categories");
      if (res) this.categories = res.data;
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`确定要删除分类 '${row.name}'?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/categories/${row._id}`);
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
