<template>
  <div id="comment-item">
    <el-row class="my-3">
      <el-col :span="2">
        <el-avatar :size="60" :src="comment.from.avatar"></el-avatar>
      </el-col>
      <el-col :span="22">
        <p class="comment-body mt-0 fs-xs text-gray">
          <a
            href="javasprit:;"
            @click="$router.push({name:'userCenter', query:{ uid: comment.from._id}})"
          >{{comment.from.name}}</a>
          :
          <span v-html="comment.content"></span>
        </p>
        <p
          class="bg-light-grey py-2 px-3 fs-xs text-gray parent"
          style="border-radius: 0.25rem;"
          v-if="comment.parentId"
        >
          <a
            href="javasprit:;"
            @click="$router.push({name:'userCenter', query:{ uid: comment.parentId.from._id}})"
          >{{comment.parentId.from.name}}</a>
          :
          <span v-html="comment.parentId.content"></span>
        </p>
        <p class="comment-footer fs-xs d-flex">
          <span class="date flex-1 text-gray-1">{{comment.date}}</span>
          <span class="action text-gray">
            <span>
              <font-awesome-icon
                :icon="['far','thumbs-up']"
                class="mr-1 pointer icon fs-md"
                :class="{active : thumbsUpActive}"
                @click="thumbsUp"
              />
              ({{comment.likeCount}})
            </span>
            <span class="text-gray-1 mx-2 fw-7">|</span>
            <span class="reply pointer" @click="showReply = !showReply">回复</span>
          </span>
        </p>

        <el-collapse-transition>
          <div class="reply bg-light-grey p-3" style="border: 1px solid #ccc" v-if="showReply">
            <comment-card
              :reply-to="comment.from"
              :text-row="2"
              :type="'reply'"
              :comment-id="comment._id"
            ></comment-card>
          </div>
        </el-collapse-transition>

        <el-divider class="mt-3"></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "comment-item",
  props: ["comment"],
  data() {
    return {
      showReply: false,
      thumbsUpActive: false
    };
  },
  computed: {
    commentSubmit() {
      return this.$store.state.commentSubmit;
    },
    userid() {
      return this.$store.state.user._id;
    }
  },
  methods: {
    async thumbsUp() {
      this.thumbsUpActive = !this.thumbsUpActive;
      const params = {
        user: this.userid,
        comment: this.comment._id,
        type: "c"
      };
      if (this.userid) {
        if (this.thumbsUpActive) {
          this.comment.likeCount++;
          const res = await this.$http.post(`/rest/likes/create`, {
            ...params,
            likeCount: this.comment.likeCount
          });
          if (res.data) {
            console.log("success");
          }
        } else {
          this.comment.likeCount--;
          const res = await this.$http.post(`/rest/likes/delete`, params);
          if (res) {
            console.log("取消成功");
          }
        }
      } else {
        this.$confirm("评论需要先登录,您还没有登录，是否先登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$router.push("/login/0");
          })
          .catch(() => {});
      }
    },
    getLikes() {
      const params = {
        user: this.userid,
        comment: this.comment._id,
        type: "c"
      };
      if (this.userid !== "") {
        this.$http.post("/rest/likes/activeState", params).then(res => {
          this.thumbsUpActive = res.data.len > 0 ? true : false;
        });
      }
    }
  },
  created() {
    this.getLikes();
  },
  watch: {
    commentSubmit() {
      this.showReply = false;
      // this.getLikes()
    }
  }
};
</script>

<style lang="scss" scoped>
#comment-item {
  .icon {
    &.active {
      color: #ffc300;
    }
  }
}
</style>