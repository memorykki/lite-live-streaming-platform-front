<template>
  <div class="dashboard-container">
    <ul :key="item.id" v-for="item in list">
      <li><a :href="'/home?roomId='+item.roomId">{{item.roomTitle}}</a></li>
    </ul>
    
    <!-- <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">从上面拿</span></div> -->
  </div>
</template>

<script>
import { getAction } from "@/api/api";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Dashboard",
  components:{},
  data() {
    return {
      user: {},
      indexData: {},
      list:[]
    };
  },
  mounted() {
    console.log(this.userMessage)
    this.user = this.$route.query.data;
    getAction(
      "http://101.200.54.21:9989/lite-live-streaming-platform/room/selectClassifyList",
      { classify: 1 }
    ).then(res1 => {
      console.log(res1);
    });
    getAction(
      "http://101.200.54.21:9989/lite-live-streaming-platform/room/selectRankingList"
    ).then(res => {
      console.log(res);
      this.list = res.data.data
    });
  },
  computed: {
    ...mapState(["userMessage"]),
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
