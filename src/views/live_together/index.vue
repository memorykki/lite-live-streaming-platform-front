<template>

<div>
 <div><navbar/></div>
  <div id="dynamic">
    <div v-for="(item) in list" id="one-dynamic"  :key="item.id" @click="gotoHome(item.liveTogetherId)">
      <div class="dynamic-text">{{ item.liveTogetherId }}</div>
      <div class="dynamic-text" style="color: red;">{{ item.name }}</div>
      <div class="dynamic-text" v-if="item.flag === 1">正在直播</div>
      <div class="dynamic-text" v-else>未开播</div>
    </div>
  </div>

</div>
</template>
<script>
import { getAction } from '@/api/api'
import  Navbar  from '@/layout/components/Navbar.vue'
export default {
  components: {
    Navbar,
    
  },
  name: 'live_together',
  data() {
    return {
      list: []
    }
  },
  created() {
    getAction(
      'lite-live-streaming-platform/liveTogether',
      {
        pageCurrent: 0,
        pageSize: 10,
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
    gotoHome(a){
      this.$router.push({
        path: "/liveTogetherHome",
        query: {
          liveTogetherId: a
        }
      })
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
  .dynamic-text{
    margin: 2% 0 2% 0;
  }
</style>
