<template>
  <div class="login_container">
    <div class="login_title">用户登录界面</div>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="data:image/jpeg;base64,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" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model.trim="loginForm.username" prefix-icon="iconfont icon-gerenxinxi"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-tianchongxing-" type="password"
                    @keyup.enter.native="login" :show-password="true"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"  @click="showEditDialog"
          >注册</el-button>
          <el-button type="info" @click="traveller">游客访问</el-button>
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
    <el-dialog
        title="用户注册"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
    >
      <el-form
          :model="editForm"
          ref="editFormRef"
          :rules="editFormRules"
          label-width="120px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"  placeholder="请输入用户名" type="password"></el-input>
        </el-form-item>
        <el-form-item label="收货人" prop="cardName">
          <el-input v-model="editForm.cardName"  placeholder="请输入收货人"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model="editForm.address"  placeholder="请输入收货地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="register"
          >确 定</el-button
          >
        </span>
    </el-dialog>
    <vue-particles class="login-bg" color="#39AFFD" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle"
                   :particleSize="4" linesColor="#8DD1FE" :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150"
                   :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles>
    <div class="footer">
      <span>
        <!-- <i class="iconfont icon-haoyou " @click="goUser"></i> -->
      </span>
      <span>
        <i class="iconfont icon-guanliyuan" @click="goAdmin"></i>
      </span>
    </div>
    <div class="footer2">
      <p>
        ©2023-10 By 天启安康
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
        username: "天启安康",
        password: "123456",
      },

      //登录表单规则的验证对象
      loginFormRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
      loginLoading: false,
      editDialogVisible: false,
      editForm: {
        password: "",
        username: "",
        cardName:"",
        address:"",
      },
    };
  },
  methods: {
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
        // 进行md5加密(交给后端了
        const username = this.loginForm.username;
        const password = this.loginForm.password;
        //向数据库发送axios请求，如果登录成功，就跳转
        const { data: res } = await this.$http.post(
            "user/login",
            {
              username,
              password
            }
        );
        if (res.status !== 200) {
          this.loginLoading = false;
          return this.$message.error(res.msg);
        }
        // console.log(res);
        this.$message.success("登录成功");
        this.loginLoading = false;
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("userId", res.data.id);
        this.$router.push("/home"); //跳转到home页面下
      });
    },
    traveller(){
      this.$router.push("/travellerhome")
    },
    goUser() {
      this.$router.push("/login");
    },
    goAdmin() {
      this.$router.push("/loginadmin");
    },
    showEditDialog() {
      // 让修改公告的对话框可见
      this.editDialogVisible = true;
    },
    async register(){

      const {data:res} = await this.$http.post('user/register',{
        password:this.editForm.password,
        username:this.editForm.username,
        cardName:this.editForm.cardName,
        address:this.editForm.address,
      })
      if(res.status !== 200){
        return this.$message.error(res.msg);
      }
      this.$message.success(res.msg)
      this.editDialogVisible = false;
      this.$refs.editFormRef.resetFields();
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
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
  background: url(https://ts3.cn.mm.bing.net/th?id=OIP-C.SnUH55WFHv5VLHYZ2pGKJQHaEx&w=311&h=200&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2) no-repeat 0px 0px;
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