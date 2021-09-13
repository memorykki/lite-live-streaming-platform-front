<template>
  <div>
   

      <!-- bar不再需要引入，注释掉 -->
   <div id="asdd">
        <navbar></navbar>
   </div>
    <el-container>
      <!-- 左边导航栏 -->
      <el-aside width="20%"><leftNav /></el-aside>
      <el-main>
        <el-main>
          <router-view/>
        </el-main>
      </el-main>
    </el-container>
  
  </div>
</template>

<script>
  import leftNav from "@/components/person/naf";
  // import loginBar from "@/components/person/bar";
  import { mapGetters, mapMutations, mapActions } from "vuex";
  import Navbar from '@/layout/components/Navbar';

  export default {
    name: "person",
    components: {
      leftNav,
      Navbar
       
      // loginBar,
    },
    computed: {
      ...mapGetters([
        //用户信息
        "userInfo",
      ]),
    },
    data() {
      return {};
    },
    methods: {
      
      // person(userInfo){
      //   this.$router.push({
      //     path: "/person"
      //   });
      // },
      // page(){
      //   this.$router.push({
      //     path: "/musicHome/recomVideo"
      //   });
      // }
    },
  };
</script>

<style>
  
  #asdd{
    margin: 5px;
    
  }
  .el-container{
    width: 100%;
    margin: 20px;
  }
  </style>
</style>
