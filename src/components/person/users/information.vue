<template>
  <div class="info">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition" style="height: 500px;">
        <el-tab-pane label="我的信息">
          <!-- 头像 -->
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <p>头像</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                <el-avatar :src="user.userHeadPhoto" class="userHead" style="vertical-align: middle"></el-avatar>
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
                <p>{{user.userName}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button @click="open"><i class="el-icon-edit"></i></el-button>
              </div>
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
              <p>{{user.userEmail}}</p>
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
                <p>{{user.userPhone}}</p>
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
                <p>{{user.userPasswd}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button @click="passwd"><i class="el-icon-edit"></i></el-button>
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
                <p>{{user.userFansCount}}</p>
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
                          :src="user.roleId"
                          ></el-image>
                  </el-col>
                  <el-col :span="6">
                    <p>{{user.roleId}}</p>
                  </el-col>
                </el-row>
              </div>
              </el-col>
              </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "info",
    components: {

    },
    data() {
      return {
        tabPosition: 'left',
        user:{
          userId:'',
          userName:'小草',
          userEmail:'',
          userPhone:'15809172183',
          userPasswd:'',
          userHeadPhoto:'',
          userFansCount:'',
          roleId:'',
          userExistCoins:'',

        },

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
      open() {
        this.$prompt('请输入昵称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]/,
          inputErrorMessage: '昵称不能包含中文、英文、数字以外的字符'
        }).then(({
          value
        }) => {
          //修改后台数据
          let user={

          };
          this.$message({
            type: 'success',
            message: '你的昵称是: ' + value,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      //修改密码
      passwd() {
        this.$prompt('请输入密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          inputErrorMessage: '密码至少8个字符，至少包括1个小写字母和1个数字'
        }).then(({
          value
        }) => {
          //修改后台数据
          let user={

          };
          this.$message({
            type: 'success',
            message: '修改成功',
            //user.user_passwd=value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    },
  }
</script>

<style>
  .el-card span {
    font-weight: bold;
    font-size: 18px;
    font-style: ;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
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
