<template>
  <div id="reading">
    <my-divider></my-divider>
    <el-row class="bg-light-grey">
      <el-col :span="24" class="bg-white action-bar">
        <el-row>
          <el-col :span="16" :offset="4" class="d-flex">
            <h2
              class="text-gray flex-1 pl-4"
              style="border-left: 4px solid #fed802; line-height: 24px;"
            >{{paperTitle}}</h2>
            <p class="text-right pr-4">
              <el-button type="primary" size="small " @click="checkNote">查看笔记</el-button>
              <el-button type="primary" size="small " @click="writeNote">我要记笔记</el-button>
              <el-button
                type="primary"
                size="small "
                @click="$router.push({name:'detail', query: {paperid: $route.query.paperid}})"
              >去评论区</el-button>
            </p>
          </el-col>
        </el-row>
      </el-col>
      <vue-scroll style="height: 100vh; overflow-y: auto;" :ops="options">
        <el-col :span="16" :offset="4" class="bg-white pb-5 px-4">
          <p v-if="loading" class="text-center text-gray">
            <i class="el-icon-loading mr-2"></i>加载中...
          </p>
          <p v-if="loadFail" class="text-center text-gray">加载失败...</p>

          <div style="position: relative;" ref="readpot">
            <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page" class="w-100"></canvas>
          </div>
        </el-col>
      </vue-scroll>
      <el-dialog title="笔记" :visible.sync="dialogVisible" width="50%">
        <vue-scroll style="height: 20rem; overflow-y: auto;" :ops="options">
          <mavon-editor
            v-model="note.content"
            ref="md"
            @change="change"
            :ishljs="true"
            @imgAdd="imgAdd"
            style="min-height: 20rem;"
            placeholder="我要记笔记..."
          />
        </vue-scroll>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
      <el-drawer
        :title="noteTitle"
        :visible.sync="drawer.show"
        :direction="drawer.direction"
        size="50%"
      >
        <!-- <el-button type="primary" @click="edit" class="ml-4 mb-4">编 辑</el-button> -->
        <el-divider class="mt-0"></el-divider>
        <vue-scroll style="height: 100vh; overflow-y: auto;" :ops="options">
          <p v-html="note.html" v-if="hasNote" class="note-content w-100 px-4 pb-5 mb-5"></p>
          <p v-else class="no-content w-100 px-4 text-center text-gray-1">您暂时还没有记下任何笔记哦~</p>
        </vue-scroll>
      </el-drawer>
    </el-row>
    <el-row></el-row>
    <my-footer></my-footer>
  </div>
</template>

<script>
import PDFJS from "pdfjs-dist";
import { mapState } from "vuex";
export default {
  name: "reading",
  data() {
    return {
      drawer: {
        show: false,
        direction: "rtl"
      },
      options: {
        bar: {
          size: "6px",
          background: "#fdf6ec",
          keepShow: false
        }
      },
      loading: false,
      loadFail: false,
      dialogVisible: false,
      url: "http://localhost:3000/uploads/resources/",
      pages: 1,
      filename: "",
      paperTitle: "",
      note: {
        _id: "",
        content: "",
        html: ""
      },
      hasNote: false,
      commonBaseUrl: "http://localhost:3000/common/api"
    };
  },
  computed: {
    ...mapState({
      user: "user"
    }),
    noteTitle() {
      return `${this.user.name}的笔记`;
    }
  },

  methods: {
    load() {
      // 加载中
      this.loading = true;
      this.$http
        .get(
          "/getPaperOnline",
          { params: { _id: this.$route.query.paperid } },
          { responseType: "blob" }
        )
        .then(res => {
          this.loading = false;
          let type = "application/pdf";
          let blob = new Blob([res.data], { type: type });

          console.log("blob", blob);
          let url = this.getObjectURL(blob);
          console.log("url", url);

          this._loadFile(url);
        })
        .catch(() => {
          this.loading = false;
          this.loadFail = true;
        });
    },
    _renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        let canvas = document.getElementById("the-canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport({
          scale:
            this.$refs.readpot.offsetWidth /
            page.getViewport({ scale: 1 }).width
        });
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px";
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        if (this.pages > num) {
          this._renderPage(num + 1);
        }
      });
    },
    _loadFile(url) {
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf;
        console.log(pdf);
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
    },
    async getFilename() {
      if (this.$route.query.paperid) {
        const res = await this.$http.post("/rest/papers", {
          _id: this.$route.query.paperid
        });
        if (res) {
          this.filename = res.data[0].body.filename;
          this.paperTitle = res.data[0].title;
          this._loadFile(this.url + this.filename);
        }
      }
    },
    // 查看笔记
    checkNote() {
      if (!this.user._id) {
        this.$confirm("登录后才能查看笔记, 您还没有登录，是否先登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login/0");
          })
          .catch(() => {});
      } else {
        if (!this.html) {
          this.getNote();
        }
        this.drawer.show = true;
      }
    },
    writeNote() {
      if (!this.user._id) {
        this.$confirm("登录后才能记笔记, 您还没有登录，是否先登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login/0");
          })
          .catch(() => {});
      } else {
        this.dialogVisible = !this.dialogVisible;
        if (!this.html) {
          this.getNote();
        }
      }
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.note.html = render;
    },
    imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$http
        .post(`${this.commonBaseUrl}/upload`, formdata)
        .then(res => {
          this.$message({
            type: "success",
            message: "上传成功"
          });
          this.$refs.md.$img2Url(pos, res.data.url);
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "上传失败"
          });
        });
    },
    edit() {},
    save() {
      if (this.note.content === "") {
        this.$message({
          type: "warning",
          message: "笔记不能为空哦~"
        });
      } else {
        let params = {
          creator: this.user._id,
          paperId: this.$route.query.paperid,
          content: this.note.content,
          contentHtml: this.note.html
        };
        if (!this.note._id) {
          this.$http.post("/rest/notes/create", params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "成功记下笔记！"
              });
            }
          });
        } else {
          this.$http.put(`/rest/notes/${this.note._id}`, params).then(res => {
            if (res) {
              this.$message({
                type: "success",
                message: "笔记编辑成功！"
              });
            }
          });
        }
      }
      setTimeout(() => {
        this.dialogVisible = false;
      }, 1000);
    },
    getNote() {
      this.$http
        .post("/rest/notes", {
          creator: this.user._id,
          paperId: this.$route.query.paperid
        })
        .then(res => {
          if (res.data.length) {
            this.note.html = res.data[0].contentHtml;
            this.note.content = res.data[0].content;
            this.note._id = res.data[0]._id;
            this.hasNote = true;
          }
        });
    },
    // 设置历史记录
    setHistory() {
      const params = {
        userId: this.user._id,
        paperId: this.$route.query.paperid
      };
      setTimeout(() => {
        this.$http.post("/rest/history", params).then(res => {
          console.log(res);
          if (!res.data.length) {
            this.$http.post("/rest/history/create", params).then(res => {
              console.log(res);
            });
          }else{
            let _id = res.data[0]._id
            this.$http.put(`/rest/history/${_id}`, params).then(res => {
              console.log(res);
            });
          }
           this.$http.put(`/rest/papers/${this.$route.query.paperid}`, {viewCount: ++this.$route.query.view}).then(res => {
              console.log(res);
            });
        });
      }, 20000);
    },
    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {
          console.log(error);
        }
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {
          console.log(error);
        }
      }
      return url;
    }
  },

  mounted() {
    this.getFilename();
    if (this.user._id) {
      this.setHistory();
    }
  }
};
</script>

<style lang="scss" scoped>
#reading {
  position: relative;
  .select-action {
    position: absolute;
    top: 10rem;
    right: 4rem;
  }
  .action-bar {
    position: sticky;
    border-bottom: 1px solid rgba(81, 79, 79, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    top: 0;
  }
  .el-drawer__wrapper {
    .el-drawer__container {
      .el-drawer__body {
        .note-content {
          p {
            width: 80%;
            img {
              width: 80%;
            }
          }
        }
      }
    }
  }
}
</style>