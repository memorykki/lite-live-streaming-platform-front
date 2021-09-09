<template>
  <div class="loginBar">
    <div style="cursor: pointer">
      <span class="loginSta" @click="logout">首页</span>
      <el-avatar
        :src="userInfo.avatarUrl"
        class="userHead"
        style="vertical-align: middle"
      ></el-avatar>
      <span class="loginSta">{{nickname}}</span>

    </div>
  </div>
</template>

<script>
// import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "loginBar",
  components: {},
  // computed: {
  //   ...mapGetters([
  //     //用户信息
  //     "userInfo",
  //   ]),
  // },
  data() {
    return {
      userInfo:{
        avatarUrl:'../../assets/logo.png',
        nickname:"直播平台",
        sex:'男',
        birthday:'',
      },
      nickname:"我是昵称",
    };
  },
  methods: {
    logout(userInfo){
      this.$router.push({
        path: "/dashboard"
      });
    },
  },
};
</script>

<style scoped>
.loginSta {
  font-size: 15px;
  margin-right: 5px;
}

.loginBar {
  display: flex;
  height: 80px;
}

.loginBar .userHead {
  width: 40px;
  height: 40px;
  margin-top: 0px;
  z-index: 100;
}
</style>
