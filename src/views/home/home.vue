<template>
  <el-container>
    <el-header height="80px">Header</el-header>
    <el-container>
      <!-- main中是直播视频 -->
      <el-main>
        <!-- liveHeader存放头部信息 -->
        <div id="liveHeader">
          
        </div>
        <div id="liveVideo">
          <player ref="myplayer" :roompath="realroompath"></player>
        </div>
      </el-main>
      <el-aside width="30%"> Aside </el-aside>
    </el-container>
    
    <el-footer height="60px">
      <!-- <div id="giftdiv" > -->
      <dynamic></dynamic>
        <!-- <p v-for="(item,i) in roomgift" in listObj"></p> -->
    </el-footer>
  </el-container>
</template>

<script>
//引入子组件
import Player from "@/views/player";
import Dynamic from '@/views/dynamic'
import Vue from 'vue'
import { getAction } from '@/api/api';
export default {
  name: "Home",
  //注入子组件
  components: { 
    Player,
    Dynamic 
  },
  data() {
    return {
      roomdata: [],
      roomgift:[],
      realroompath: '',
      roomId: 3,
      userId: 6,
      anchorId: 6,
    };
  },
  methods: {
    findRoom() {
      getAction("http://101.200.54.21:9989/lite-live-streaming-platform/room/getRoomInfo",
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
          "http://101.200.54.21:9989/lite-live-streaming-platform/gift/"
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
    const rid = this.$route.query.roomId
    const child = this.$refs.myplayer;
    child.roompath = rid;
    child.videoObject.video = 'rtmp://ts.memorykk.cn:1935/live/'+child.roompath;
         new ckplayer(child.videoObject);
         console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
         console.log(child.videoObject.video)
    //   console.log(this.liveroom.aaa)
    console.log(Vue.ls.get("userInfo"));


    this.findRoom();
    this.findGifit();
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
  
}

</style>


