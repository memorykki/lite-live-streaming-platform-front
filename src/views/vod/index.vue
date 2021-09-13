<template>
<div>
  <div><navbar/></div>

  <div id="dynamic">
    <div v-for="(item) in list" id="one-dynamic"  :key="item.id" @click="gotoHome(item.vodId)">
      <div class="dynamic-text">{{ item.vodId }}</div>
      <div class="dynamic-text" style="color: red;">{{ item.vodName }}</div>
      <div class="dynamic-text">{{ item.vodIntroduction }}</div>
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
  name: 'vod',
  data() {
    return {
      list: []
    }
  },
  created() {
    getAction(
      'lite-live-streaming-platform/vod',
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
      console.log(a)
      this.$router.push({
        path: "/vodHome",
        query: {
          vodId: a
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
