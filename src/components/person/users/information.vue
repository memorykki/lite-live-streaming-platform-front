<template>
  <div class="info">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <span>基本信息</span>
      <!-- 头像 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>头像</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-avatar
              :src="avatarUrl"
              class="userHead"
              style="vertical-align: middle"
            ></el-avatar>
          </div>
        </el-col>
        <!-- 修改头像 -->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-popover
              placement="right"
              width="200"
              trigger="click">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button slot="reference"><i class="el-icon-edit"></i></el-button>
            </el-popover>
          </div>
        </el-col>
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
            <p>{{nickname}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button @click="open"><i class="el-icon-edit"></i></el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 性别 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>性别</p>
          </div>
        </el-col>
        <el-col :span="8">
          <p>{{sex}}</p>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-popover
              placement="right"
              width="250"
              trigger="click">
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
                <el-button @click="sex">确定</el-button>
              <el-button slot="reference"><i class="el-icon-edit"></i></el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <!-- 出生日期 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>出生日期</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{birthday}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-popover
              placement="right"
              width="300"
              trigger="click">
                <el-date-picker
                      v-model="value2"
                      align="right"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button @click="birthday">确定</el-button>
              <el-button slot="reference"><i class="el-icon-edit"></i></el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <!-- 个性签名 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p>个性签名</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <p>{{text}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-popover
              placement="right"
              width="200"
              trigger="click">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
                <el-button @click="sex">确定</el-button>
              <el-button slot="reference"><i class="el-icon-edit"></i></el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
//  import { mapGetters, mapMutations, mapActions } from "vuex";
  export default {
    name: "info",
    components: {},
    data() {
      return {
          avatarUrl:'person/src/assets/logo.png',
          nickname:'直播',
          sex:'男',
          birthday:'2021/9/4',
          text:'你好，我是....',
        radio: '1',
        imageUrl: '',
        visible: false,
        dialogVisible: false,
        isAnchor:false,
         pickerOptions: {
                  disabledDate(time) {
                    return time.getTime() > Date.now();
                  },
                  shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                      picker.$emit('pick', new Date());
                    }
                  }, {
                    text: '昨天',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24);
                      picker.$emit('pick', date);
                    }
                  }, {
                    text: '一周前',
                    onClick(picker) {
                      const date = new Date();
                      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', date);
                    }
                  }]
                },
                value1: '',
                value2: '',
              };
    },
     methods: {
       // 上传头像
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
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
                  }).then(({ value }) => {
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
                }
        },
        // 修改性别
        sex(){

        },
        // 修改出生日期
        birthday(){
        },
        onSubmit() {
                console.log('submit!');
              }
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
