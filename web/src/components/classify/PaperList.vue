<template>
  <div id="paper-list">
    <el-row v-if="papers.length > 0" style="min-height: 100vh">
      <el-col :span="24" v-for="paper in papers" :key="paper._id" class="my-3 mx-2">
        <list-card :paper="paper"></list-card>
      </el-col>
    </el-row>
    <el-row v-else class="text-center text-gray-1 py-5" style="min-height: 100vh">
      <p>暂时没有数据╮(╯_╰)╭</p>
    </el-row>
    <el-divider class="bg-secondary"></el-divider>

    <el-row v-if="papers.length > 0">
      <el-pagination
        background
        layout="prev, pager, next, total, jumper"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "paper-list",
  data() {
    return {
      papers: [],
      page: {
        crtPage: 1,
        pageSize: 10,
        total: 10
      },
      id: "",
      typeChange: false
    };
  },
  computed: {
    ...mapState({
      categoryId: "crtCategory",
      paperType: "paperType"
    })
  },
  methods: {
    async fetch() {
      let query = {};
      if (this.paperType !== '') {
        const res = await this.$http.post("rest/categories", {
          value: this.paperType
        });
        if (res) {
          let typeVal = res.data.pop().name;
          query = typeVal ? { type: typeVal } : {};
        }
      } else {
        query = parseFloat(this.id) > 1 ? { categories: this.id } : {};
      }
      const page = { ...this.page, sortedBy: { viewCount: -1 } };
      const res = await this.$http.post(`rest/papers/page`, { query, page });
      if (res) {
        this.papers = [...res.data.datas];
        this.page.total = res.data.total;
      }
      this.typeChange = false;
    },

    handleCurrentChange(crtPage) {
      this.page.crtPage = crtPage;
      this.fetch();
    }
  },
  created() {
    this.id = this.$route.query ? this.$route.query.cid : "";
    this.fetch();
  },
  watch: {
    categoryId(newVal) {
      this.id = newVal;
      this.fetch();
    },
    paperType() {
      this.typeChange = true;
      this.fetch();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>