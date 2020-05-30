<template>
  <div id="user-list">
    <el-row class="list-header">
      <el-col :span="2">
        <h1 style="margin: 0;">用户列表</h1>
      </el-col>
      <el-col :span="7" :offset="10" >
        <el-input v-model="search" type="text" placeholder="输入用户名搜素" prefix-icon="el-icon-search" size="small" />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="fetch(page.crtPage)" size="small" style="margin-left: 10px; width:100%;">搜索</el-button>
      </el-col>
      <el-col :span="2"  style="margin-left: 20px;">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="$router.push('/users/create')"
        >新增用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="userData" border height="500">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="avatar" label="头像" width="150">
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

      <el-table-column fixed="right" label="操作" width="150">
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
      search: "",
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
      let params = {
        page: { crtPage, pageSize: this.page.pageSize }
      };
      if (this.search !== "") {
        params.search = { name: this.search };
      }
      const res = await this.$http.post("rest/users/page", params);
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
 margin-bottom: 20px;
}
</style>
