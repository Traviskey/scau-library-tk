<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">

    <el-menu-item v-for="item in routes()" :key="item.path" @click="doMeauClick">{{item.path}}</el-menu-item>
    <img src="@/assets/images/logo.png" class="logo">
  </el-menu>
</template>

<script>
import {routes} from "@/router/routers";

export default {
  name: "GlobalHeader",
  methods: {
    routes() {
      return routes
    }
  }
}
</script>

<style scoped>
.logo{
  color:#444;
  height: 60px;
}

</style>