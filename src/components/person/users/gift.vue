<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane label="礼物历史记录">
          <el-row :gutter="10">
            <el-col :span="6">          
              <!-- 定义条件查询输入框 -->
              <el-input clearable prefix-icon="el-icon-search" v-model="gift.giftName" placeholder="请输入礼物名称" />  
            </el-col>
            <el-col :span="4">
              <el-button type="primary" plain icon="el-icon-search" size="small">查询</el-button>
            </el-col>
          </el-row>
          <!-- 表格 -->
          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
                    label="序号"
                         type="index"
                         width="50">
                       </el-table-column>
            <el-table-column prop="userId" label="用户" width="120">
            </el-table-column>
            <el-table-column prop="giftId" label="礼物id" width="120">
            </el-table-column>
            <el-table-column prop="roomId" label="房间号" width="80">
            </el-table-column>
            <el-table-column prop="createTime" label="时间" width="200">
            </el-table-column>
            </el-table>
          <!-- 分页 -->
           <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"      
            :current-page.sync="pager.pageCurrent" :page-size="pager.pageSize" layout="total, pager, next, jumper"      
            :total="pager.total">
          </el-pagination>

        </el-tab-pane>
      </el-tabs>

    </el-card>
  </div>
</template>

<script>
import { getAction } from '@/api/api';
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
        gift: {
          // 用户id
          serialGiftId: '',
          userId: '', //用户
          roomId: '', //房间号
          giftId: '', //礼物id
          giftName:'',
          createTime: '', //时间
        },
        // 表格
        tableData: []
      }
    },
    methods: {
      handleSizeChange(val) { //每页多少条记录
        this.pager.pageSize = val
        this.findPage();
      },
      handleCurrentChange(val) { //当前是第几页
        this.pager.pageCurrent = val;
        this.findPage(); //回调查询方法
      },

      findPage() { //定义的分页查询方法
        getAction('lite-live-streaming-platform/giftRecord', {
          
            pageCurrent: this.pager.pageCurrent, //当前从那条记录开始分页第一条1
            pageSize: this.pager.pageSize, //每页显示多少条记录
            giftName: this.giftName //条件查询的参数
          
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
      this.findPage();
    }
  }
</script>


<style>
</style>
