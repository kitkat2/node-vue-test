<template>
  <div id="paper-list">
    <h1 class="list-header">
      <span>笔记列表</span>
    </h1>
    <el-table :data="papers" border  height="500" >
      <el-table-column prop="paperId.title" label="论文标题"></el-table-column>
      <el-table-column prop="creator.name" label="发布者"></el-table-column>
      <el-table-column prop="date" label="发布日期" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="checkDetail(scope.row)">查看</el-button>
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
    <el-dialog title="笔记详情" :visible.sync="dialogVisible" width="60%" center>
      <h4 style="text-align: center;">{{note.paperId.title}}</h4>
      <p><strong>发布者：</strong>{{note.creator.name}}</p>
      <p><strong>评论时间：</strong> {{note.date}}</p>
      <p><strong>评论内容：</strong></p>
      <p v-html="note.contentHtml"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tools from  '../util'
export default {
  data() {
    return {
      papers: [],
      note: {
        paperId: {},
        creator: {},
      },
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      },
      dialogVisible: false
    };
  },
  methods: {
    // 获取分类列表
    async fetch(crtPage) {
      const res = await this.$http.post("rest/notes/page/favo", {
        page: { crtPage, pageSize: this.page.pageSize }, sortedBy: { createTime: -1 } 
      });
      if (res) {
        this.papers = res.data.datas.map(item => {
          item.date =tools.dateFormatter(new Date(item.createTime))
          return item
        });
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
          await this.$http.delete(`rest/notes/${row._id}`);
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
    },
      // 查看详情
    checkDetail(row){
      this.dialogVisible = true
      this.note = row
    }
  },
  created() {
    this.fetch(this.page.crtPage);
  }
};
</script>

<style scoped>
</style>
