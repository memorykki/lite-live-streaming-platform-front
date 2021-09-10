<template>
  <div class="ranking">
    <!-- 排行榜 -->
    <el-card>
      <el-row :gutter="60">
      <el-col :span="8" v-for="(item, index) in rank" :key="index" style="margin-bottom: 30px">
        <!-- 封面 -->
        <div id="Detail">
          <el-image :src="item.roomPhoto" fit="fill" style="width: 100%; height: 100%; border-radius: 8px" @click="
                  $router.push({
                    name: '',
                    query: {},
                  })
                "></el-image><!-- @click="toVideoPage(item.id)" -->
          <div style="
                position: absolute;
                top: 5%;
                right: 3%;
                color: #ffffff;
                text-shadow: 0px 0px 2px #000000; ;
              ">
            <!-- 人数 -->
            <i class="iconfont icon-bofang" style="
                  width: 15px;
                  height: 15px;
                  border-radius: 100%;
                  margin-bottom: -1.5px;
                "></i>
            点击量：
            {{
                item.roomAnnouncement >= 10000
                  ? (item.roomAnnouncement / 10000).toFixed(0) + "万"
                  : item.roomAnnouncement
              }}
          </div>
        </div>
        <!-- 介绍 -->
        <div id="Intro">
          <p style="margin: 0;font-weight: bolder;font-size: larger;" id="title">{{ item.roomTitle }}</p>
          <p style="margin: 0;" id="roomId" @click="toVideoPage(item.roomId)">房间号:{{ item.roomId }}</p>
          <p style="margin: 0;" id="userName">主播by {{item.userId}}</p>
        </div>
      </el-col>
    </el-row>
    </el-card>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>

import {getAction} from '@/api/api'
  // import {
  //   mapGetters,
  //   mapMutations,
  //   mapActions
  // } from "vuex";
  export default {
    name: "ranking",
    components: {},
    data() {
      return {
        msg: '',
        rank: [],
      };
    },
    methods: {
      // 获取数据
      find(tag) {
        getAction("lite-live-streaming-platform/room/selectRankingList", {
          
          })
          .then((res) => {
            console.log(res);
            this.msg = res.data.msg;
            this.rank = res.data.data;
            // this.$store.dispatch("changeIsLoading", false);
          })
          .catch((error) => {
            console.log(error);
          });
      },
      toVideoPage(id) {
        this.$router.push(" " + id);
      },
    },
    created() {
      this.find();
    },
  };
</script>

<style scoped>
  /* 热门标签 */
  /* 视频布局 */
  /* .searchVideo {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 10px;
} */
  #Detail {
    width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  #Name {
    font-size: 15px;
    cursor: pointer;
    color: #373737;
    opacity: 0.9;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* overflow: hidden; */
    word-break: break-all;
  }

  #Name:hover,
  #userName:hover {
    opacity: 1;
    color: #000000;
  }

  #userName {
    font-size: 13px;
    cursor: pointer;
    color: #373737;
    opacity: 0.6;
  }
  .el-header {
          position: relative;
          width: 100%;
          height: 60px;      
      }
  .el-main {
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    }
</style>
