

<template>
  <el-card class="box-card">
    <div slot="header" shadow="always">
      <!-- 卡片头部，写入面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: 'dashboard' }"
          >首页</el-breadcrumb-item
        >

        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>直播信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="inputlivemsg">
      <el-form :model="Room" label-width="100px">
        <el-form-item label="标题">
          <el-input
            v-model="Room.roomTitle"
            placeholder="请输入标题"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-input
            v-model="Room.roomPhoto"
            placeholder="直播间封面"
            :disabled="true"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="直播类型">
          <el-select v-model="Room.roomType" placeholder="请选择直播类别">
            <el-option label="游戏" value="1"></el-option>
            <el-option label="娱乐" value="2"></el-option>
            <el-option label="音乐" value="3"></el-option>
            <el-option label="放映" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="直播公告" clearable>
          <el-input type="textarea" v-model="Room.roomAnnouncement"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="putroommsg">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="duiqi">
    <!-- 上传图片子组件，获取子组件数据 -->
   <postimage ref="postimage"></postimage>
   <button type="info" @click="getchilddata" >获取封面路径</button>
   </div>
  </el-card>
</template>

<script>
import Vue from "vue";
import { getAction, putAction } from "@/api/api";
import postimage from "@/views/postimage/postimage"
export default {
  components: {
    postimage
  },
  data() {
    return {
      Room: {
        roomId: "",
        roomTitle: "",
        userId: "",
        roomAnnouncement: "",
        roomPhoto: "",
        roomType: "",
        roomStatus: "1",
      },
      dialogVisible: false,
      userInfo: [],
      anchor: false,
    };
  },
  methods: {
    getchilddata(){
     this.Room.roomPhoto=this.$refs.postimage.imageurl
     console.log(this.$refs.postimage.imageurl)
     console.log(this.roomPhoto)
    },
    putroommsg() {
      putAction("lite-live-streaming-platform/room/", this.Room).
      then((res) => {
        console.log(res);
        if(res.data.code){
          this.$message.error("出错了");
          
        }else{
           
           this.$message({
                type: "success",
                message: "修改成功!",
              });
        }


      });
    },
  },
  mounted() {
    //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo = Vue.ls.get("userInfo").user;

    this.Room.userId = this.userInfo.userId;
     this.Room.roomId = this.userInfo.roomId;
    console.log(Vue.ls.get("userInfo").user);
  },
};
</script>

<style>
#duiqi{
  text-align: center;
}
</style>
