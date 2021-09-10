<template>
  <div class="game">
    <!-- 排行榜 -->
    <el-card style="width: 100%;">
      <el-row :gutter="60">
      <el-col :span="12" v-for="(item, index) in game" :key="index" style="margin-bottom: 30px">
        <!-- 封面 -->
        <div id="Detail">
          <el-image :src="item.roomPhoto" fit="fill" style="width: 100%; height: 100%; border-radius: 8px" @click="
                  $router.push({
                    name: '',
                    query: {},
                  })
                "></el-image><!-- @click="toVideoPage(item.id)" -->
        </div>
        <!-- 介绍 -->
        <div id="Intro">
          <p style="margin: 0;font-weight: bolder;font-size: larger;" id="title">{{ item.roomTitle }}</p>
          <p style="margin: 0;" id="roomId" @click="toVideoPage(item.roomId)">房间号:{{ item.roomId }}</p>
          <p style="margin: 0;" id="userName">by {{item.userId}}</p>
        </div>
      </el-col>
    </el-row>
    <el-pagination  @size-change="handleSizeChange"
        @current-change="handleCurrentChange"      
        :current-page="pager.pageCurrent"        
        :page-size="pager.pageSize"  
        layout="total, prev, pager, next, jumper" :total="pager.total">      
      </el-pagination>
    </el-card>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
import { getAction } from '@/api/api';
  export default {
    name: "game",
    components: {},
    data() {
      return {
        classify:'1',
        game: [],
        pager: {
          pageCurrent: 0, //当前是0页          
          pageSize: 10, //每页显示10条记录  
          total: 0
        },
      };
    },
    methods: {
      handleSizeChange(val) { //每页多少条记录
        this.pager.pageSize = val
        console.log(this.pager.pageSize);
        this.findPage();
      },
      handleCurrentChange(val) { //当前是第几页
        this.pager.pageCurrent = val;
        console.log(this.pager.pageCurrent);
        this.findPage(); //回调查询方法
      },

      find(tag) { //定义的分页查询方法
        // Vue.http.options.root = 'http://172.29.3.78:8081/lite-live-streaming-platform'
        getAction('lite-live-streaming-platform/room/selectClassifyList', {
          
            pageCurrent: this.pager.pageCurrent, //当前从那条记录开始分页第一条1
            pageSize: this.pager.pageSize, //每页显示多少条记录
            classify: this.classify,
          
        }).then(res => {
          //在此将数据赋值给数据表格数组
          console.log(res);
          this.game = res.data.data.records;
          this.pager.total = res.data.data.total; //获得后台传递过来的分页统计数
          this.pager.pageCurrent = res.data.data.current; //将当前分页的期数数据回传到页面，要使用
        }).catch(res => {
          this.$message.error('信息，网络异常啦...');
        })
      },
      toVideoPage(id) {
        this.$router.push(" " + id);
      },
    },
    created() {
      this.find();
    },
  };
</script>

<style scoped>
  #Detail {
    width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  #Name {
    font-size: 15px;
    cursor: pointer;
    color: #373737;
    opacity: 0.9;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* overflow: hidden; */
    word-break: break-all;
  }

  #Name:hover,
  #userName:hover {
    opacity: 1;
    color: #000000;
  }

  #userName {
    font-size: 13px;
    cursor: pointer;
    color: #373737;
    opacity: 0.6;
  }
  .el-header {
          position: relative;
          width: 100%;
          height: 60px;      
      }
  .el-main {
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    }
</style>
