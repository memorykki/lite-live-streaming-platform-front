<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ user }}</div>
    <button @click="onClick">我是按钮</button>
    <player></player>
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">从上面拿</span></div> -->
  </div>
</template>

<script>
import { getAction } from "@/api/api";
import { mapGetters, mapState } from "vuex";
import Player from '@/views/player'
export default {
  name: "Dashboard",
  components:{Player},
  data() {
    return {
      user: {},
      indexData: {}
    };
  },
  mounted() {
    console.log(this.$route);
    this.user = this.$route.query.data;
    getAction(
      "http://172.29.3.78:8081//lite-live-streaming-platform/room/selectClassifyList",
      { classify: 1 }
    ).then(res => {
      console.log(res);
    });
    getAction(
      "http://172.29.3.78:8081//lite-live-streaming-platform/room/selectRankingList"
    ).then(res => {
      console.log(res);
    });
  },
  computed: {
    // ...mapState([
    //   'userMessage',
    // ])
  },
  methods: {
    onClick() {
      this.$router.push('/dashboard')
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
