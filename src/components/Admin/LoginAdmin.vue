<template>
  <div class="login_container">
    <div class="login_title">系统管理员登录界面</div>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/images/logo.png" alt=""/>
      </div>
      <!-- 登录表单区域 -->
      <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
              v-model.trim="loginForm.username"
              prefix-icon="iconfont icon-gerenxinxi"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              prefix-icon="iconfont icon-tianchongxing-"
              type="password"
              @keyup.enter.native="login"
              :show-password="true"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <vue-particles
        class="login-bg"
        color="#39AFFD"
        :particleOpacity="0.7"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#8DD1FE"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
    >
    </vue-particles>
    <div class="footer">
      <span><i class="iconfont icon-haoyou" @click="goUser"></i></span>
      <span>
        <!-- <i class="iconfont icon-guanliyuan" @click="goAdmin"></i> -->
      </span>
    </div>
    <div class="footer2">
      <p>
        ©2023-10 By 天启安康
        <br>
        客服电话:{{system.tele}}
        <br>
        邮编:{{system.postcode}}
      </p>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      //登录表单
      loginForm: {
        username: "root",
        password: "123456",
      },
      system:{
        tele:123,
        postcode: Number,
        webname:""
      },
      //登录表单规则的验证对象
      loginFormRules: {
        username: [
          {required: true, message: "用户名不能为空", trigger: "blur"},
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      loginLoading: false
    };
  },
  async created() {
    this.getsystem();
  },
  methods: {
    async  getsystem(){
      const {data: res1} = await this.$http.get("admin/getsystem");
      this.system = res1.data;
    },
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        //如果表单验证无效，直接返回
        if (!valid) {
          return;
        }
        this.loginLoading = true;
        // 进行md5加密
        const username = this.loginForm.username;
        const password = this.loginForm.password;
        //向数据库发送axios请求，如果登录成功，就跳转
        const {data: res} = await this.$http.post(
            "admin/login",
            {
              username,
              password
            }
        );
        // console.log(res);
        if (res.status !== 200) {
          this.loginLoading = false;
          return this.$message.error(res.msg);
        }
        this.$message.success("登录成功");
        this.loginLoading = false;
        // console.log(res);
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("adminId", res.data.id);
        this.$router.push("/homeadmin");
      });
    },
    goUser() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.footer2 {
  position: absolute;
  bottom: 0px;
  left: 45%;
  color: #ccc;

  a {
    color: #ccc;
  }
}

.login_container {
  // background-color: #2b4b6b;
  background: url(https://ts2.cn.mm.bing.net/th?id=OIP-C.6IcqQ4A2KHuqZogZ-9pNygHaE7&w=306&h=203&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2) no-repeat 0px 0px;
  background-size: cover;
  height: 100%;
}

.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_title {
  position: relative;
  top: 5%;
  font-size: 36px;
  color: white;
  text-align: center;
  font-weight: 700;
  //控制字体间距
  letter-spacing: 10px;
}

.footer {
  display: flex;
  position: absolute;
  flex-direction: column;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 120px;
  // background-color: pink;
  span {
    // width: 100%;
    // background-color: red;
    text-align: center;
  }
}
</style>