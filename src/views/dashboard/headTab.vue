<template>
  <div class="headTab">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="ranking">排行榜</el-menu-item>
      <el-menu-item index="game">游戏</el-menu-item>
      <el-menu-item index="singing">唱歌</el-menu-item>
      <el-menu-item index="dancing">跳舞</el-menu-item>
      <el-menu-item index="movie">放映</el-menu-item>
      <el-menu-item index="wholelife">整活</el-menu-item>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "headTab",
  components: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
/* 点击出来的下划线进行修改 */

.el-menu-item.is-active {
  border-color: #ec4141;
  font-size: 20px;
  font-weight: 400;
}
/* 整体的下划线进行隐藏 */

.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-header{
  background: #ffffff;
}
.headTab{
text-align: center;
}
</style>
