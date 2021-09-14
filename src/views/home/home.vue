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
          <div id="liveheadertop">
            <el-tag type="info" id="gonggao">公告：{{ roomdata.roomAnnouncement }}</el-tag>
          </div>
          <div id="liveheaderbottom">
            <el-row :gutter="20">
              <el-col :span="5"
                ><div id="lefttag">
                  <el-tag type="info">房间号：{{ roomId }}</el-tag>
                  <!-- <el-tag type="info">热度：{{ roomhot }}</el-tag> -->
                </div></el-col
              >

              <el-col :span="5"
                ><div id="lefttag">
                  <el-tag type="info">热度：{{ roomhot }}</el-tag>
                </div></el-col
              >

              <el-col :span="5"
                >
                 
                    <el-button class="livebutton" type="info" plain @click="userlike">{{
                      userAttention
                    }}</el-button>
                
                 
                </el-col
              >
              <el-col :span="5"
                >
                 
                  
                    <el-button class="livebutton" type="info" plain @click="openreport"
                      >举报</el-button
                    >
                
                </el-col
              >
            </el-row>
          </div>
        </div>
        <div id="liveVideo">
          <player ref="myplayer"></player>
        </div>
      </el-main>
      <el-aside width="30%">
        <!-- 礼物排行榜 ======================-->
        <!-- 虽然v-if报错但是能用！！！！！！！！！！！！！！！！！！！！！！！！！！！！！ -->
        <!-- 控制显示的数据条数 -->
        <div class="top-10">
          <tr v-for="(item, index) in userRank"  v-if="index<10" :key="index" >
            <td>
              <div id="lidiv">
                <p class="lipnum">{{index+1}}</p>
                <div style="display: flex">
             
              <img class="liimage" :src="item.userHeadPhoto" alt="userhead" />
               <p class="lip">{{item.userName}}</p>
              </div>
               <p class="lip">{{item.roleName}}</p>
              <img class="lvimage" :src="item.roleIdentification" alt="rolehead" />
              <p class="lip">{{item.sendGiftValue}}</p>
              </div>
            </td>
           
          </tr>
        </div>
      </el-aside>
    </el-container>

    <el-footer height="60px">
      <!-- test -->
      <div id="giftdiv">
        <tr>
          
          <td v-for="(item, index) in roomgift" :key="index">
            <div class="gifttr">
            <img id="giftphoto" :src="item.giftPhoto" alt="gift" @click="sendgift(item)"/>
            <p>{{item.giftName}}:{{ item.giftValue }}</p>
            <p>{{ item.giftValue }}</p>
            </div>
          </td>
        
        </tr>
      </div>
      <dynamic :liveid="this.inanchorId"></dynamic>
      <!-- <dynamic ></dynamic> -->
      <!-- <p v-for="(item,i) in roomgift" in listObj"></p> -->
    </el-footer>

    <!-- 添加对话框 -->
    <el-dialog title="添加举报信息" :visible.sync="reportDialog">
      <el-form :model="reportdata">
        <el-input
          v-model="reportdata.subType"
          placeholder="请输入举报原因"
        ></el-input>
      </el-form>
      <postimage ref="postimage" />

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
import { deleteByBodyAction, getAction, postAction } from "@/api/api";
import Navbar from "@/layout/components/Navbar";
import Postimage from "../postimage/postimage.vue";

export default {
  name: "Home",
  //注入子组件
  components: {
    Player,
    Dynamic,
    Navbar,

    Postimage,
  },
  data() {
    return {
      // imageurl:"请获取封面路径",
      //user存储登录得到的用户信息
      user: [],
      //roomdata储存获取到的房间信息
      roomdata: [],
      //礼物信息
      roomgift: [],
      // realroompath: "1.flv",
      //房间号
      roomId: "error",
      // 用户id
      inuserId: "",
      // 主播id
      inanchorId: "error",
      // 是否关注主播
      userAttention: "",
      // 直播间热度
      roomhot: "",
      // 直播间标题
      // roomtitle:""
      //控制举报记录对话框
      reportDialog: false,
      // 直播间礼物排行榜
      userRank:[],
      //存储举报记录
      reportdata: {
        userId: "",
        evidence: "",
        status: 1,
        type: 1,
        subType: "",
      },
    };
  },
  methods: {
    // 用户关注或取消关注主播
    userlike() {
      if (this.userAttention == "关注") {
        //用户想要关注主播，将按钮置为取消关注，并添加数据到数据库
        this.userputfocus();
      } else {
        //用户想要取消关注，将按钮置为关注，并删除用户数据

        this.userdelefocus();
      }
    },
    // 取消关注删除数据库数据
    userdelefocus() {
      deleteByBodyAction("/lite-live-streaming-platform/userFocus", {
        focusUserId: this.inuserId,
        focusedUserId: this.inanchorId,
      }).then((res) => {
        console.log("取消关注返回信息==========");
        console.log(res);
        //将当前状态置为关注
        this.userAttention = "关注";
      });
    },
    // 关注添加数据
    userputfocus() {
      postAction("/lite-live-streaming-platform/userFocus", {
        focusUserId: this.inuserId,
        focusedUserId: this.inanchorId,
      }).then((res) => {
        console.log("添加关注返回信息==========");
        console.log(res);
        //将当前状态置为取消关注
        this.userAttention = "取消关注";
      });
    },
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
        this.roomhot = res.data.data.hot;
        // 是否关注主播
        //判断focus值
        if (res.data.data.focus) {
          this.userAttention = "取消关注";
        } else {
          this.userAttention = "关注";
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
      this.reportDialog = true;
    },
    //添加举报记录
    addreport() {
      this.reportdata.evidence = this.$refs.postimage.imageurl;
      this.reportdata.userId = this.inanchorId;

      postAction(
        "/lite-live-streaming-platform/banRecord/",

        this.reportdata
      ).then((res) => {
        this.reportDialog = false;
        console.log("添加举报返回信息==========");
        console.log(res);
      });
    },
    sendgift(item){

postAction(
        "/lite-live-streaming-platform/giftRecord?reason="+"在"+this.roomId+"号房间送出了"+item.giftName,

        {
          roomId:this.roomId,
          userId:this.user.userId,
          giftId:item.giftId,
          
        }
      ).then((res) => {
        
        console.log("送礼物返回信息==========");
        console.log(res);
          this.$message({
            message: "送出了一个"+item.giftName,
            type: "success",
          });
          this.findRank();
      });
    },
    // 查询排行榜信息
    findRank() {
      getAction("/lite-live-streaming-platform/room/rank",{
        roomId:this.roomId
      }).then((res) => {
        //  将得到的数据赋值
        this.userRank = res.data.data;

        console.log("直播间礼物排行榜=============");

        console.log(res);
        console.log( this.userRank);
      });
    },
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
 
let routedata = JSON.parse(this.$route.query.data)
console.log("输出路由json转译信息——————————————————————————————————————");
 console.log(routedata);
    this.roomId = routedata.roomId;
    this.inanchorId = routedata.userId;
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
    this.findRank();
  },
  // computed: {},
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
  flex-direction: column;
}
#liveheadertop{
  height: 35px;
}
#liveheaderbottom{
  height: 35px;
  margin-bottom: 10px;
}
#gonggao{
  width: 100%;
}
.livebutton{
  margin-top: 5px;
  width: 142px;
}
#lefttag {
  margin: 5px;
  display: flex;
  flex-direction: column;
}

.el-button {
  height: 32px;
  /* width: 92px; */
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
  height: 40px;
}
/* 控制礼物和价值显示样式 */
.gifttr{
  /* 控制礼物间距 */
  margin-left: 40px;
  text-align: center;
  font-size: 12px;
  background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
    -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
    -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
    -webkit-background-size: 200% 100%; 
    -webkit-animation: masked-animation 4s linear infinite;

}
.el-row {
  width: 100%;
}

/*礼物榜单*/
.top-10 {
  float: left;
  width: 400px;
  height: 91%;
  margin-top: 76px;
  margin-left: 118px;
  background: #fff;
  border: 1px solid #fff;
  box-shadow: #d0d0d0 1px 1px 10px 0px;
}


#lidiv{
  display: flex;
 background-color: #737268e0;
  margin: 0px;
}
.liimage{
width: 30px;
  height: 36px;
  margin-top: 6px
}
.lipnum{
  background-color: #fffb93e0;
  padding: 5px 10px 5px 10px;
  margin: 0px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 5px;
  text-align: center;
 
}
.lip{
  margin-left: 10px;
  width: 80px;
  height: 10px;
   /* margin: 0px; */
}
.lvimage{
  height: 36px;
  width: 40px;
  margin-top: 6px;
  margin-left: 10px;
  margin-bottom: 6px;
  
}
</style>
