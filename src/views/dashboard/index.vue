<template>
  <div>
    <el-container>
      <el-header id="head1">
        <img src="../../assets/images/logo.jpg" class="demo" alt="" />
        <loginBar style="position: absolute; right: 5%; top: 20%" />
      </el-header>
      <el-main>
        <el-container>
          <el-header>
            <headTab/>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import loginBar from "@/views/dashboard/loginBar";
  import headTab from "@/views/dashboard/headTab";
  import ranking from "@/views/dashboard/ranking";
  export default {
    name: "person",
    components: {
      loginBar,
      headTab,
      ranking
    },

    data() {
      return {};
    },
    methods: {
      person(userInfo) {
        this.$router.push({
          path: "/person"
        });
      },
      
    },
  };
</script>

<style>
  #head1 {
    display: flex;
    position: relative;
    background: #1c2c3c;
    padding-top: 5px;
  }

  .demo {
    width: 150px;
    height: 150px;
    margin-top: -50px;
    margin-left: 10px;
  }

  .el-header span {
    width: 100px;
    margin-left: 10px;
    margin-top: 15px;
    font-weight: 500;
    font-size: 20px;
    color: #ffffff;
  }
  .el-header {
          position: relative;
          width: 100%;
          height: 60px;
      }
  .el-main {
    position: absolute;
    left: 10px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    }
</style>
</style>
