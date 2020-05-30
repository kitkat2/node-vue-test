<template>
  <div id="passwd-edit">
    <div class="text-center">
      <el-tag type="danger">
        <i class="el-icon-warning mr-2"></i> 密码必须符合由数字,大写字母,小写字母,至少其中两种组成，且长度不小于8，同时第一位不能为数字。
      </el-tag>
    </div>
    <el-divider></el-divider>
    <el-form label-width="100px" :model="form" ref="form" :rules="rules" class="py-4 pr-5">
      <!-- <el-form-item label="旧密码" prop="oldPasswd">
        <el-input
          v-model="form.oldPasswd"
          type="password"
          placeholder="输入旧密码"
          :show-password="true"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="新密码" prop="passwd">
        <el-input v-model="form.passwd" type="password" placeholder="输入新密码" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPasswd">
        <el-input
          v-model="form.checkPasswd"
          type="password"
          placeholder="再输入一次新密码"
          :show-password="true"
        ></el-input>
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
  </div>
</template>

<script>
export default {
  name: "passwd-edit",
  data() {
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        if (this.form.checkPasswd !== "") {
          this.$refs.form.validateField("checkPasswd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        passwd: "",
        checkPasswd: ""
      },
      rules: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        checkPasswd: [{ validator: validatePass2, trigger: "blur" }]
      },
      dialogVisible: false
    };
  },
  methods: {
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
    async save() {
      console.log("save");
      this.dialogVisible = false
      const res = await this.$http.put(`rest/user/${this.$route.params.id}`,{passwd: this.form.passwd})
      if(res.status === 200){
        this.$message({
          type: "success",
          message: "密码更改成功，请重新登录！"
        })
        localStorage.clear()
        this.$store.commit('removeUser')
        this.$router.push('/login/0')
      }
    },
  }
};
</script>