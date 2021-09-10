<template>
  <div>
    <el-card>

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
      <!-- 详细列表，有边框，每行存储一个 -->
      <el-descriptions 
      title="直播信息" 
      border 
      :column="1">
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-house"></i>
            直播房间号
          </template>
         <span> {{ liveroom }} </span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-bangzhu"></i>
            推流信息
          </template>
        <!-- 传递链接 -->
        <!-- <a :href="livepull">{{livepull}} </a> -->
        <!-- 传递字符串 -->
        <span> {{ livepull }} </span>
        </el-descriptions-item>
      </el-descriptions>
        

    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //存放get到的数据

     liveroom:'',
     livepull:'',
     //user_id登陆时获取记得更改**************************************************************
     userId: '',
     //获取到的user登录信息
     getuser:[]


    };
  },
  methods: {
   // 获取分页查询
    findLiveMsg() {
      this.$http
<<<<<<< HEAD
        .get("http://101.200.54.21:9989/lite-live-streaming-platform/user/", {
=======
        .get("lite-live-streaming-platform//user/", {
>>>>>>> d4ccff7dd0df5be7b858693936f0c6bd7adba82a
          params: {
            
            //后端查询需要传递的参数，****************************************************记得更改
            userId: this.userId,
          },
        })
        .then((res) => {
         

         
           console.log(res);
            
         
        
          //获取后端分页统计数
          this.liveroom =res.data.data.records[0].roomId;
          //获取分页信息
          this.livepull = "http://ts.memorykk.cn:1936/lite-live-streaming-platform/room/selectOne？roomId="+this.liveroom;
        });
    },
  },

  mounted() {
    this.findLiveMsg();
    console.log("输出用户信息——————————————————————————————————————");
    //获取登陆的用户信息
    console.log(Vue.ls.get("userInfo"));
    this.getuser=Vue.ls.get("userInfo").user;
    this.userId=this.getuser.userId
    console.log(this.userId);
      },
};
</script>

<style scoped="scoped">
.el-card{

  margin-top: 40px;
}
</style>
