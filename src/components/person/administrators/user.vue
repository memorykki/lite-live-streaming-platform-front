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

      <!-- layout布局存放工具栏 -->
      <div style="text-align: center">
        <el-row :gutter="10">
          <el-col :span="6"
            ><!-- 查询输入框,可清空 -->
            <el-input
              v-model="user_name"
              placeholder="请输入用户名"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="info" icon="el-icon-search" plain @click="findPage"
              >查询</el-button
            >
          </el-col>
          <el-col :span="4">
            <!-- 添加按钮 -->
            <el-button
              type="info"
              icon="el-icon-plus"
              plain
              @click="openAddDialog"
              >添加</el-button
            >
          </el-col>
        </el-row>
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
          <el-table-column prop="userId" label="UID"> </el-table-column>
          <el-table-column prop="userName" label="姓名"> </el-table-column>
          <el-table-column prop="userEmail" label="邮箱"> </el-table-column>
          <el-table-column prop="userPhone" label="电话"> </el-table-column>
          <el-table-column prop="userHeadPhoto" label="头像"> </el-table-column>
          <el-table-column prop="roomId" label="房间号"> </el-table-column>
          <el-table-column prop="roleId" label="角色"> </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                circle
                icon="el-icon-edit"
                @click="openEditDialog(scope.row)"
              ></el-button>
              <el-button
                size="mini"
                circle
                icon="el-icon-delete"
                @click="remove(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

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

    <!-- 修改对话框 -->

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="user">
        <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
        <el-input
          v-model="user.userEmail"
          placeholder="请输入邮箱地址"
        ></el-input>
        <el-input
          v-model="user.userPhone"
          placeholder="请输入联系电话"
        ></el-input>
        <el-input
          v-model="user.userHeadPhoto"
          placeholder="请输入头像"
        ></el-input>
        <el-input v-model="user.roomId" placeholder="请输入房间号"></el-input>
        <el-input v-model="user.roleId" placeholder="请输入角色"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">保存</el-button>
      </div>
    </el-dialog>

    <!-- 添加对话框 -->
    <el-dialog title="添加用户信息" :visible.sync="dialogAddUser">
      <el-form :model="addUser">
        <el-input
          v-model="addUser.userName"
          placeholder="请输入用户名"
        ></el-input>
        <el-input
          v-model="addUser.userEmail"
          placeholder="请输入邮箱地址"
        ></el-input>
        <el-input
          v-model="addUser.userPhone"
          placeholder="请输入联系电话"
        ></el-input>
        <el-input
          v-model="addUser.userHeadPhoto"
          placeholder="请输入头像"
        ></el-input>
        <el-input
          v-model="addUser.roomId"
          placeholder="请输入房间号"
        ></el-input>
        <el-input v-model="addUser.roleId" placeholder="请输入角色"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddUser = false">取 消</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
      user_name: "",
      tableData: [],
      // 表单对象，用来存放修改用户信息的数据
      user: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userHeadPhoto: "",
        roomId: "",
        roleId: "",
      },
      //表单对象用来存放添加用户信息的数据
      addUser: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userHeadPhoto: "",
        roomId: "",
        roleId: "",
      },
      //控制修改对话框是否显示，默认不显示
      dialogFormVisible: false,
      //控制添加对话框是否显示，默认不显示
      dialogAddUser: false,
      //用于删除数据
      deleUser: {
        userId: "",
      },
    };
  },
  methods: {
    //添加数据
    add() {
      this.$http
        .post(
          "http://101.200.54.21:9989/lite-live-streaming-platform//user/",
          this.addUser
        )
        .then((res) => {
          //关闭对话框
          this.dialogAddUser = !this.dialogAddUser;
          //刷新
          this.findPage();

          this.$message({
            message: "添加成功",
            type: "success",
          });
        })
        .catch((res) => {
          this.$message.error("添加失败");
        });
    },

    //弹出添加对话框

    openAddDialog() {
      //显示添加对话框
      this.dialogAddUser = true;
    },
    //更新数据
    update() {
      //记得更新地址********************************************************************
      this.$http
        .put(
          "http://101.200.54.21:9989/lite-live-streaming-platform//user/",
          this.user
        )
        .then((res) => {
          //关闭对话框
          this.dialogFormVisible = !this.dialogFormVisible;
          this.findPage();
        })
        .catch((res) => {
          this.$message.error("出错了");
        });
    },

    // 弹出修改对话框
    openEditDialog(row) {
      // 将数据填充到表单
      //将所有数据赋给user对象，可能出问题，记得更改**************************************

      this.user = row;
      //让对话框显示
      this.dialogFormVisible = true;
    },

    // 数据删除
    remove(row) {
      console.log(row.userId);

      this.deleUser.userId = row.userId;
      console.log(this.deleUser.userId);

      // 消息提示
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //没有返回值记得删除res
          this.$http
            .delete(
              "http://101.200.54.21:9989/lite-live-streaming-platform//user/",
              {
                params: {
                  idList: this.deleUser.userId,
                },
              }
            )
            .then((res) => {
              this.findPage(); //刷新页面

              this.$message({
                type: "success",
                message: "删除成功!",
              });
            });
        })
        .catch(() => {
           this.$message.error("出错了");
        });
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

    

      this.$http
        .get("http://101.200.54.21:9989/lite-live-streaming-platform//user/", {
          params,
        })
        .then((res) => {
          //  将得到的数据赋值,可能出问题记得更改*************************************************
          this.tableData = res.data.data.records;

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