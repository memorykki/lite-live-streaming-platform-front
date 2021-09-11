<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane label="观看历史">
          <el-row :gutter="10">
            <el-col :span="6">          
              <!-- 定义条件查询输入框 -->
              <el-input clearable prefix-icon="el-icon-search" v-model="history.roomId" placeholder="请输入房间号" />  
            </el-col>
            <el-col :span="4">
              <el-button type="primary" plain icon="el-icon-search" size="small">查询</el-button>
            </el-col>
          </el-row>
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%;height: 550px;">
            <el-table-column label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column prop="userId" label="用户" width="120">
            </el-table-column>

            <el-table-column prop="roomId" label="房间号" width="80">
            </el-table-column>
            <el-table-column prop="watchTime" label="观看时间" width="300">
            </el-table-column>

          </el-table>
          <!-- 分页 -->
           <el-pagination  @size-change="handleSizeChange"  
            @current-change="handleCurrentChange" 
            :current-page="pager.pageCurrent" 
            layout="total, prev, pager, next, jumper" :total="pager.total">      
          </el-pagination>

        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
import { getAction } from '@/api/api';
import Vue from 'vue';
  export default {
    data() {
      return {
        // 分页
        pager: {
          pageCurrent: 0, //当前是0页          
          pageSize: 10, //每页显示10条记录  
          total: 0
        },

        tabPosition: 'left',
        history: {
          // 用户id
          userId: '', //用户昵称
          userName: '',
          roomId: '', //类型1直播2评论
          watchTime: '', //观看时间
        },
        // 表格
        tableData: [],
        userInfo:[]
      }
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

      findPage() { //定义的分页查询方法
        // Vue.http.options.root = 'http://172.29.3.78:8081/lite-live-streaming-platform'
        getAction('lite-live-streaming-platform/userWatchHistory?userId='+this.userInfo.userId, {
          
            pageCurrent: this.pager.pageCurrent, //当前从那条记录开始分页第一条1
            pageSize: this.pager.pageSize, //每页显示多少条记录
            roomId: this.roomId,//条件查询的参数
            userId:this.userInfo.userId
          
        }).then(res => {
          //在此将数据赋值给数据表格数组
          this.tableData = res.data.data.records;
          console.log(this.tableData);
          this.pager.total = res.data.data.total; //获得后台传递过来的分页统计数
          this.pager.pageCurrent = res.data.data.current; //将当前分页的期数数据回传到页面，要使用
        }).catch(res => {
          this.$message.error('信息，网络异常啦...');
        })
      }
    },
    mounted() { //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo = Vue.ls.get("userInfo").user;
    console.log(this.userInfo);
      this.findPage();
    }
  }
</script>


<style>
</style>
