<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt="" /> -->
        <span>欢迎登录图书商城</span>
        <span style="color: #ccc; font-size: 16px">读者界面</span>
      </div>
      <div>
        <a href="https://github.com/Traviskey" title="GitHub地址" target="_blank"
            style="margin-right:10px">
        <svg t="1686048645435" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="1265" width="30" height="30">
          <path
              d="M0 524.992q0 166.016 95.488 298.496t247.488 185.504q6.016 0.992 10.016 0.992t6.496-1.504 4-3.008 2.016-4.992 0.512-4.992v-100.512q-36.992 4-66.016-0.512t-45.504-14.016-28.992-23.488-16.992-25.504-8.992-24-5.504-14.496q-8.992-15.008-27.008-27.488t-27.008-20-2.016-14.496q50.016-26.016 112.992 66.016 34.016 51.008 119.008 30.016 10.016-40.992 40-70.016Q293.984 736 237.984 670.976t-56-158.016q0-87.008 55.008-151.008-22.016-64.992 6.016-136.992 28.992-2.016 64.992 11.488t50.496 23.008 25.504 17.504q56.992-16 128.512-16t129.504 16q12.992-8.992 28.992-19.008t48.992-21.504 60.992-9.504q27.008 71.008 7.008 135.008 56 64 56 151.008 0 92.992-56.992 158.496t-172 85.504q43.008 43.008 43.008 104v128.992q0 0.992 0.992 3.008 0 6.016 0.512 8.992t4.512 6.016 12 3.008q152.992-52 250.496-185.504t97.504-300.512q0-104-40.512-199.008t-108.992-163.488-163.488-108.992T512.032 12.96 313.024 53.472 149.536 162.464t-108.992 163.488-40.512 199.008z"
              p-id="1266" fill="#1296db"></path>
        </svg>
      </a>
        <div>
          <el-avatar src="https://tse4-mm.cn.bing.net/th/id/OIP-C.mL8R_9LF6Zk8NQrmwPAimAHaHa?w=197&h=197&c=7&r=0&o=5&dpr=2&pid=1.7" :size="35"
            style="margin-right: 10px"></el-avatar>
        </div>

        <div class="user">用户:{{ this.user.cardName }}</div>
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
          <el-menu-item index="index" @click="saveNavState('index')">
            <i class="iconfont icon-shouyefill"></i>
            <span slo="title">首页</span>
          </el-menu-item>
          <el-menu-item index="search" @click="saveNavState('search')">
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
          <el-menu-item index="information" @click="saveNavState('information')">
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
            <br>
            客服电话:{{system.tele}}
            <br>
            邮编:{{system.postcode}}
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
      system:{
        tele:123,
        postcode: Number,
        webname:""
      },
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
    this.getsystem();
  },
  async mounted() { },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

  async  getsystem(){
    const {data: res1} = await this.$http.get("admin/getsystem");
    this.system = res1.data;
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