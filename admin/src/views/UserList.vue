<template>
  <div id="user-list">
    <h1 class="list-header">
      <span>用户列表</span>
       <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="$router.push('/users/create')"
      >新增论文</el-button>
    </h1>
    <el-table :data="userData">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="100">
        <template v-slot="scope">
          <img
            v-if="scope.row.avatar"
            :src="scope.row.avatar"
            alt
            style="height: 3rem; width: 3rem; border-radius: 50%"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
          >编辑</el-button>
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
      userData: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  methods: {
    async fetch(crtPage) {
      const res = await this.$http.post("rest/users/page", {
        page: { crtPage, pageSize: this.page.pageSize }
      });
      if (res) {
        this.userData = res.data.datas;
        this.page.total = res.data.total;
      }
    },
    async remove(row) {
      this.$confirm(`确定要删除该用户${row.name}及相关信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/users/${row._id}`);
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
    handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
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
