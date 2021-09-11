<template>
  <div class="leftNav">
    <el-col>
      <el-menu
        router
        active-text-color="#000000"
        :default-active="
          '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        "
        class="el-menu-vertical-demo"
        text-color="#5c5c5c"
        @open="handleOpen"
        @close="handleClose"
      >
        <p class="leftNavFont">个人信息</p>
        <div>
          <el-menu-item index="information">
            <i class="el-icon-user" style="color: #000000 !important"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="dynamic">
            <i class="el-icon-camera" style="color: #000000 !important"></i>
            <span slot="title">动态列表</span>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="attention">
            <i class="el-icon-view" style="color: #000000 !important"></i>
            <span slot="title">我的关注</span>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="history">
            <i class="el-icon-time" style="color: #000000 !important"></i>
            <span slot="title">观看历史</span>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="wallet">
            <i class="el-icon-coin" style="color: #000000 !important"></i>
            <span slot="title">活力币历史记录</span>
          </el-menu-item>
        </div>
        <div>
          <el-menu-item index="gift">
            <i class="el-icon-coin" style="color: #000000 !important"></i>
            <span slot="title">礼物历史记录</span>
          </el-menu-item>
        </div>
        <!-- 当用户不是主播时显示 -->
        <div v-if="!anchor">
          <el-menu-item index="show">
            <i class="el-icon-video-camera" style="color: #000000 !important"></i>
            <span slot="title">申请成为主播</span>
          </el-menu-item>
        </div>
      </el-menu>
      <!-- 主播 -->
      <el-menu
        :router="true"
        active-text-color="#000000"
        :default-active="
          '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        "
        class="el-menu-vertical-demo"
        text-color="#5c5c5c"
        @open="handleOpen"
        @close="handleClose"
        v-if="anchor"
      >
        <p class="leftNavFont">主播</p>
        <div>
          <el-menu-item index="anchorInfo">
            <i class="el-icon-camera" style="color: #000000 !important"></i>
            <span slot="title">开播信息</span>
          </el-menu-item>
          <el-menu-item index="playback">
            <i class="el-icon-video-camera" style="color: #000000 !important"></i>
            <span slot="title">回放管理</span>
          </el-menu-item>
        </div>
      </el-menu>
      <!-- 管理员管理 -->
      <el-menu
      
        :router="true"
        active-text-color="#000000"
        :default-active="
          '/' + this.$route.path.split('/')[1] + '/' + this.$route.path.split('/')[2]
        "
        class="el-menu-vertical-demo"
        text-color="#5c5c5c"
        @open="handleOpen"
        @close="handleClose"
        v-if="administrators"
      >
        <p class="leftNavFont">用户管理</p>
        <div>
          <el-menu-item index="user">
            <i class="el-icon-more-outline" style="color: #000000 !important"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="report">
            <i class="el-icon-warning-outline" style="color: #000000 !important"></i>
            <span slot="title">举报记录</span>
          </el-menu-item>
          <el-menu-item index="admingift">
            <i class="el-icon-shopping-bag-2" style="color: #000000 !important"></i>
            <span slot="title">礼物管理</span>
          </el-menu-item>
          <el-menu-item index="ban">
            <i class="el-icon-circle-close" style="color: #000000 !important"></i>
            <span slot="title">封禁权限</span>
          </el-menu-item>
          <el-menu-item index="demand">
            <i class="el-icon-video-play" style="color: #000000 !important"></i>
            <span slot="title">点播管理</span>
          </el-menu-item>
           <el-menu-item index="applyAnchorRecord">
            <i class="el-icon-video-play" style="color: #000000 !important"></i>
            <span slot="title">主播申请记录</span>
          </el-menu-item>
          <el-menu-item index="adminwatching">
            <template slot="title">
              <!-- 图标组件 -->
              <i class="el-icon-view"></i>
              <span>一起看管理</span>
            </template>
          </el-menu-item>
        </div>
      </el-menu>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
    </el-col>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Vue from "vue";
export default {
  name: "leftNav",
  components: {},
  computed: {
    ...mapGetters([
      //用户
      "personalList",
    ]),
  },
  data() {
    return {
      administrators:true,
      anchor:false,
      userInfo:[],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.userInfo = Vue.ls.get("userInfo").user;
    if(this.userInfo.roleId<=10){
      this.anchor=false;
    }else{
      this.anchor=true;
    };
  },
};
</script>

<style scoped>
.el-col {
  height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
.el-col:hover {
  overflow-y: overlay;
}
.leftNavFont {
  opacity: 0.5;
  font-weight: 50;
  font-size: 13px;
  margin-left: 10px;
  /* height: 100px; */
}

.iconfont {
  margin-right: 10px;
}

.el-menu-item.is-active {
  background-color: #e6e7ea !important;
}

.el-menu-item:hover {
  background: #e6e7ea !important;
  color: #000000 !important;
}
.leftNav{
  height: 100%;
}
</style>
