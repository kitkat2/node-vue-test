<template>
  <div id="comment-card">
    <!-- <el-input
      type="textarea"
      :rows="textArea.rowCount"
      :placeholder="textArea.placeholder"
      v-model="comment"
      resize="none"
      maxlength="150"
      show-word-limit
    ></el-input>-->
    <mavon-editor
      v-model="comment"
      ref="md"
      @change="change"
      :ishljs="true"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      style="height: 20rem;"
      :placeholder="placeholder"
    />
    <div class="d-flex mt-2 w-100">
      <el-popover placement="bottom" trigger="click" class="flex-1">
        <emoji class="w-100"></emoji>
        <font-awesome-icon
          :icon="['far','smile']"
          slot="reference"
          class="text-gray-1 mt-2 fs-lg pointer"
        />
      </el-popover>
      <el-button type="primary" size="small" @click="save">
        评 论
        <i class="el-icon-s-promotion"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import Emoji from "../../common/Emoji";
export default {
  name: "comment-card",
  props: ["replyTo", "textRow", "type", "commentId"],
  components: {
    Emoji
  },
  data() {
    return {
      comment: "",
      showEmoji: false,
      html: "",
      placeholder: "",
      commonBaseUrl: "http://localhost:3000/common/api"
    };
  },
  computed: {
    emoji() {
      return this.$store.state.emoji ? this.$store.state.emoji.data : "";
    },
    userid() {
      return this.$store.state.user._id;
    },
    paperid() {
      return this.$route.query.paperid;
    }
  },
  methods: {
    save() {
      if (!this.userid) {
        this.$confirm("评论需要先登录,您还没有登录，是否先登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login/0");
          })
          .catch(() => {});
      } else if (this.comment === "") {
        this.$message({
          type: "warning",
          message: "评论不能为空哦~"
        });
      } else {
        let params = {
          from: this.userid,
          paperId: this.paperid,
          content: this.html
        };
        if (this.type === "reply") {
          params = {
            ...params,
            to: this.replyTo._id,
            parentId: this.commentId
          };
        }
        this.$http.post("/rest/comments/create", params).then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: "评论成功！"
            });
            (this.comment = ""), this.$store.commit("COMMENT_SUBMIT");
          }
        });
      }
    },
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
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
    imgDel() {}
  },
  created() {
    this.placeholder = this.replyTo
      ? `回复${this.replyTo.name}: `
      : "我要评论...";
  },
  watch: {
    emoji(newVal) {
      this.comment += newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>