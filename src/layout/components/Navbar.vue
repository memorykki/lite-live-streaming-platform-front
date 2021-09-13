<template>
  <div class="navbar">
    <!-- 首页头部导航栏 -->

    <el-menu
      mode="horizontal"
      router
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/dashboard">直播</el-menu-item>
      <el-menu-item index="/vod">点播</el-menu-item>

      <el-menu-item index="/liveTogether">一起看</el-menu-item>

      <div class="right-menu">
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
           
          <!-- 登录时使用数据库中头像，未登录则显示默认头像 -->
             <img  :src="Avatar" class="user-avatar" onerror="this.src='http://172.29.3.78:8081/lite-live-streaming-platform/static/file/commonfile/5f4901fe-a286-471c-bc94-d76379629929.png'"/>
            
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <router-link to="/person"> -->
            <span @click="judge">
              <el-dropdown-item> 个人中心 </el-dropdown-item>
            </span>
            <!-- </router-link> -->
            <span style="display: block" @click="exit">
              <el-dropdown-item divided> 退出登录 </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Vue from "vue";
import router from "@/router";
import { getAction } from "@/api/api";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      Avatar: "not",
    };
  },
  computed: {
    ...mapGetters(["sidebar", "user", "baseApi"]),
  },
  methods: {
    judge() {
      if (Vue.ls.get("userInfo")) {
        this.$router.push("/person");
      } else {
        this.$router.push("/login");
      }
    },
    judgeHeadIcon() {
      if (Vue.ls.get("userInfo")) {
        this.Avatar = Vue.ls.get("userInfo").user.userHeadPhoto;
      }
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    exit() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出登录",
        });

        //退出登陆后清除localstorage信息
        localStorage.removeItem("vuejs__userInfo");
        
        //刷新页面
        location.reload();
      });
    },
  },
  mounted() {
    this.judgeHeadIcon();
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;

  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .leftmenu {
      float: left;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
