<template>
  <div class="information_container">
    <div class="backgroundImg">
      <img
          src="https://th.bing.com/th/id/OIP.xil-WugTskuFPBmusoLaTwHaEo?w=290&h=181&c=7&r=0&o=5&dpr=2&pid=1.7"
          alt="背景图片"
      />
    </div>
    <div class="information_header">
      <p>个人信息</p>
      <p>
        <i class="el-icon-s-flag"></i> “只有那些始终不忘记自己也曾是一个孩子的人，才能成为一个真正的大人”
      </p>
    </div>
    <div class="information_banner"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="information_banner_left" >
        <div class="banner_left_main" v-if="show">
          <div class="number">
            <i class="el-icon-collection-tag"></i> 客服电话:
            {{ this.user.tele }}
          </div>
          <div class="name">
            <i class="iconfont icon-gerenxinxi"></i> 邮编:
            {{ this.user.postcode}}
          </div>
        </div>
      </div>
      <div class="information_banner_right">
        <el-button type="primary" class="changePWD" @click="showEditDialog"  v-if="show"
        >修改信息</el-button
        >
      </div>
      <el-dialog
          title="修改信息(若部分信息不变，请填写原信息)"
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
          <el-form-item label="新客服电话" prop="tele">
            <el-input v-model="editForm.tele"  placeholder="请输入客服电话"></el-input>
          </el-form-item>
          <el-form-item label="新邮编" prop="postcode">
            <el-input v-model="editForm.postcode"  placeholder="请输入邮编"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changeInfo"
          >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.editForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: {
        tele:"",
        postcode:""
      },
      editForm: {
        tele:"",
        postcode:""
      },
      editFormRules:{
        password:[
          {required:true,message:"请输入新密码",trigger:"blur"},
          {min:6,max:15,message:"新密码长度在6-15个字符",trigger:"blur"}
        ],
        username:[
          {required:true,message:"请输入新用户名",trigger:"blur"},
          {min:1,max:9,message:"新用户名长度在3-9个字符",trigger:"blur"}
        ],
        cardName:[
          {required:true,message:"请输入新收货人名",trigger:"blur"},
          {min:1,max:9,message:"新收货人名长度在3-9个字符",trigger:"blur"}
        ],
        address:[
          {required:true,message:"请输入新收货地址",trigger:"blur"},
          {min:1,max:20,message:"新收货地址长度在3-20个字符",trigger:"blur"}
        ],


      },
      editDialogVisible: false,
      show:false,
      loading:true
    };
  },
  methods: {
    //让修改公告的对话框可见,并从数据库中回显数据
    showEditDialog() {
      // 让修改公告的对话框可见
      this.editDialogVisible = true;
    },
    //监听修改对话框的关闭，一旦对话框关闭，就重置表单，回显数据
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    async getUserInformaton() {
      this.loading = true;
      const { data: res } = await this.$http.get(
          "admin/getsystem"
      );
      if (res.status !== 200) {

        return this.$message.error(res.msg);
      }
      this.$message.success({
        message: res.msg,
        duration: 1000,
      });
      this.user = res.data;
      this.show = true;
      this.loading = false;

    },
    async changeInfo(){

      const {data:res} = await this.$http.post('admin/update_info',{
        tele:this.editForm.tele,
        postcode:this.editForm.postcode,
      })
      if(res.status !== 200){
        return this.$message.error(res.msg);
      }
      this.$message.success(res.msg)
      this.editDialogVisible = false;
      this.$refs.editFormRef.resetFields();
      window.sessionStorage.clear();
      this.getUserInformaton()
    }
  },
  created() {
    this.getUserInformaton();
  },
};
</script>

<style lang="less" scoped>
.information_container {
  position: relative;
  height: 100%;
}
.backgroundImg {
  position: absolute;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    opacity: 0.3;
  }
}
.information_header {
  height: 200px;
  // background-color: pink;
  text-align: center;
  p:nth-child(1) {
    line-height: 140px;
    color: black;
    font-size: 36px;
  }
  p:nth-child(2) {
    color: black;
    font-size: 24px;
  }
}
.information_banner {
  display: flex;
  flex-direction: row;
  height: 400px;
  // background-color: pink;
  .information_banner_left {
    flex: 0.5;
    // background-color: brown;
    text-align: center;
  }
  .information_banner_right {
    flex: 0.5;
    // background-color: skyblue;
    text-align: left;
    line-height: 400px;
  }
}
.banner_left_main {
  margin-top: 120px;
  color: black;
  font-size: 20px;
  div {
    margin-top: 15px;
  }
}
.changePWD {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>