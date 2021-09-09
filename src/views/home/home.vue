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
          <player :roompath="realroompath"></player>
        </div>
      </el-main>
      <el-aside width="30%"> Aside </el-aside>
    </el-container>
    <el-footer height="60px">
      <div id="giftdiv" >
     
        <p v-for="(item,i) in roomgift" in listObj"></p>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
//引入子组件
import Player from "@/views/player";
export default {
  name: "Home",
  //注入子组件
  components: { Player },
  data() {
    return {
      roomdata: [],
      roomgift:[],
      realroompath: "Music_Fiction_1.flv",
      roomId: 3,
      userId: 6,
      anchorId: 6,
    };
  },
  methods: {
    findRoom() {
      this.$http
        .get(
          "http://172.29.3.78:8081/lite-live-streaming-platform/room/getRoomInfo",
          {
            params: {
              //查询时暂时使用，后面要换为realroompath
              roomId: this.roomId,
              userId: this.userId,
              anchorId: this.anchorId,
            },
          }
        )
        .then((res) => {
          //  将得到的数据赋值
          this.roomdata = res.data.data.room;
          console.log("直播间信息");
          console.log(res);
        });
    },
    findGifit() {
      this.$http
        .get(
          "http://172.29.3.78:8081/lite-live-streaming-platform/gift/"
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


