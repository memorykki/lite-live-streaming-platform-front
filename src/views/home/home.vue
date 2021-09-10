<template>
  <el-container>
    <el-header height="80px">Header</el-header>
    <el-container>
      <!-- main中是直播视频 -->
      <el-main>
        <!-- liveHeader存放头部信息 -->
        <div id="liveHeader">
          <el-tag type="info">房间号：{{ roomdata.roomId }}</el-tag>
          <el-tag type="info">公告：{{ roomdata.roomAnnouncement }}</el-tag>
        </div>
        <div id="liveVideo">
          <player ref="myplayer" :roompath="realroompath"></player>
        </div>
      </el-main>
      <el-aside width="30%"> Aside </el-aside>
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
      <dynamic></dynamic>
      <!-- <p v-for="(item,i) in roomgift" in listObj"></p> -->
    </el-footer>
  </el-container>
</template>

<script>
//引入子组件
import Player from "@/views/player";
import Dynamic from "@/views/dynamic";
import Vue from "vue";
import { getAction } from "@/api/api";
export default {
  name: "Home",
  //注入子组件
  components: {
    Player,
    Dynamic,
  },
  data() {
    return {
      //user存储登录得到的用户信息
      user: [],
      roomdata: [],
      roomgift: [],
      realroompath: "Music_Fiction_1.flv",

      roomId: 3,
      inuserId: "",
      inanchorId: 6,
      biaoti: "测试标题记得赋值",
    };
  },
  methods: {
    findRoom() {
      getAction("lite-live-streaming-platform/room/getRoomInfo",
          {
            params: {
              //查询时暂时使用，后面要换为realroompath
              roomId: this.roomId,
              userId: this.userId,
              anchorId: this.anchorId,
            },
          }).then((res) => {
          //  将得到的数据赋值
          this.roomdata = res.data.data.room;
          console.log("直播间信息");
          console.log(res);
        });
    },
    findGifit() {
      getAction(
          "lite-live-streaming-platform/gift/"
        )
        .then((res) => {
          //  将得到的数据赋值
          this.roomgift = res.data.data.records;
          let giftlength=this.roomgift.length
           console.log("直播间礼物");
           console.log(giftlength)
          console.log(res);
        });
    },
  },
  mounted() {
    const rid = this.$route.query.roomId;
    const child = this.$refs.myplayer;
    child.roompath = rid;
    // child.videoObject.video = 'rtmp://ts.memorykk.cn:1935/live/'+child.roompath
    child.videoObject.video =
      "rtmp://ts.memorykk.cn:1935/vod/" + this.realroompath;
    new ckplayer(child.videoObject);

    console.log(child.videoObject.video);

    console.log("输出用户信息——————————————————————————————————————");
    //获取登陆的用户信息
    console.log(Vue.ls.get("userInfo"));
    // 将用户信息赋给user
    this.user = Vue.ls.get("userInfo").user;
    // 将登录得到的用户的id属性赋给传入的用户id
    this.inuserId = this.user.userId;
    console.log(this.user.userId);

    this.findRoom();
    this.findGifit();



    console.log("输出路由信息——————————————————————————————————————");
         console.log(this.$route.query.test)
  },
  computed: {},
};
</script>

<style scoped="scoped">
.el-header {
  display: flex;
  position: relative;
  background: #1c2c3c;
  padding-top: 5px;
}

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
  margin: 0px;
  padding: 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.el-tag {
  text-align: left;
}
#giftdiv {
  height: auto;
  width: auto;
  /* 设置边框阴影 */
  margin: 10px;
  box-shadow: 10px 10px 5px #b1b1b1;
  /* 浮动布局记得清除 */
  float: left;
}
/* #img1{border-radius: 50%; } */
#giftphoto {
  height: 50px;
}
</style>


