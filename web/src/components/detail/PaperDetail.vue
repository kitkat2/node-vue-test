<template>
  <div id="paper-detail">
    <my-divider></my-divider>
    <div class="infinite-list-wrapper"></div>
    <el-row class="bg-light-grey">
      <el-col :span="16" :offset="4" class="bg-white py-5 px-4" style="min-height: 20rem;">
        <el-page-header @back="$router.go(-1)" content="论文详情" class="mb-4"></el-page-header>

        <div class="paper-info">
          <h2 class="text-dark text-center">
            {{paper.title}}
            <span class="suffix-tag">{{paper.type}}</span>
          </h2>
          <h4
            class="text-dark text-center"
            style="font-weight: 400"
            v-if="paper.subtitle"
          >{{paper.subtitle}}</h4>
          <el-divider class="mb-5"></el-divider>
          <div class="basic-info">
            <p class="text-gray fs-sm">
              <Strong class="mr-2">作者:</Strong>
              <span
                v-for="(name, index) in authorNames"
                :key="index"
                class="text-secondary mr-2"
              >{{name}}</span>
            </p>
            <p class="text-gray fs-sm">
              <Strong class="mr-2">作者简介:</Strong>
              {{paper.author.brief}}
            </p>
            <p class="text-gray fs-sm">
              <Strong class="mr-2">发布时间:</Strong>
              {{paper.publishDate}}
            </p>

            <p v-if="paper.type === '期刊'" class="text-gray fs-sm">
              <Strong class="mr-2">发布于:</Strong>
              <el-popover placement="right" width="400" trigger="hover" class="author">
                <p class="fs-xs my-0">
                  <span class="text-secondary">刊号：</span>
                  {{paper.journal.issn}}
                  <span
                    class="suffix-tag important"
                  >{{paper.journal.sourceType}}</span>
                </p>
                <span class="text-important" slot="reference">{{paper.journal.name}}</span>
              </el-popover>
              <span></span>
              <span></span>
            </p>
            <p class="text-gray fs-sm">
              <Strong class="mr-2">分类:</Strong>
              <el-tooltip
                class="item"
                effect="dark"
                content="点我查看更多"
                v-for="c in classify"
                :key="c._id"
                placement="right-start"
              >
                <a class="pointer mr-2" @click="showClassify(c._id)">{{c.name}}</a>
              </el-tooltip>
            </p>
            <p class="text-gray fs-sm">
              <Strong class="mr-2">摘要:</Strong>
            </p>
            <p class="text-gray fs-sm p-indent">{{paper.summary}}</p>
            <p class="text-gray fs-sm">
              <Strong class="mr-2">关键词:</Strong>
              <el-tag
                class="mr-2"
                size="small"
                type="info"
                v-for="(word, index) in paper.keyword"
                :key="index"
              >{{word}}</el-tag>
            </p>
            <el-divider></el-divider>
          </div>
          <el-row class="action">
            <el-col
              :span="10"
              class="d-flex jc-between text-gray-1 mt-2"
              style="line-height: 1.5rem;"
            >
              <span>
                <i class="el-icon-view mr-2 fs-xl" style="vertical-align : top;"></i>
                浏览量： {{paper.viewCount}} 次
              </span>
              <span>
                <i class="el-icon-star-off mr-2 fs-xl pointer" style="vertical-align : top;"></i>
                被收藏： {{paper.favoriteCount}} 次
              </span>
            </el-col>
            <el-col :span="4" :offset="10" class="d-flex jc-between">
              <el-tooltip
                class="item"
                effect="dark"
                :content="favorite? '点击取消':'点击收藏'"
                placement="bottom-start"
              >
                <el-button
                  type="warning"
                  icon="el-icon-star-off"
                  @click="handleFavo"
                  :class="{'is-plain': !favorite}"
                  class="favorite"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="在线阅读" placement="bottom-start">
                <el-button type="success" icon="el-icon-reading" circle  @click="enterReadPage"></el-button>
              </el-tooltip>

              <el-tooltip class="item" effect="dark" content="点击下载" placement="bottom-start">
                <el-button type="danger" icon="el-icon-download" circle></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="16" :offset="4" class="bg-white p-4 my-3" style="min-height: 10rem;">
        <paper-comment></paper-comment>
      </el-col>
    </el-row>
    <my-footer></my-footer>
  </div>
</template>

<script>
export default {
  name: "paper-detail",
  data() {
    return {
      paper: {
        author: {}
      },
      classify: [],
      favorite: false
    };
  },
  computed: {
    authorNames() {
      return this.paper.author.names ? this.paper.author.names.split("，") : [];
    },
    userid() {
      return this.$store.state.user._id;
    }
  },
  methods: {
    async fetch(_id) {
      const res = await this.$http.post("rest/paper", { _id });
      if (res) {
        const data = res.data.pop();
        this.getCategory(data.categories);
        this.paper = {
          ...data,
          keyword: data.keyword ? data.keyword.split(";") : []
        };
        this.getFavorite();
        console.log(this.favorite)
      }
    },
    async getCategory(categories) {
      const res = await this.$http.post("rest/categories", { _id: categories });
      if (res) {
        this.classify = res.data;
      }
    },
    async handleFavo() {
      console.log("handleFavo");
      this.favorite = !this.favorite;
      this.paper.favoriteCount = this.favorite
        ? ++this.paper.favoriteCount
        : --this.paper.favoriteCount;
      const params = {
        user: this.userid,
        paper: this.paper._id
      };
      if (this.userid !== "") {
        if (this.favorite) {
          const res = await this.$http.post(`/rest/favorites/create`, {
            ...params,
            favoriteCount: this.paper.favoriteCount
          });
          if (res.data) {
            this.$message({
              type: "success",
              message: "收藏成功"
            });
          }
        } else {
          const res = await this.$http.post(`/rest/favorites/delete`, params);
          if (res) {
            console.log(res.data);
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
    getFavorite() {
      const params = {
        user: this.userid,
        paper: this.$route.query.paperid
      };
      console.log("userid", this.userid)
      if (this.userid !== "") {
        this.$http.post("/rest/favorites", params).then(res => {
          this.favorite = res.data.length > 0 ? true : false;
        });
      }
    },
    showClassify(id) {
      this.$router.push({ name: "classify", query: { cid: id } });
    },
    enterReadPage () {
      this.$store.commit('READ_INFO', this.paper.body)
      this.$router.push({name:'reading', query: {paperid: this.paper._id, view: this.paper.viewCount}})
    }
  },
  created() {
    this.fetch(this.$route.query.paperid);
  }
};
</script>

<style lang="scss" scoped>
</style>