<template>
  <div id="register-pane">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="mt-4">
          <el-form-item prop="email">
            <el-input
              type="email"
              v-model="registerForm.email"
              prefix-icon="el-icon-user"
              placeholder="电子邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passwd">
            <el-popover
              placement="top-start"
              width="300"
              trigger="focus"
              content=" 密码必须符合由数字,大写字母,小写字母,至少其中两种组成，且长度不小于8，同时第一位不能为数字。"
            >
              <el-input
                type="password"
                v-model="registerForm.passwd"
                :show-password="true"
                prefix-icon="el-icon-lock"
                autocomplete="off"
                placeholder="请输入密码"
                slot="reference"
              ></el-input>
            </el-popover>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="registerForm.checkPass"
              :show-password="true"
              prefix-icon="el-icon-lock"
              autocomplete="off"
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="d-flex jc-between">
            <el-button type="primary" @click="submitForm('registerForm')" style="width: 8rem;">注 册</el-button>
            <el-button @click="resetForm('registerForm')" style="width: 8rem;">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "register-pane",
  data() {
    var validatePass = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.passwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        email: "",
        passwd: "",
        checkPass: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        passwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/register", this.registerForm)
            .then(res => {
              console.log(res.data);
              this.$message({
                type: "success",
                message: res.data.message
              });
              localStorage.token = res.data.token;
              this.$router.push("/");
            })
            .catch(err => {
              this.$message({
                  type: "error",
                  message: err.response.data.message
                });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>