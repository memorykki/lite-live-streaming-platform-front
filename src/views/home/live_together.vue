<template>
  <el-container>
    <el-header height="80px">Header</el-header>
    <el-container>
        <div id="liveVideo">
          <player ref="myplayer" :roompath="realroompath"></player>
        </div>
    </el-container>
  </el-container>
</template>

<script>
//引入子组件
import Player from "@/views/player";
import Vue from 'vue'
export default {
  name: "live_together",
  //注入子组件
  components: { 
    Player
  },
  data() {
    return {
      roomdata: [],
      realroompath: '',
      roomId: 3,
    };
  },
  methods: {
  },
  mounted() {
    const rid = this.$route.query.liveTogetherId
    const child = this.$refs.myplayer;
    child.videoObject.video = 'rtmp://ts.memorykk.cn:1935/live_together/'+rid;
         new ckplayer(child.videoObject);
         console.log(child.videoObject.video)
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
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
#liveVideo {
  text-align: center;
  padding: 0px;
  margin: 0px;

  height: 100%;
  width: 100%;
}
</style>
