<template>
  <div class="search_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <!-- 搜索内容和导出区域 -->
      <el-row>
        <el-col :span="2" style="float: right">
          <download-excel
            class="export-excel-wrapper"
            :data="tableData"
            :fields="json_fields"
            :header="title"
            name="订单表格.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" class="el-icon-printer" size="mini"
              >导出Excel</el-button
            >
          </download-excel>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button
            type="primary"
            class="el-icon-printer"
            size="mini"
            @click="downLoad"
            >导出PDF</el-button
          >
        </el-col>
        <el-col :span="2" style="float: right">

         <el-button type="success" class="el-icon-full-screen" size="mini" @click="fullScreen"
           >全屏</el-button
         >
       </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        stripe
        id="pdfDom"
        :default-sort="{ prop: 'cardNumber', order: 'ascending' }"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column prop="orderNumber" label="订单编号" sortable>
        </el-table-column>
        <el-table-column prop="bookName" label="书名" sortable>
        </el-table-column>
        <el-table-column prop="cardName" label="收货人" sortable>
        </el-table-column>
        <el-table-column prop="address" label="收获地址" sortable>
        </el-table-column>
        <el-table-column prop="orderStatus" label="订单状态(0未发货，1发货)" sortable>
        </el-table-column>
      </el-table>
      <!-- 分页查询区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryInfo.pageNum"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="this.queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          orderNumber: Number,
          bookName: "",
          cardName:"",
          address:"",
          orderStatus:"",
        },
      ],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        userId: 1,
      },
      total: 0,
      title: "图书借阅表格",
      json_fields: {
        借阅编号: "cardNumber",
        图书编号: "bookNumber",
        借阅日期: "borrowDate",
        截止日期: "closeDate",
        归还日期: "returnDate",
      },
      loading: true,
    };
  },

  methods: {
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;

      this.searchOrderByPage();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;

      this.searchOrderByPage();
    },
    async searchOrderByPage() {
      this.activePath = window.sessionStorage.getItem("activePath");
      // console.log(this.activePath)
      // 先获取sessionStorage中的id`
      const stringId = window.sessionStorage.getItem("userId");
      const id = parseInt(stringId);
      this.queryInfo.userId = id;
      this.loading = true;
      const { data: res } = await this.$http.post(
        "user/search_order_page",
        this.queryInfo
      );

      this.tableData = [];
      // console.log(res);
      if (res.status !== 200) {
        this.total = 0;
        this.loading = false;
        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.tableData = res.data.records;
       this.total = parseInt(res.data.total);
      this.loading = false;
    },
    downLoad() {
      this.getPdf(this.title); //参数是下载的pdf文件名
    },
    fullScreen(){
          // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
    let full = document.fullscreenElement;
    // 切换为全屏模式
    if(!full){
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
    }else{
        // 退出全屏模式
        document.exitFullscreen();
    }
    }
  },
  created() {
    this.searchOrderByPage();
  },
};
</script>

<style>
</style>