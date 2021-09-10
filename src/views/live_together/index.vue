<template>
  <div id="dynamic">
    <div v-for="(item) in list" id="one-dynamic" :key="item.id">
      <div class="dynamic-text">{{ item.userDynamic.dynamicContent }}</div>
      <div class="dynamic-text">{{ item.userDynamic.dynamicContent }}</div>
    </div>
  </div>
</template>
<script>
import { getAction } from '@/api/api'
export default {
  name: 'live_together',
  data() {
    return {
      list: []
    }
  },
  created() {
    getAction(
      'lite-live-streaming-platform/live_together',
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
