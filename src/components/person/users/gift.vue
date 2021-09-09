<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="我收到的礼物">用户管理</el-tab-pane>
        <el-tab-pane label="我送出的礼物">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          tabPosition: 'left'
        };
      },
      methods: {

      }
    };
</script>

<style>

</style>
