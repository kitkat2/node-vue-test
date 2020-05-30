<template>
  <div id="userEdit">
    <h1>{{id ? '编辑': '新建'}}分类</h1>
    <el-form label-width="100px" :model="form" @submit.native.prevent="save">
      <el-form-item label="父级分类">
        <el-select v-model="form.parent" filterable clearable placeholder="请选择父级分类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类代码">
        <el-input v-model="form.value"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      form: {},
      options:[],
    };
  },
  methods: {
    afterUpload(res) {
      console.log(res);
      this.$set(this.form, "avatar", res.url);
      console.log(this.form.avatar);
    },
    async save() {
      let res;
      if (this.id)
        res = await this.$http.put(`rest/categories/${this.id}`, this.form);
      else res = await this.$http.post("rest/categories", this.form);

      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/categories/list");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      if (res) this.form = res.data;
      console.log(this.form)
    },
    async fetchParent() {
      let reg = '^[0-9]{2,4}$'
      const res = await this.$http.get(`rest/categories/options/${reg}`);
      this.options = res.data
    }
  },
  created() {
    this.fetchParent();
    this.id && this.fetch();
  }
};
</script> 

<style>

</style>