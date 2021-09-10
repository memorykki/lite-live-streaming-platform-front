<template>
  <div class="loginBar">
    <div style="cursor: pointer">
      <span class="loginSta" @click="logout">首页</span>
      <el-avatar
        :src="user.userHeadPhoto"
        class="userHead"
        style="vertical-align: middle"
      ></el-avatar>
      <span class="loginSta">{{user.userName}}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "loginBar",
  components: {},

  data() {
    return {
      user: {
        // 用户id
        userId: '',
        userName: '', //用户昵称
        userEmail: '', //邮箱
        userPhone: '', //手机号
        userPasswd: '', //密码
        userHeadPhoto: '', //头像
        userStatus: '', //状态1正常，2删除
        userFansCount: '', //粉丝数
        userExistCoins: '', //剩余活力币
        userSumCoins: '', //活力币总数
        roomId: '', //房间号
        roleId: '', //角色id
      },
    };
  },
  methods: {
    logout(avatarUrl){
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
}
</style>
