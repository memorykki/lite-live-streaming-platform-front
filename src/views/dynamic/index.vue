<template>
  <div id="dynamic">
    <div v-for="(item,index) in list" id="one-dynamic" :key="item.id">
      <div class="dynamic-time">{{ item.userDynamic.updateTime }}</div>
      <div v-if="item.userDynamic.dynamicType === 1" class="dynamic-text">{{ item.userDynamic.dynamicContent }}</div>
      <img v-if="item.userDynamic.dynamicType === 2" :src = "item.userDynamic.dynamicContent">
      <div v-if="item.userDynamic.dynamicType === 3">这是视频 链接：{{ item.userDynamic.dynamicContent }}</div>
      <div id="opra">
        <div id="zan-count">{{ item.userDynamic.dynamicLike }}</div>
        <div v-if="item.haveLike" id="zan-btn_cacel_like"><button href="" @click="cancel_like(item.userDynamic.dynamicId,index)">取消点赞</button></div>
        <div v-else id="zan-btn_like"><button href="" @click="like(item.userDynamic.dynamicId,index)">点赞</button></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAction, deleteAction, putAction } from '@/api/api'
export default {
  name: 'Dynamic',
  data() {
    return {
      list: []
    }
  },
  created() {
    getAction(
      '/userDynamic/list',
      {
        pageCurrent: 0,
        pageSize: 10,
        userId: 7,
        anchorId: 6
      }
    ).then(res => {
      if (res.status === 200) {
        console.log(res)
        this.list = res.data.data.records
      } else {
        alert('获取数据失败')
      }
    })
  },
  methods: {
    cancel_like(id, index) {
      console.log(this.list[index].userDynamic.dynamicLike)
      deleteAction('http://192.168.1.102:8081/lite-live-streaming-platform/userLikeDynamic/cancel?userId=' + 7 + '&dynamicId=' + id
      ).then((res) => {
        if (res.status === 200) {
          this.list[index].userDynamic.dynamicLike = this.list[index].userDynamic.dynamicLike - 1
        } else {
          alert('取消失败！')
        }
      })
      console.log(this.list[index].userDynamic.dynamicLike)
    },
    like(id, index) {
      console.log(this.list[index].userDynamic.dynamicLike)
      putAction('http://192.168.1.102:8081/lite-live-streaming-platform/userLikeDynamic/like?userId=' + 7 + '&dynamicId=' + id
      ).then((res) => {
        if (res.status === 200) {
          this.list[index].userDynamic.dynamicLike = this.list[index].userDynamic.dynamicLike + 1
        } else {
          alert('点赞失败！')
        }
      })
      console.log(this.list[index].userDynamic.dynamicLike)
    }
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
</style>
