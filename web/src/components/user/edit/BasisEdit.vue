<template>
  <div id="basis-edit">
    <el-form label-width="3.125rem" :model="form" ref="form" :rules="rules" class="py-4 pr-5">
      <el-form-item label="头像">
        <div class="avatar">
          <el-avatar shape="square" :size="150" :src="avatar" style="display: block"></el-avatar>
          <div
            class="avatar-mask pointer text-center text-white w-100"
            @click="$store.commit('openCropper')"
          >
            <span v-if="avatar">更改头像</span>
            <span v-else>上传头像</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="form.name" placeholder="更改用户名" @blur="checkUsername"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          v-model="form.brief"
          type="textarea"
          :rows="3"
          placeholder="用一段话介绍自己吧~"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="更改绑定邮箱" disabled></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit('form')">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <span>确定保存更改信息？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更改头像" :visible.sync="upload.showCropper" width="70%">
      <cropper></cropper>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "basis-edit",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        console.log("isExisted", this.isExisted);
        if (this.isExisted) {
          callback(new Error("昵称已被占用"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      option: {},
      showCropper: false,
      changePass: false,
      dialogVisible: false,
      isExisted: false,
      rules: {
        name: [{ validator: validateUsername, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({ form: "user", upload: "upload" }),
    avatar() {
      return this.upload.url ? this.upload.url : this.form.avatar;
    }
  },
  methods: {
    async save() {
      console.log("save");
      this.dialogVisible = false;
      this.form.avatar = this.avatar;
      const res = await this.$http.put(`rest/user/${this.form._id}`, this.form);
      if (res) {
        console.log(res);
      }
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkUsername() {
      this.$http.post("rest/user", { name: this.form.name }).then(res => {
        if (res.data.length > 0) {
          if (res.data[0]._id !== this.form._id) {
            console.log(res.data[0]._id !== this.form._id);
            this.isExisted = true;
          } else {
            this.isExisted = false;
          }
        } else {
          this.isExisted = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#basis-edit {
  .avatar {
    position: relative;
    width: 9.375rem;
    height: 9.375rem;
    border-radius: 0.25rem;
    overflow: hidden;
    .avatar-mask {
      position: absolute;
      bottom: -2rem;
      transition: bottom 0.5s;
      height: 2rem;
      line-height: 2rem;
      background: rgba($color: #000000, $alpha: 0.4);
    }
    &:hover {
      .avatar-mask {
        bottom: 0rem;
      }
    }
  }
}
</style>