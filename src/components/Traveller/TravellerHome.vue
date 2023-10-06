<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt="" /> -->
        <span>欢迎登录图书商城</span>
        <span style="color: #ccc; font-size: 16px">游客界面</span>
      </div>
      <div>
        <a href="https://gitee.com/tianqiankang" title="Gitee" target="_blank">
          <svg t="1686041211368" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="1834" width="30" height="30">
            <path
                d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"
                fill="#C71D23" p-id="1835"></path>
          </svg>
        </a>
        <div>
          <el-avatar src="https://tse4-mm.cn.bing.net/th/id/OIP-C.mL8R_9LF6Zk8NQrmwPAimAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=2&pid=1.7" :size="35"
                     style="margin-right: 10px"></el-avatar>
        </div>

        <div class="user">游客</div>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu :default-active="activePath" class="el-menu-vertical-demo" background-color="#fff" text-color="black"
                 active-text-color="#ffd04b" :router="true" :collapse="isCollapse" :collapse-transition="false">
          <el-menu-item index="/tindex" >
            <i class="iconfont icon-shouyefill"></i>
            <span slo="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/tsearch" >
            <i class="iconfont icon-sousuoxiao"></i>
            <span slot="title">图书查询</span>
          </el-menu-item>
          <el-menu-item index="cart" @click="saveNavState('cart')">
            <i class="iconfont icon-guizeshezhi"></i>
            <span slot="title">购物车</span>
          </el-menu-item>
          <el-menu-item index="collection" @click="saveNavState('collection')">
            <i class="iconfont icon-gonggao1"></i>
            <span slot="title">收藏</span>
          </el-menu-item>
          <el-menu-item index="/tinformation" @click="saveNavState('information')">
            <i class="iconfont icon-gerenxinxi"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="order" @click="saveNavState('order')">
            <i class="iconfont icon-tushuqikan"></i>
            <span slot="title">订单信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
        <div class="footer">
          <p>
            ©2023-10 By 天启安康
          </p>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>


export default {
  data() {
    return {
      //左侧菜单数据
      menulist: [],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      //是否折叠
      isCollapse: false,
      //被激活的链接地址
      activePath: "",
      user: {
        userId: Number,
        cardNumber: Number,
        ruleNumber: Number,
        status: Number,
        cardName: "",
        username: "",
        password: "",
        createTime: "",
        updateTime: "",
      },
    };
  },
  async created() {
    // this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
    // console.log(this.activePath)
    // 先获取sessionStorage中的id`
    const stringId = window.sessionStorage.getItem("userId");
    const id = parseInt(stringId);
    this.user.userId = id;
    const { data: res } = await this.$http.post("user/getData", this.user);
    console.log(res);
    window.sessionStorage.setItem('cardNumber', res.data.cardNumber)
    this.user = res.data;
  },
  async mounted() { },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },


    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      // console.log("first")
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath;
      // console.log(this.activePath);
    },
    toGitee() {
      console.log(1123);
    }
  },
};
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  bottom: 0px;
  left: 50%;
  color: #ccc;

  a {
    color: #ccc;
  }
}

.home-container {
  height: 100%;
}

.el-header {
  background-color: rgb(34, 34, 34);
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;

  >div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #fff;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  padding: 20px;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  //设置文字之间的间距
  letter-spacing: 0.2em;
  cursor: pointer;
}

.user {
  margin-right: 15px;
  color: #ccc;
  font-size: 16px;
}

.el-menu-item:hover {
  background-color: rgb(51, 122, 183) !important;
}

// .el-menu-item{
//   color:rgb(135, 206, 235) !important;
// }</style>