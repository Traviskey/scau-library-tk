import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/components/Login.vue') },
  { path: '/loginmanage', component: () => import('@/components/BookManage/LoginBookManage.vue') },
  {
    path: '/home', component: () => import('@/components/Home/Home.vue'), redirect: '/index',
    children: [
      {
        path: '/index', component: () => import('@/components/Index/Index.vue'), meta: {
          title: "首页"
        }
      },
      { path: '/search', component: () => import('@/components/User/Search.vue') },
      { path: '/cart', component: () => import('@/components/User/Cart.vue') },
      { path: '/collection', component: () => import('@/components/User/Collection.vue') },
      { path: '/information', component: () => import('@/components/User/Information.vue') },
      { path: '/order', component: () => import('@/components/User/Order.vue') }
    ]
  },
  {
    path: '/travellerhome', component: () => import('@/components/Traveller/TravellerHome.vue'),redirect: '/tindex',
    children: [
      {
        path: '/tindex', component: () => import('@/components/Traveller/Index.vue'), meta: {
          title: "首页"
        }
      },
      { path: '/tsearch', component: () => import('@/components/Traveller/Search.vue') },
      { path: '/tinformation', component: () => import('@/components/Traveller/Information.vue') },
    ]
  },
  { path: '/loginadmin', component: () => import('@/components/Admin/LoginAdmin.vue') },
  {
    path: '/homeadmin', component: () => import('@/components/Home/HomeAdmin.vue'),
    children: [
      { path: '/bookmanage', component: () => import('@/components/Admin/BookManage.vue') },
      { path: '/booktype', component: () => import('@/components/Admin/BookType.vue') },
      { path: '/orderhandle', component: () => import('@/components/Admin/OrderHandle.vue') },
        //用户管理
      { path: '/bookadminmanage', component: () => import('@/components/Admin/BookAdminManage.vue') },
        //系统信息
      { path: '/adminmanage', component: () => import('@/components/Admin/AdminManage.vue') }
    ]
  },
  {
    path: '/404', component: () => import('@/components/404/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }

]

const router = new VueRouter({
  routes
})
// //挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数表示放行
  const tokenStr = window.sessionStorage.getItem('token');
  if (tokenStr) {
    next();
  } else {
    // 用户未登录判断
    if (to.path === '/login'  || to.path === '/loginadmin' || to.path==='/travellerhome' || to.path === '/tindex'|| to.path ==='/tsearch'|| to.path ==='/tinformation'){
      next();
    } else {
      next({ path: '/login' });
    }
  }

})
export default router
