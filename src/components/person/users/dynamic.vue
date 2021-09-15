<template>
  <div>
    <el-card>
      <el-tabs :tab-position="tabPosition" style="height: 100%">
        <el-tab-pane label="我的动态">
          <el-row :gutter="10">
            <!-- 添加 -->
            <el-col :span="4">
              <el-button
                type="primary"
                plain
                icon="el-icon-plus"
                size="small"
                @click="dialogVisible = true"
                >发布
              </el-button>
              <el-dialog
                title="发布动态"
                :visible.sync="dialogVisible"
                width="30%"
              >
                <el-form ref="dynamic" :model="dynamic" label-width="80px">
                  <el-form-item label="用户">
                    <el-input
                      :disabled="true"
                      v-model="dynamic.userId"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="类型">
                    <el-radio v-model="dynamic.dynamicType" label="1"
                      >文字</el-radio
                    >
                    <el-radio v-model="dynamic.dynamicType" label="2"
                      >图片</el-radio
                    >
                    <el-radio v-model="dynamic.dynamicType" label="3"
                      >视频</el-radio
                    >
                  </el-form-item>
                  <el-form-item v-if="dynamic.dynamicType == 1" label="内容">
                    <div>
                      <el-input
                        type="textArea"
                        v-model="dynamic.dynamicContent"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-else-if="dynamic.dynamicType == 2"
                    label="内容"
                  >
                    <div>
                      请选择图片：
                      <el-upload
                        class="upload-demo"
                        :action="imgAction"
                        :before-upload="changeAction"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture"
                        limit="1"
                      >
                        <el-button size="small" type="primary" @click="changeAction()"
                          >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                          只能选择一张图片，只能上传jpg/png文件，且不超过500kb
                        </div>
                      </el-upload>
                    </div>
                  </el-form-item>
                  <el-form-item
                    v-else-if="dynamic.dynamicType == 3"
                    label="内容"
                  >
                    <div>
                      请选择视频：
                      <el-upload
                        class="upload-demo"
                        :action="imgAction"
                        :before-upload="changeAction"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="video"
                        limit="1"
                      >
                        <el-button size="small" type="primary"
                          >点击上传</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                          只能选择一个视频，只能上传jpg/png文件，且不超过500kb
                        </div>
                      </el-upload>
                    </div>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="add(dynamic)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-col>
          </el-row>
          <!-- 动态 -->
          <el-row
            :span="8"
            v-for="(item, index) in tableData"
            :key="index"
            style="margin-bottom: 30px"
          >
            <div>
              <p
                style="margin: 0; font-weight: bolder; font-size: larger"
                id="title"
              >
                {{ item.userId }}
              </p>
              <p style="margin: 0">时间:{{ item.createTime }}</p>
            </div>
            <div>
              <div v-if="item.dynamicType === 1">{{ item.dynamicContent }}</div>
              <div v-else-if="item.dynamicType === 2">
                <el-image
                  :src="item.dynamicContent"
                  fit="fill"
                  style="width: 100%; height: 100%; border-radius: 8px"
                >
                </el-image>
              </div>
              <div v-else-if="item.dynamicType === 3">
                <p>
                  这是一条视频动态：<el-link
                    href="item.dynamicContent"
                    target="_blank"
                    >视频链接</el-link
                  >
                </p>
              </div>
            </div>
            <div>
              <el-row :gutter="10">
                <el-col span="6">
                  <el-tooltip content="点赞" placement="bottom">
                    <el-button
                      size="mini"
                      type="warning"
                      circle
                      icon="el-icon-star-on"
                      >{{ item.dynamicLike }}
                    </el-button>
                  </el-tooltip>
                </el-col>
                <el-col span="4">
                  <el-tooltip content="点击删除" placement="bottom">
                    <el-button
                      size="small"
                      @click="remove(item)"
                      type="danger"
                      circle
                      icon="el-icon-delete"
                    >
                    </el-button>
                  </el-tooltip>
                </el-col>
                <!-- <el-col span="1">
                    {{item.dynamicLike}}
                    </el-tooltip>
                  </el-col> -->
              </el-row>
            </div>
          </el-row>
          <!-- 分页 -->
           
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.pageCurrent"
          :page-size="pager.pageSize"
          layout="prev, pager, next, jumper"
          :total="pager.total"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { deleteAction, postAction, getAction } from "@/api/api";
import Vue from 'vue';
export default {
  data() {
    return {
      imgAction:"",
      // 分页
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      pager: {
        pageCurrent: 0, //当前是0页
        pageSize: 10, //每页显示10条记录
        total: 0,
      },
      fileList: [],
      // 添加表单显示
      dialogVisible: false,
      // 定义对话框可见性变了
      dialogFormVisible: false,

      // 标签页
      tabPosition: "left",
      dynamic: {
        dynamicId: "",
        userId: "", //用户昵称
        dynamicType: "", //类型1文字2图片3视频
        dynamicContent: "",
        dynamicLike: "", //点赞数
        createTime: "", //发布时间
      },
      // 表格
      tableData: [],
      userInfo:[]
    };
  },
  methods: {
    //修改图片视频上传Action
    changeAction(){
      this.imgAction = "lite-live-streaming-platform/userDynamic/publish?type=" + this.dynamic.dynamicType + "&userId=" + Vue.ls.get("userInfo").user.userId
      // console.log(this.imgAction)
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    add(dynamic) {
      var URL = "lite-live-streaming-platform/userDynamic/publish?userId=" + this.dynamic.userId + "&type=" + this.dynamic.dynamicType
      if(this.dynamic.dynamicType == 1){
        URL += "&message=" + this.dynamic.dynamicContent;
      }
      //更新数据到数据库，在方法中编写ajax请求即可
      this.$refs.dynamic.validate((valid) => {
        if (valid) {
          postAction(URL).then((res) => {
              this.$message({
                //提示添加成功消息
                message: res.data.message,
                type: "success",
              });
              this.dialogVisible = !this.dialogVisible; //关闭添加对话框
              this.findPage(); //查询添加结果
            })
            .catch((res) => {
              this.$message.error("网络异常，添加失败");
            });
        }
      });
    },
    // 删除
    remove(row) {
      //类型数据删除的
      console.log(row);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAction(
            "lite-live-streaming-platform/userDynamic?idList=" + row.dynamicId
          ).then((res) => {
              this.findPage(); //删除成功后调查询
              this.$message({
                type: "success",
                message: res.data.msg,
              });
            })
            .catch((res) => {
              this.$message.error("网络异常啦...");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      //每页多少条记录
      this.pager.pageSize = val;
      this.findPage();
    },
    handleCurrentChange(val) {
      //当前是第几页
      this.pager.pageCurrent = val;
      this.findPage(); //回调查询方法
    },

    findPage() {
      //定义的分页查询方法
      // Vue.http.options.root = 'http://172.29.3.78:8081/lite-live-streaming-platform'
      getAction("lite-live-streaming-platform/userDynamic/list", {
        pageCurrent: this.pager.pageCurrent, //当前从那条记录开始分页第一条1
        pageSize: this.pager.pageSize, //每页显示多少条记录
        dynamicContent: this.dynamicContent, //条件查询的参数
        anchorId: this.userInfo.userId,
      })
        .then((res) => {
          //在此将数据赋值给数据表格数组
          this.tableData = res.data.data.records;
          console.log(res);
          this.pager.total = res.data.data.total; //获得后台传递过来的分页统计数
          this.pager.pageCurrent = res.data.data.current; //将当前分页的期数数据回传到页面，要使用
        })
        .catch((res) => {
          this.$message.error("信息，网络异常啦...");
        });
    },
  },
  mounted() {
    //生命周期函数挂载完成后的方法，该函数不是自己定义的，vue自带的
    this.userInfo = Vue.ls.get("userInfo").user;
    console.log(this.userInfo);
    this.dynamic.userId=Vue.ls.get("userInfo").user.userId;
    this.findPage();
  },

};
</script>


<style>
</style>
