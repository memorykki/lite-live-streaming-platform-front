<template>
  <div>
    <el-container>

      <!-- bar不再需要引入，注释掉 -->
    <!-- <el-header> -->
        <!-- <img src="@/assets/images/avatar.png" class="demo" alt="" /> -->
        <!-- <loginBar style="position: absolute; right: 5%; top: 20%" /> -->
    <!-- </el-header> -->
    <el-container>
      <!-- 左边导航栏 -->
      <el-aside width="20%"><leftNav /></el-aside>
      <el-main>
        <el-main>
          <router-view/>
        </el-main>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  import leftNav from "@/components/person/naf";
  // import loginBar from "@/components/person/bar";
  import { mapGetters, mapMutations, mapActions } from "vuex";
  export default {
    name: "person",
    components: {
      leftNav,
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
  .el-header {
    display: flex;
    position: relative;
    background: #1c2c3c;
    padding-top: 5px;
  }
  /* .demo {
    width: 150px;
    height: 150px;
    margin-top: -50px;
    margin-left: 10px;
  } */

  .el-header span {
    width: 100px;
    margin-left: 10px;
    margin-top: 15px;
    font-weight: 500;
    font-size: 20px;
    color: #ffffff;
  }
  </style>
</style>
