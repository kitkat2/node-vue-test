<template>
  <div id="classify-filter">
    <el-collapse-transition>
      <el-card v-if="visible" class="w-100 border-primary" id="drop-card">
        <vue-scroll style="height: 6rem; overflow-y: auto;" :ops="options">
          <div v-if="children.length>0">
            <el-tag
              size="small"
              type="warning"
              v-for="child in children"
              :key="child._id"
              class="mr-3 my-1 pointer bg-border"
              @click="getPapers(child._id)"
            >{{ child.name }}</el-tag>
          </div>
          <div v-else class="text-gray text-center fs-sm w-100 pt-5">暂无数据~</div>
        </vue-scroll>

        <p class="text-right my-1">
          <span class="el-icon-arrow-up fs-xs text-gray pointer" @click="close">
            <a class="ml-2">收起</a>
          </span>
        </p>
      </el-card>
    </el-collapse-transition>
    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
      style="height: 7.5rem; overflow: hidden;"
    >
      <el-tab-pane label="文献" name="document"></el-tab-pane>
      <el-tab-pane label="学科" name="subject"></el-tab-pane>
      <el-tag size="small" effect="dark" class="mr-3 my-1 pointer" @click="getAll">全部</el-tag>
      <el-tag
        size="small"
        v-for="item in items"
        :key="item._id"
        effect="dark"
        class="mr-3 my-1 pointer"
        @click="getChildren(item.value)"
      >{{ item.name }}</el-tag>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "classify-filter",
  data() {
    return {
      items: [],
      children: [],
      visible: false,
      activeName: "subject",
      crtTagName: "",
      // 滚动条配置参数
      options: {
        bar: {
          size: "6px",
          background: "#fdf6ec",
          keepShow: false
        }
      }
    };
  },

  methods: {
    async fetch(val) {
      const res = await this.$http.get(`rest/categories/parent`, {
        params: { value: val }
      });
      if (res) {
        this.items = [...res.data];
      }
    },
    async getChildren(val) {
      this.visible =
        this.crtTagName === ""
          ? !this.visible
          : val === this.crtTagName
          ? !this.visible
          : this.visible;
      this.crtTagName = val;
      if (this.crtTagName.substring(0, 2) === "01") {
        const res = await this.$http.get(`rest/categories/parent`, {
          params: { value: val }
        });
        if (res) {
          this.children = [...res.data];
        }
      } else {
        this.visible = false;
        this.$store.commit("PAPER_TYPE", this.crtTagName);
      }
    },
    getPapers(_id) {
      this.$store.commit("setCrtCategory", _id);
    },
    getAll() {
      this.getPapers(Math.random(10).toString());
      this.$store.commit("PAPER_TYPE", '');
    },
    handleTabClick(e) {
      this.visible = false;
      this.crtTagName = "";
      let val = e.index === "0" ? "02" : "01";
      this.fetch(val);
      this.$store.commit("PAPER_TYPE", "");
      this.$store.commit("setCrtCategory", Math.random(10).toString());
    },
    close() {
      this.visible = false;
      this.crtTagName = "";
    }
  },

  created() {
    let val = this.activeName === "subject" ? "01" : "02";
    this.fetch(val);
    // this.getPapers('');
  },
  watch: {
    $route: {
      handler: function(newVal) {
        if (Object.keys(newVal.params).length > 0) {
          this.activeName = "document";
          this.$store.commit("PAPER_TYPE", newVal.params.type);
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
#classify-filter {
  position: relative;
  #drop-card {
    position: absolute;
    top: 100%;
    z-index: 10;
  }
}
</style>