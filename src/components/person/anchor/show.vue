<template>
  <el-card class="box-card">
    <el-tabs :tab-position="tabPosition" style="height: 100%;">
      <el-tab-pane label="申请成为主播">
        <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
                v-if="!anchor"
                >申请成为主播
              </el-button>
        <el-dialog title="申请成为主播"
                :visible.sync="dialogVisible"
                width="30%">
                <el-form ref="room" :model="room" label-width="100px">
            <el-form-item label="标题">
              <el-input v-model="room.roomTitle"></el-input>
            </el-form-item>
            <el-form-item label="直播类型">
              <el-select v-model="room.roomType" placeholder="请选择直播类别">
                <el-option label="类型一" value="1"></el-option>
                <el-option label="类型二" value="2"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="直播公告">
              <el-input type="textarea" v-model="room.roomAnnouncement"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即申请</el-button>
            </el-form-item>
          </el-form>
                </el-dialog>

      </el-tab-pane>
    </el-tabs>
          
      </el-card>
</template>

<script>
import Vue from 'vue';
import { putAction } from "@/api/api";
   export default {
      data() {
        return {
          room: {
            roomId:'',
            roomTitle:'',
            userId:'',
            roomAnnouncement:'',
            roomType:'',
            roomStatus:'1',

          },
          dialogVisible:false,
          userInfo:'',
          anchor:false
        }
      },
      methods: {
        onSubmit(form) {
      //更新数据到数据库，在方法中编写ajax请求即可
      this.$refs.form.validate((valid) => {
        if (valid) {
          putAction(
            "lite-live-streaming-platform/room",{
              roomId:this.room.roomId,
              roomTitle:this.room.roomTitle,
              userId: Vue.ls.get("userInfo").user.userId,
              roomAnnouncement:this.room.roomAnnouncement,
              roomType:this.room.roomType,
              roomStatus:'1',
            }
           
          )
            .then((res) => {
              this.$message({
                //提示添加成功消息
                message: res.data.message,
                type: "success",
              });
              this.dialogVisible = !this.dialogVisible; //关闭添加对话框
            })
            .catch((res) => {
              this.$message.error("网络异常，添加失败");
            });
        }
      });
    },
      },
      mounted() {
    //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo = Vue.ls.get("userInfo").user;
    
    // this.form.userId=Vue.ls.get("userInfo").user.userId;
    // this.form.roomId=Vue.ls.get("userInfo").user.roomId;
    // console.log(this.form.userId);
  },
    }
</script>

<style>
</style>
