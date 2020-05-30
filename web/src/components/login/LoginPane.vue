<template>
  <div id="login-pane">
    <el-row>
      <el-col :span="20" :offset="2">
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="mt-4">
          <el-form-item prop="name">
            <el-input
              type="text"
              v-model="loginForm.name"
              autocomplete="off"
              prefix-icon="el-icon-user"
              placeholder="请输入用户名"
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
                v-model="loginForm.passwd"
                :show-password="true"
                prefix-icon="el-icon-lock"
                autocomplete="off"
                placeholder="请输入密码"
                slot="reference"
              ></el-input>
            </el-popover>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item prop="code">
                <el-input
                  type="text"
                  v-model="loginForm.code"
                  prefix-icon="el-icon-key"
                  autocomplete="off"
                  placeholder="请输入验证码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="13" :offset="1" class="d-flex">
              <validate-code :identifyCode="identifyCode"></validate-code>
              <a
                type="text"
                class="text-secondary pointer fs-sm px-2 py-2 ml-2"
                @click="refreshCode"
              >
                <i class="el-icon-refresh-left fs-md mr-1"></i> 换一换
              </a>
            </el-col>
          </el-row>
          <el-form-item class="mt-3 text-center">
            <el-button type="primary" style="width: 8rem;" @click="submitForm('loginForm')">登 录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import validateCode from "./ValidateCode";

export default {
  name: "login-pane",
  components: {
    validateCode
  },
  data() {
    const validatePass = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码格式不正确"));
      } else {
        callback();
      }
    };
    // 验证码自定义验证规则
    const validateVerifycode = (rule, value, callback) => {
      let newVal = value.toLowerCase();
      let identifyStr = this.identifyCode.toLowerCase();
      if (newVal === "") {
        callback(new Error("请输入验证码"));
      } else if (newVal !== identifyStr) {
        callback(new Error("验证码不正确!"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        name: "",
        passwd: "",
        code: ""
      },
      rules: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        code: [
          { required: true, trigger: "blur", validator: validateVerifycode }
        ]
      },
      identifyCode: "1234",
      identifyCodes:
        "1234567890ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const base = "http://localhost:3000/common/api";
          this.$http
            .post(`${base}/login`, this.loginForm)
            .then(res => {
              this.$message({
                type: "success",
                message: "登录成功"
              });
              localStorage.token = res.data.token;
              this.$router.push("/");
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err.response.data.message
              });
              this.refreshCode();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 生成随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    }
  },
  created() {
    this.refreshCode();
  }
};
</script>

<style lang="scss" scoped>
</style>