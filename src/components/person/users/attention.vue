<template>
  <!-- 定义表格组件 -->
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 100%;">
        <el-tab-pane label="我的关注">
          <el-row :gutter="10">
            <el-col :span="6">          
              <!-- 定义条件查询输入框 -->
              <el-input clearable prefix-icon="el-icon-search" v-model="focus.focusUserId"
              placeholder="请输入主播名" />
               
            </el-col>
            <el-col :span="4">
              <el-button type="primary" plain icon="el-icon-search" size="small"@click="findPage()">查询</el-button>
            </el-col>
            <!-- 添加 -->
            <!-- <el-col :span="4">
              <el-button type="primary" plain icon="el-icon-plus" size="small" @click="dialogVisible = true">添加
              </el-button>
              <el-dialog title="关注" :visible.sync="dialogVisible" width="30%">
                <el-form ref="dynamic" :model="dynamic" label-width="80px">
                  <el-form-item label="内容">
                    <el-input v-model="dynamic.dynamicContent"></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-radio v-model="dynamic.dynamicType" label="1">文字</el-radio>
                    <el-radio v-model="dynamic.dynamicType" label="2">图片</el-radio>
                    <el-radio v-model="dynamic.dynamicType" label="3">视频</el-radio>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="add(dynamic)">确 定</el-button>
                </span>
              </el-dialog>
            </el-col> -->
          </el-row>
          <el-table :data="tableData" stripe style="width: 80%">
            <el-table-column label="序号" type="index" width="80">
            </el-table-column>
            <el-table-column prop="userInfo.user.userHeadPhoto" label="头像" width="80">
              <template slot-scope="scope">
                <img :src="scope.row.userInfo.user.userHeadPhoto" alt="" style="width: 40px;height: 40px">
              </template>
            </el-table-column>
            <el-table-column prop="userInfo.user.userName" label="用户名"></el-table-column>
            <el-table-column prop="userInfo.user.roomId" label="房间号"></el-table-column>
            <el-table-column label="操作" width="130">
              <template slot-scope="scope">
                <el-tooltip content="取消关注" placement="bottom">
                  <el-button size="mini" @click="remove(scope.row)" type="warning" circle icon="el-icon-star-on" />
                </el-tooltip>
                </el-button>
                </el-tooltip>
              </template>
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
import { deleteAction, getAction } from '@/api/api';
import Vue from 'vue'
  export default {
    data() {
      return {
        // 分页
        pager: {
          pageCurrent: 0, //当前是0页          
          pageSize: 10, //每页显示10条记录  
          total: 0
        },
        focus:{
          userId:'',
          focusUserId:'',
          focusedUserId:''
        },
        tableData: [],
        tabPosition: 'left',
        userInfo:[],
      }
    },
    methods: {
      // 删除
      remove(row) { //类型数据删除的
        console.info(row);
        this.$confirm('将取消关注该主播, 是否继续?', '消息', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteAction('lite-live-streaming-platform/userFocus?idList=' + row.focusUserId)
            .then(res => {
              this.findPage() //删除成功后调查询
              this.$message({
                type: 'success',
                message: res.data.message
              });
            }).catch(res => {
              this.$message.error('网络异常啦...');
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSizeChange(val) { //每页多少条记录
        this.pager.pageSize = val
        this.findPage();
      },
      handleCurrentChange(val) { //当前是第几页
        this.pager.currentPage = val;
        this.findPage(); //回调查询方法
      },
      findPage() { //定义的分页查询方法
        getAction('lite-live-streaming-platform/userFocus/list', {
          
            pageCurrent: this.pager.pageCurrent, //当前从那条记录开始分页第一条1
            pageSize: this.pager.pageSize, //每页显示多少条记录
            focusUserId: this.focusUserId ,//条件查询的参数
            userId:6,
          
        }).then(res => {
          //在此将数据赋值给数据表格数组
          console.log(res);
          this.tableData = res.data.data.records;
          this.pager.total = res.data.data.total; //获得后台传递过来的分页统计数
          this.pager.pageCurrent = res.data.data.current; //将当前分页的期数数据回传到页面，要使用
        }).catch(res => {
          this.$message.error('网络异常啦...');
        })
      }
    },
    mounted() { //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo=Vue.ls.get("userInfo");
    console.log(this.userInfo);
    this.findPage();
    }
  }
</script>

<style>
</style>
