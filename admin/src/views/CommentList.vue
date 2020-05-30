<template>
  <div id="comment-list">
    <h1 class="list-header">
      <span>分类列表</span>
    </h1>
    <el-table
      :data="comments"
      height="500"
      border
      :default-sort="{prop: 'date', order: 'ascending'}"
    >
      <el-table-column label="评论类型" width="120">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.to ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.to? '回复': '评论'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="from.name" label="发出者" width="180"></el-table-column>
      <el-table-column prop="to.name" label="回复对象" width="180"></el-table-column>
      <el-table-column prop="paperId.title" label="被评论论文"></el-table-column>
      <el-table-column prop="date" label="评论时间" width="200" sortable></el-table-column>

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

    <el-dialog title="评论详情" :visible.sync="dialogVisible" width="60%" center>
      <h4 style="text-align: center;">{{comment.paperId.title}}</h4>
      <p>
        <strong>评论者：</strong>
        {{comment.from.name}}
      </p>
      <p v-if="comment.to">
        <strong>被评论者：</strong>
        {{comment.to.name}}
      </p>
      <p>
        <strong>评论时间：</strong>
        {{comment.date}}
      </p>
      <p>
        <strong>评论内容：</strong>
      </p>
      <p v-html="comment.content"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tools from "../util";
export default {
  data() {
    return {
      comments: [],
      comment: {
        paperId: {},
        from: {},
        to: {}
      },
      dialogVisible: false,
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
      const res = await this.$http.post("rest/comments/page/favo", {
        page: {
          crtPage,
          pageSize: this.page.pageSize,
          sortedBy: { createTime: -1 }
        }
      });
      if (res) {
        this.comments = res.data.datas.map(item => {
          item.date = tools.dateFormatter(new Date(item.createTime));
          return item;
        });
        this.page.total = res.data.total;
      }
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`确定要删除此条评论?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/comments/${row._id}`);
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
    // 查看详情
    checkDetail(row) {
      this.dialogVisible = true;
      this.comment = row;
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
