<template>
  <div class="search_container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>收藏</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="always">
      <!-- 导出区域 -->
      <el-row>
        <el-col :span="2" style="float: right">
          <download-excel
              class="export-excel-wrapper"
              :data="tableData"
              :fields="json_fields"
              :header="title"
              name="收藏表格.xls"
          >
            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
            <el-button type="primary" class="el-icon-printer" size="mini"
            >导出Excel
            </el-button>
          </download-excel>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button
              type="primary"
              class="el-icon-printer"
              size="mini"
              @click="downLoad"
          >导出PDF
          </el-button>
        </el-col>
        <el-col :span="2" style="float: right">
          <el-button
              type="success"
              class="el-icon-full-screen"
              size="mini"
              @click="fullScreen"
          >全屏
          </el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table
          :data="tableData"
          height="520"
          border
          style="width: 100%; font-size: 14px"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          id="pdfDom"
          :default-sort="{ prop: 'bookNumber', order: 'ascending' }"
          stripe
      >
        <el-table-column
            prop="bookNumber"
            label="图书编号"
            sortable
        ></el-table-column>
        <el-table-column prop="bookName" label="图书名称"></el-table-column>
        <el-table-column prop="bookAuthor" label="作者"></el-table-column>
        <el-table-column prop="bookType" label="分类"></el-table-column>
        <el-table-column prop="bookDescription" label="描述" width="400px">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleMove(scope.row)">移除</el-button>
          </template>
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
      tableData: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 5,
        userId: 1,
      },
      total: 0,

      title: "图书查询表格",
      json_fields: {
        图书编号: "bookNumber",
        图书名称: "bookName",
        作者: "bookAuthor",
        分类: "bookType",
        描述: "bookDescription",
      },
      loading: true,
      CollectionInfo: {
        bookNumber:1,
        bookName: "",
        userId: 1,
      },
    };
  },
  created() {
    this.searchCollectionByPage();
  },
  methods: {
    handleSizeChange(val) {
      this.queryInfo.pageSize = val;

      this.searchCollectionByPage();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;

      this.searchCollectionByPage();
    },
    async searchCollectionByPage() {
      this.activePath = window.sessionStorage.getItem("activePath");
      // console.log(this.activePath)
      // 先获取sessionStorage中的id`
      const stringId = window.sessionStorage.getItem("userId");
      const id = parseInt(stringId);
      this.queryInfo.userId = id;
      this.loading = true;
      const { data: res } = await this.$http.post(
          "user/search_collection_page",
          this.queryInfo
      );
      this.tableData = [];
      if (res.status !== 200) {
        this.total = 0;
        this.loading = false;
        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.loading = false;
      this.tableData = res.data.records;
      this.total = parseInt(res.data.total);
    },
    handleMove(row) {
      const {bookName,bookNumber} = row;
      this.activePath = window.sessionStorage.getItem("activePath");
      // console.log(this.activePath)
      // 先获取sessionStorage中的id`
      const stringId = window.sessionStorage.getItem("userId");
      const id = parseInt(stringId);

      this.CollectionInfo.bookName = bookName;
      this.CollectionInfo.bookNumber = bookNumber;
      this.CollectionInfo.userId = id;
      this.handleCollectionMove();
    },
    async handleCollectionMove() {
      this.loading = true;
      const { data: res } = await this.$http.post(
          "user/collection_delete",
          this.CollectionInfo
      );
      if (res.status !== 200) {
        this.loading = false;
        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.loading = false;

      this.searchCollectionByPage();
    },
    downLoad() {
      this.getPdf(this.title); //参数是下载的pdf文件名
    },
    fullScreen() {
      // Dom对象的一个属性: 可以用来判断当前是否为全屏模式(trueORfalse)
      let full = document.fullscreenElement;
      // 切换为全屏模式
      if (!full) {
        // 文档根节点的方法requestFullscreen实现全屏模式
        document.documentElement.requestFullscreen();
      } else {
        // 退出全屏模式
        document.exitFullscreen();
      }
    },
  },
};
</script>

<style lang="css"></style>