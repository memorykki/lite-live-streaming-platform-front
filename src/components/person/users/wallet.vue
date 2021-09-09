<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="我的活力币">
          <el-row :gutter="20">
            <el-col :span="4"><div class="grid-content bg-purple"><i class="el-icon-coin"></i></div></el-col>
            <el-col :span="10"><div class="grid-content bg-purple">数量</div></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="礼物历史记录">
          礼物历史记录
        </el-tab-pane>
        <el-tab-pane label="活力币历史记录">
          使用记录
        </el-tab-pane>
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
