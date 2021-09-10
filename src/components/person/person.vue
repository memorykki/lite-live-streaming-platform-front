<template>
  <div>
    <el-container>
<<<<<<< HEAD

      <!-- bar不再需要引入，注释掉 -->
    <!-- <el-header> -->
        <!-- <img src="@/assets/images/avatar.png" class="demo" alt="" /> -->
        <!-- <loginBar style="position: absolute; right: 5%; top: 20%" /> -->
    <!-- </el-header> -->
=======
    <el-header>
        <img src="@/assets/images/logo.jpg" class="demo" alt="" />
        <loginBar style="position: absolute; right: 5%; top: 20%" />
    </el-header>
>>>>>>> d4ccff7dd0df5be7b858693936f0c6bd7adba82a
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
<<<<<<< HEAD
  // import loginBar from "@/components/person/bar";
  import { mapGetters, mapMutations, mapActions } from "vuex";
=======
  import loginBar from "@/components/person/bar";
  //import { mapGetters, mapMutations, mapActions } from "vuex";
>>>>>>> d4ccff7dd0df5be7b858693936f0c6bd7adba82a
  export default {
    name: "person",
    components: {
      leftNav,
      // loginBar,
    },
    
    data() {
      return {};
    },
    methods: {
<<<<<<< HEAD
      
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
=======
      person(userInfo){
        this.$router.push({
          path: "/person"
        });
      },
      page(){
        this.$router.push({
          path: "/"
        });
      }
>>>>>>> d4ccff7dd0df5be7b858693936f0c6bd7adba82a
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
