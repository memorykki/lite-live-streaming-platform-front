<template>
  <div id="dynamic">
    <div v-for="(item,index) in list" id="one-dynamic" :key="item.id">
      <div class="dynamic-time">{{ item.userDynamic.updateTime }}</div>
      <div v-if="item.userDynamic.dynamicType === 1" class="dynamic-text">{{ item.userDynamic.dynamicContent }}</div>
      <img v-if="item.userDynamic.dynamicType === 2" :src = "item.userDynamic.dynamicContent">
      <div v-if="item.userDynamic.dynamicType === 3">
        这是视频 链接：{{ item.userDynamic.dynamicContent }}
        <div id="liveVideo">
          <player ref="myplayer" :roompath="item.userDynamic.dynamicContent"></player>
        </div>
      </div>
      <div id="opra">
        <div id="zan-count">{{ item.userDynamic.dynamicLike }}</div>
        <div v-if="item.haveLike" id="zan-btn_cacel_like"><img class="like" src="http://ts.memorykk.cn:1936/dynamic_img/like_yes.png" @click="cancel_like(item.userDynamic.dynamicId,index)"/></div>
        <div v-else id="zan-btn_like"><img class="like" src="http://ts.memorykk.cn:1936/dynamic_img/like_no.png" @click="like(item.userDynamic.dynamicId,index)"/></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAction, deleteAction, putAction } from '@/api/api'
import Player from "@/views/player/index";
import Vue from "vue";
export default {
  name: 'Dynamic',
  components: {
    Player
  },
  data() {
    return {
      list: [],
      realroompath: "",
      userId: 7,
      anchorId: 6
    }
    props:['liveid']
  },
  created() {
    getAction(
      'lite-live-streaming-platform/userDynamic/list',
      {
        pageCurrent: 0,
        pageSize: 10,
        userId: this.userId,
        anchorId: this.anchorId
      }
    ).then(res => {
      if (res.status === 200) {
        this.list = res.data.data.records
      } else {
        alert('获取数据失败')
      }
    })
    // setTimeout(() => {
    //   this.loadVideo();
    // }, 1000);
  },
  methods: {
    loadVideo(){
      // const child = this.$refs.myplayer[0]
      // child.videoObject.video = "http://ts.memorykk.cn:1936/dynamic_video/s_20210829_174136_04.flv"
      // child.videoObject.video = child.roompath;
      // new ckplayer(child.videoObject);
    },
    cancel_like(id, index) {
      deleteAction('lite-live-streaming-platform/userLikeDynamic/cancel?userId=' + this.userId + '&dynamicId=' + id
      ).then((res) => {
        if (res.status === 200) {
          this.list[index].userDynamic.dynamicLike = this.list[index].userDynamic.dynamicLike - 1
          this.list[index].haveLike = false
        } else {
          alert('取消失败！')
        }
      })
    },
    like(id, index) {
      putAction('lite-live-streaming-platform/userLikeDynamic/like?userId=' + this.userId + '&dynamicId=' + id
      ).then((res) => {
        if (res.status === 200) {
          this.list[index].userDynamic.dynamicLike = this.list[index].userDynamic.dynamicLike + 1
          this.list[index].haveLike = true
        } else {
          alert('点赞失败！')
        }
      })
    }
  },
  mounted(){
    this.userId = Vue.ls.get("userInfo").user.userId;
    this.anchorId = this.liveid;
    console.log(this.userId)
    console.log(this.anchorId)
  }
}
</script>
<style scoped>
  #dynamic{
    padding: 5% 5% 0 5%;
    background-color:#f5f6f7;
  }
  #one-dynamic{
    padding: 5%;
    background-color: white;
    margin: 50px;
    border-radius: 30px;
  }
  #zan-btn_like{
    float: right;
    width: 50px;
  }
  #zan-btn_cacel_like{
    float: right;
    width: 50px;
  }
  #zan-count{
    float: left;
    width: 50px;
  }
  #opra{
    display: flex;
    line-height: 50px;
    text-align: center;
    float: right;
    position: absolute;
    right: 15%;
  }
  .dynamic-text{
    min-height: 200px;
  }
  .dynamic-time{
    min-height: 50px;
  }
  #liveVideo {
    text-align: center;
    padding: 0px;
    margin: 0px;

    height: 400px;
    width: 400px;
  }
  .like{
    height: 40px;
    width: 40px;
  }
</style>
