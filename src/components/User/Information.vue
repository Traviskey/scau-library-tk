<template>
  <div class="information_container">
    <div class="backgroundImg">
      <img
        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.H8xktmxJhcH4oHOT12vkwwHaEK?w=308&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
        alt="背景图片"
      />
    </div>
    <div class="information_header">
      <p>个人信息</p>
      <p>
        <i class="el-icon-s-flag"></i> “我读过很多书，但后来大部分都被我忘记了，那阅读的意义是什么？”

        答：“当我还是个孩子的时候，我吃过很多食物，现在已经记不起来吃过什么了。但可以肯定的是，它们中的一部分已经长成为我的骨头和肉。
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
            <i class="el-icon-collection-tag"></i> 用户账号:
            {{ this.user.userId }}
          </div>
          <div class="name">
            <i class="iconfont icon-gerenxinxi"></i> 用户名称:
            {{ this.user.username}}
          </div>
          <div class="rule">
            <i class="iconfont icon-guizeshezhi"></i> 收货人姓名:
            {{ this.user.cardName }}
          </div>
          <div class="status">
            <i class="el-icon-refresh"></i> 收货地址:
            {{ this.user.address }}
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
          <el-form-item label="新密码" prop="password">
            <el-input v-model="editForm.password" type="password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="新名称" prop="username">
            <el-input v-model="editForm.username"  placeholder="请输入新名称"></el-input>
          </el-form-item>
          <el-form-item label="新收货人" prop="cardName">
            <el-input v-model="editForm.cardName"  placeholder="请输入新收货人"></el-input>
          </el-form-item>
          <el-form-item label="新地址" prop="address">
            <el-input v-model="editForm.address"  placeholder="请输入新收货地址"></el-input>
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
        userId: Number,
        cardName: "",
        username: "",
        password: "",
        address:"",
      },
      editForm: {
        password: "",
        username: "",
        cardName: "",
        address: "",
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
      // 先从sessionStorage中获取用户id
      const userId = window.sessionStorage.getItem("userId");
      // 发送axios请求，携带用户id，获取个人信息
      this.loading = true;
      const { data: res } = await this.$http.get(
        "user/get_information/" + userId
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
      
      const {data:res} = await this.$http.post('user/update_info',{
        password:this.editForm.password,
        username:this.editForm.username,
        cardName:this.editForm.cardName,
        address:this.editForm.address,
        userId:window.sessionStorage.getItem('userId')
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