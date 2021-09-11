<template>
  <el-card class="box-card">
    <el-tabs :tab-position="tabPosition" style="height: 100%;">
      <el-tab-pane label="申请成为主播">
        <!-- <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
                v-if="!anchor"
                >申请成为主播
              </el-button> -->
        <!-- <el-dialog title="申请成为主播"
                :visible.sync="dialogVisible"
                width="30%"> -->
                <el-form ref="room" :model="room" label-width="100px">
            <el-form-item label="身份证明">
              <el-input v-model="room.applyEvidence"></el-input>
            </el-form-item>
            
            <el-form-item label="申请原因">
              <el-input type="textarea" v-model="room.applyReason"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即申请</el-button>
            </el-form-item>
          </el-form>
                <!-- </el-dialog> -->

      </el-tab-pane>
    </el-tabs>
          
      </el-card>
</template>

<script>
import Vue from 'vue';
import { postAction } from "@/api/api";
   export default {
      data() {
        return {
          tabPosition:'left',
          room: {
            userId:'',
            applyReason:'',
            applyEvidence:'',

          },
          dialogVisible:false,
          userInfo:'',
        }
      },
      methods: {
        onSubmit(form) {
      //更新数据到数据库，在方法中编写ajax请求即可
     
        
          postAction(
            "lite-live-streaming-platform/applyAnchorRecord",{
              applyReason:this.room.applyReason,
              userId: Vue.ls.get("userInfo").user.userId,
              applyEvidence:this.room.applyEvidence,
            }
           
          )
            .then((res) => {
              this.$message({
                //提示添加成功消息
                message: "申请成功",
                type: "success",
              });
              this.dialogVisible = !this.dialogVisible; //关闭添加对话框
            })
            .catch((res) => {
              this.$message.error("网络异常，添加失败");
            });
             
    },
      },
      mounted() {
    //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo = Vue.ls.get("userInfo").user;
    
    // this.form.userId=Vue.ls.get("userInfo").user.userId;
    // this.form.roomId=Vue.ls.get("userInfo").user.roomId;
    console.log(Vue.ls.get("userInfo").user.userId);
  },
    }
</script>

<style>
</style>
