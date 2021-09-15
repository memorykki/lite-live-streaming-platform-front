<template>
  <div style="width: 100%">
    <!-- 卡片组件，阴影设为always -->
    <el-card class="box-card" shadow="always">
      <!-- 卡片导航头div -->
      <div slot="header">
        <!-- 卡片头部，写入面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/shouye' }"
            >首页</el-breadcrumb-item
          >

          <el-breadcrumb-item>信息管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 表格div -->
      <div id="el_table">
        <!-- 管理员管理用户信息 -->
        <!-- stripe开启斑马线 -->
        <!-- border开启边框 -->
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          height="500"
        >
          <el-table-column prop="userId" label="用户Id"> </el-table-column>
          <el-table-column prop="applyTime" label="申请时间"> </el-table-column>
          <el-table-column prop="applyReason" label="申请原因"> </el-table-column>
          <el-table-column prop="applyEvidence" label="身份证明"> </el-table-column>
          <el-table-column prop="applyResult" :formatter="result" label="结果"> 
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                circle
                icon="el-icon-edit"
                type="warning"
                @click="openEditDialog(scope.row)"
              >审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改对话框 -->

    <el-dialog title="修改用户信息" :visible.sync="openEditDialogFlag">
      <el-radio v-model="applyResult" label="0"
                      >待审核</el-radio
                    >
                    <el-radio v-model="applyResult" label="1"
                      >审核通过</el-radio
                    >
                    <el-radio v-model="applyResult" label="2"
                      >审核不通过</el-radio
                    >
      <div slot="footer" class="dialog-footer">
        <el-button @click="openEditDialogFlag = false">取 消</el-button>
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-dialog>
      <!-- 分页组件 -->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pager.pageCurrent"
          :page-size="pager.pageSize"
          layout="prev, pager, next, jumper"
          :total="pager.total"
        >
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>
<script>
import { putAction, getAction } from '@/api/api';
export default {
  data() {
    return {
      //分页工具
      pager: {
        pageCurrent: 1, //双向绑定
        pageSize: 5,
        total: 0, //双向绑定
      },

      // 条件查询需要传入的参数
      userName: "",
      tableData: [],
      applyResult:'',
      //控制修改对话框是否显示，默认不显示
      openEditDialogFlag: false,
    //   apply:{
    //       userId:'',
    //       applyResult:''
    //   }
      
    };
  },
  methods: {
      result(row){
          if(row.applyResult===0){
              return "待审核";
          }else if(row.applyResult === 1){
              return "审核通过";
          }else{
              return "审核未通过";
          }
      },
    //更新数据
    update() {
      //记得更新地址********************************************************************
      console.log(this.user.userId);
      putAction(
          "lite-live-streaming-platform/applyAnchorRecord",
          {
              userId:this.user.userId,
              applyResult:this.applyResult,
          }
        )
        .then((res) => {
          //关闭对话框
          this.openEditDialogFlag=!this.openEditDialogFlag;
          this.findPage();
        });
        // .catch((res) => {
        //   this.$message.error("出错了");
        // });
    },

    // 弹出修改对话框
    openEditDialog(row) {
      // 将数据填充到表单
      //将所有数据赋给user对象，可能出问题，记得更改**************************************

      this.user = row;
      //让对话框显示
      this.openEditDialogFlag = true;
      console.log(row);
    },

    // 每页有多少条数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pager.pageCurrent = val;
      //查询第val页
      this.findPage();
    },
    // 获取分页查询
    findPage() {
      //判断传入的userName是否为空
      //为空字符串时不传这个参数，不为空时传入
      let params = {
        pageCurrent: this.pager.pageCurrent,
        pageSize: this.pager.pageSize,
      };
      if (this.user_name) {
        //后端查询需要传递的参数
        params.userName = this.user_name;
      }
      getAction("lite-live-streaming-platform/applyAnchorRecord/")
        .then((res) => {
          //  将得到的数据赋值,可能出问题记得更改*************************************************
          this.tableData = res.data.data.records;
          console.log(this.tableData);

          //获取后端分页统计数
          this.pager.total = res.data.data.total;

          console.log(res);
          //获取分页信息
          this.pager.pageCurrent = res.data.data.current;
        });
    },
  },

  mounted() {
    this.findPage();
  },
};
</script>
<style scoped="scoped">
.el-pagination {
  margin-top: 10px;
}
#el_table {
  margin-top: 15px;
}
.el_input {
  margin-top: 15px;
}
</style>