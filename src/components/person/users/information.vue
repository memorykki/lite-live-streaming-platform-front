<template>
  <div class="info">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition" style="height: 700px;">
        <el-tab-pane label="我的信息">
          <!-- <div class="grid-content bg-purple">
                <el-button @click="openEditDialog"><i class="el-icon-edit">修改个人信息</i></el-button>
              </div> -->
          <!-- 头像 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>头像</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-avatar :src="userInfo.userHeadPhoto" class="userHead" style="vertical-align: middle"></el-avatar>
              </div>
            </el-col>
            <!-- 修改头像 -->
            <!-- <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-popover placement="right" width="200" trigger="click">
                  <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <el-button slot="reference"><i class="el-icon-edit"></i></el-button>
                </el-popover>
              </div>
            </el-col> -->
          </el-row>
          <!-- 昵称 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>昵称</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userName}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <el-button @click="openEditDialog"><i class="el-icon-edit"></i></el-button>
            </el-col>
          </el-row>
          <!-- 邮箱 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>邮箱</p>
              </div>
            </el-col>
            <el-col :span="8">
              <p>{{userInfo.userEmail}}</p>
            </el-col>

          </el-row>
          <!-- 手机号 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>手机号</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userPhone}}</p>
              </div>
            </el-col>
          </el-row>
          <!-- 密码 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>密码</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userPasswd}}</p>
              </div>
            </el-col>
          </el-row>
          <!-- 粉丝数 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>粉丝数</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userFansCount}}</p>
              </div>
              </el-col>
              </el-row>
              <!-- 活力币剩余数量 -->
              <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>活力币剩余数量</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userExistCoins}}</p>
              </div>
              </el-col>
              </el-row>
              <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>活力币总数</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <p>{{userInfo.userSumCoins}}</p>
              </div>
              </el-col>
              </el-row>
          <!-- 等级 -->
          <!-- role -->
          <!-- role -->
          <!-- role -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>角色</p>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple">
                <el-row>
                  <el-col :span="4">
                    <el-image
                          style="width: 53px; height: 54px"
                          :src="role.roleIdentification"
                          ></el-image>
                  </el-col>
                  <el-col :span="6">
                    <p>{{role.roleName}}</p>
                  </el-col>
                </el-row>
              </div>
              </el-col>
              </el-row>
    <el-dialog title="修改昵称" :visible.sync="dialogFormVisible">
      <el-form :v-model="information" :rules="rule">
        <el-form-item label="昵称" prop="userName">
          <el-input v-model="information.userName"/>
        </el-form-item>
        <!-- <el-form-item label="密码">
          <el-input show-password v-model="information.userPasswd"/>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue';
import { getAction, putAction } from '@/api/api';
import user from '@/store/modules/user';
  export default {
    name: "info",
    components: {

    },
    data() {
      return {
        tabPosition: 'left',
        dialogFormVisible:false,
        information:{
          userName:'',    
          // userPasswd:'',
          // userId:''
        },
        userInfo:[],
        role:[],
      };
    },
    methods: {
      // 上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        //头像地址存入后台
        user_head_photo=this.imageUrl;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 修改昵称
      update() {
      //记得更新地址********************************************************************
      putAction("lite-live-streaming-platform/user/", this.information)
        .then((res) => {
          console.log(this.information);
          location.reload();
          //关闭对话框
          this.dialogFormVisible = !this.dialogFormVisible;
          this.findPage();         
          this.$message({
            //提示添加成功消息
            message: "处理完成",
            type: "success",
          });
        })
        .catch((res) => {
          this.$message.error("出错了");
        });
    },
    // 弹出修改对话框
    openEditDialog(row) {
      // 将数据填充到表单
      //将所有数据赋给user对象，可能出问题，记得更改**************************************

      this.user = row;
      //让对话框显示
      this.dialogFormVisible = true;
    },
    select(){
      getAction()
      
    }
    },
    mounted() { //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo=Vue.ls.get("userInfo").user;
    this.role=Vue.ls.get("userInfo").role;
    this.information.userId=Vue.ls.get("userInfo").user.userId;
    console.log(this.userInfo);
    }
  }
</script>

<style>
  .el-card span {
    font-weight: bold;
    font-size: 18px;
    /* font-style: ; */
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    /* border-radius: 4px; */
  }

  .bg-purple-dark {
    background: #ffffff;
  }

  .bg-purple {
    background: #ffffff;
  }

  .bg-purple-light {
    background: #ffffff;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #ffffff;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
