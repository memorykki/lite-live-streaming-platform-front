<template>
  <el-container>
    <div>
      <navbar />
    </div>

    <el-container>
      <!-- main中是直播视频 -->
      <el-main>
        <!-- liveHeader存放头部信息 -->
        <div id="liveHeader">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div id="lefttag">
                <el-tag type="info">房间号：{{ roomId }}</el-tag>
                <el-tag type="info"
                  >热度：{{ roomhot }}</el-tag
                >
              </div></el-col
            >

              <el-col :span="4"
              ><div id="lefttag">
                
                <el-tag type="info"
                  >公告：{{ roomdata.roomAnnouncement }}</el-tag
                >
              </div></el-col
            >


            <el-col :span="4"
              ><div id="rightbutton">
                <div id="subroom">
                  <el-button type="info" plain @click="userlike">{{userAttention}}</el-button>
                </div>
                <div id="report">
                  <el-button type="info" plain @click="openreport">举报</el-button>
                </div>
              </div></el-col
            >
          </el-row>
        </div>
        <div id="liveVideo">
          <player ref="myplayer" :roompath="realroompath"></player>
        </div>
      </el-main>
      <el-aside width="30%">
        <div id="giftrand">礼物排行榜</div>
      </el-aside>
    </el-container>

    <el-footer height="60px">
      <!-- test -->
      <div id="giftdiv">
        <tr>
          <td v-for="(item, index) in roomgift" :key="item">
            <img id="giftphoto" :src="item.giftPhoto" alt="gift" />
            <p>{{ index + 1 }}</p>
            <!-- <p>{{item.giftPhoto}}</p> -->
          </td>
        </tr>
      </div>
      <dynamic :liveid=this.inanchorId></dynamic>
      <!-- <p v-for="(item,i) in roomgift" in listObj"></p> -->
    </el-footer>


    <!-- 添加对话框 -->
    <el-dialog title="添加举报信息" :visible.sync="reportDialog">
      <el-form :model="reportdata">
        <el-input
          v-model="reportdata.subType"
          placeholder="请输入举报原因"
        ></el-input>
       
        
      
      <el-input
          v-model="reportdata.evidence"
        :disabled="true"
        
        ></el-input>
        </el-form>
      <postimage ref="postimage"/>
      <button type="info" @click="getimageurl" >获取封面路径</button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reportDialog = false">取 消</el-button>
        <el-button type="primary" @click="addreport">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
//引入子组件
import Player from "@/views/player";
import Dynamic from "@/views/dynamic";
import Vue from "vue";
import {putAction,deleteAction, getAction } from "@/api/api";
import Navbar from "@/layout/components/Navbar";

import Postimage from '../postimage/postimage.vue';
export default {
  name: "Home",
  //注入子组件
  components: {
    Player,
    Dynamic,
    Navbar,
  
    Postimage
  },
  data() {
    return {
      imageurl:"请获取封面路径",
      //user存储登录得到的用户信息
      user: [],
      //roomdata储存获取到的房间信息
      roomdata: [],
      //礼物信息
      roomgift: [],
      realroompath: "1.flv",
      //房间号
      roomId: "error",
      // 用户id
      inuserId: "",
      // 主播id
      inanchorId: "error",
      // 是否关注主播
      userAttention: "",
      // 直播间热度
      roomhot:"",
      // 直播间标题
      // roomtitle:""
      //控制举报记录对话框
      reportDialog: false,
      //存储举报记录
      reportdata: {
        userId: '',
        evidence:'',
        status:1,
        type:1,
        subType:'',
        // createTime:''
      }
        
      
    };
  },
  methods: {
    // 用户关注或取消关注主播
    userlike(){
      if(this.userAttention="关注")
      {//用户想要关注主播，将按钮置为取消关注，并添加数据到数据库
           this.userputfocus(); 
      }else{
       //用户想要取消关注，将按钮置为关注，并删除用户数据
       this.userdelefocus();
      }

    },
    // 取消关注删除数据库数据
  userdelefocus(){
   this.$http
            .delete(
              "/lite-live-streaming-platform/userFocus",{
      
        data:{
          focusUserId: this.inuserId,
        focusedUserId: this.inanchorId,
       
        }
      }).then((res) => {
          console.log("取消关注返回信息==========")
        console.log(res)
        //将当前状态置为关注
        this.userAttention="关注"
      });

  },
  // 关注添加数据
  userputfocus(){
    this.$http
            .post(
              "/lite-live-streaming-platform/userFocus",{
      
        data:{
          focusUserId: this.inuserId,
        focusedUserId: this.inanchorId,
       
        }
      }).then((res) => {
          console.log("添加关注返回信息==========")
        console.log(res)
        //将当前状态置为取消关注
        this.userAttention="取消关注"
      });


  }
,



    findRoom() {
      getAction("/lite-live-streaming-platform/room/getRoomInfo", {
        //查询时暂时使用，后面要换为realroompath
        roomId: this.roomId,
        userId: this.inuserId,
        anchorId: this.inanchorId,
      }).then((res) => {
         console.log("直播间返回信息==================");
        console.log(res);
        //  将得到的数据赋值
        this.roomdata = res.data.data.room;
        //直播间热度
        this.roomhot=res.data.data.hot;
        // 是否关注主播
       //判断focus值
       if(res.data.data.focus){
         this.userAttention="取消关注"
       }else{
         this.userAttention="关注"
       }
      });
    },
    findGifit() {
      getAction("/lite-live-streaming-platform/gift/").then((res) => {
        //  将得到的数据赋值
        this.roomgift = res.data.data.records;

        console.log("直播间礼物");
        
        console.log(res);
      });
    },
    //弹出添加举报记录对话框
    openreport() {
    this.reportDialog=true;
    },
    //添加举报记录
    addreport() {
       
      
      this.reportdata.userId=this.inanchorId


       this.$http
            .post(
              "/lite-live-streaming-platform/banRecord/",{
      
        data:
          this.reportdata
       
        
      }).then((res) => {
          console.log("添加举报返回信息==========")
     
      });
    
    },
    getimageurl(){
      this.reportdata.evidence=this.$refs.postimage.imageurl
    }
  },
  mounted() {
    const rid = this.$route.query.data.roomId;
    const child = this.$refs.myplayer;
    child.roompath = rid;
    //直播间或者视频的播放路径，从路由传参获得
    child.videoObject.video =
      "rtmp://ts.memorykk.cn:1935/live/" + child.roompath;
    // child.videoObject.video =
    //   "rtmp://ts.memorykk.cn:1935/vod/" + this.realroompath;
    new ckplayer(child.videoObject);

    console.log(child.videoObject.video);
    // 获取路由信息并赋给roomId
    console.log("输出路由信息——————————————————————————————————————");
    console.log(this.$route.query.data);

    this.roomId = this.$route.query.data.roomId;
    this.inanchorId = this.$route.query.data.userId;
    // this.roomtitle= this.$route.query.data.roomTitle;
    
    //获取登陆的用户信息
    // 将用户信息赋给user
    this.user = Vue.ls.get("userInfo").user;
    // 将登录得到的用户的id属性赋给传入的用户id
    this.inuserId = this.user.userId;
     console.log("用户信息=========================");
    console.log(this.user.userId);

    this.findRoom();
    this.findGifit();
  },
  computed: {},
};
</script>

<style scoped="scoped">
.el-main {
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;

  text-align: center;
}
.el-aside {
  background-color: aquamarine;
}
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el_footer {
  height: 20px;
  margin: 0px;
  padding: 0px;
}
#liveVideo {
  text-align: center;
  padding: 0px;
  margin: 0px;

  height: 100%;
  width: 100%;
}
#liveHeader {
  height: 80px;
  width: 100%;
  margin: 0px;
  padding: 0px;
  text-align: center;
  display: flex;
  /* flex-direction: column; */
}
#lefttag {
  margin: 5px;
  display: flex;
  flex-direction: column;
}
#rightbutton {
 margin-top: 5px;
  text-align: left;
  display: flex;
  flex-direction: column;
  /* margin: 0px; */
}
.el-button{
  height: 32px;
  width: 92px;
}
.el-tag {
  text-align: left;
}
#giftdiv {
  height: auto;
  width: 100%;
  /* 设置边框阴影 */
  margin: 10px;
  box-shadow: 10px 10px 5px #b1b1b1;
  /* 浮动布局记得清除 */
  /* float: left; */
}
/* #img1{border-radius: 50%; } */
#giftphoto {
  height: 50px;
}
.el-row{
  width: 100%;
}
</style>


