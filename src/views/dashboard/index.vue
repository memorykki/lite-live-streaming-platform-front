<template>
  <div class="dashboard-container">
    <div id="navbarhhhh" v-if="this.$route.path != '/dashboard'">
      <navbar/>
  
  </div>
    <el-container>
      <el-header>
        <head-tab/>
      </el-header>
      
    
      
     
      <!-- 左边导航栏 -->
      <el-main>
       
        <router-view/>
      </el-main>
  </el-container>    
    
    
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">从上面拿</span></div> -->
  </div>
</template>

<script>
import { getAction } from "@/api/api";
import Navbar from '@/layout/components/Navbar';
import { mapGetters, mapState } from "vuex";
import headTab from "@/views/dashboard/headTab.vue"

export default {
  name: "Dashboard",
  components:{ headTab,
  Navbar},
  data() {
    return {
      user: {},
      indexData: {},
      list:[]
    };
  },
  mounted() {
    console.log(this.userMessage)
    this.user = this.$route.query.data;
  
  },
  computed: {
    ...mapState(["userMessage"]),
  },
  methods: {
    onClick() {
      this.$router.push('/dashboard')
    }
  }
};
</script>

<style lang="scss" scoped>
body{
margin: 0px;
padding: 0px;
width: 100%;
height: 100%;
}
#dashboard-container{
  margin: 0px;
  padding: 0px;
}
.el-header{
  background: #fff;
}
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
