<template>
  <div id="userEdit">
    <h1>{{id ? '编辑': '新建'}}用户</h1>
    <el-form label-width="100px" :model="form" @submit.native.prevent="save">
      <el-form-item label="头像">
        <!-- <el-input v-model="form.avatar"></el-input> -->
        <el-upload
          class="avatar-uploader"
          accept="image/*"
          :action="uploadUrl"
          :headers = "getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passwd"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.brief"  type="textarea" :rows="3" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-radio-group v-model="form.authority">
          <el-radio label="普通用户" value="0"></el-radio>
          <el-radio label="管理员"  value="1"></el-radio>
          <el-radio label="超级管理员"  value="2"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="冻结用户">
        <el-switch v-model="form.isBlocked"></el-switch>
      </el-form-item>
      <el-form-item label="注销用户">
        <el-switch v-model="form.isLogoff"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      form: {}
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
        res = await this.$http.put(`rest/users/${this.id}`, this.form);
      else res = await this.$http.post("rest/users", this.form);

      if (res) {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.$router.push("/users/list");
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      if (res) this.form = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script> 

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>