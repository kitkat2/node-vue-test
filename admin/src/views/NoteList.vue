<template>
  <div id="paper-list">
    <h1 class="list-header">
      <span>笔记列表</span>
    </h1>
    <el-table :data="papers">
      <el-table-column prop="title" label="论文标题"></el-table-column>
      <el-table-column prop="author.names" label="发布者" width="250"></el-table-column>
      <el-table-column prop="creatTime" label="发布日期" width="200"></el-table-column>
      <el-table-column prop="paper.name" label="论文名字" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="dialogVisible = true">查看</el-button>
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
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="60%">
      <span>评论详情</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      papers: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      },
      dialogVisible: false,
    };
  },
  methods: {
    // 获取分类列表
    async fetch(crtPage) {
      const res = await this.$http.post("rest/papers/page", {
        page: { crtPage, pageSize: this.page.pageSize }
      });
      if (res) {
        this.papers = res.data.datas;
        this.page.total = res.data.total;
        console.log(this.papers);
      }
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
    handleCurrentChange(crtPage) {
      this.fetch(crtPage);
    }
  },
  created() {
    this.fetch(this.page.crtPage);
  }
};
</script>

<style scoped>
</style>
