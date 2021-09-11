<template>
  <div id="upimage">
    <!-- 上传图片组件，获取返回的图片地址 -->
    <!-- <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload> -->

    <el-upload
      class="upload-demo"
      ref="upload"
      action="/lite-live-streaming-platform/fileUp"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
     
      :on-success="success"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
    // name:Postimage,
  data() {
    return {
      imageurl: "",
    };
  },
  methods: {
    //   success是上传成功时的勾子函数，res返回值data是服务器存储图片的路径
    success(res) {
      this.$message({
        type: "success",
        message: "上传成功!",
        
      });
      this.imageurl=res.data
       console.log(this.imageurl)
     
      console.log(res)
     
    

    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
  mounted() {},
};
</script>
<style  scoped="scoped">
#upimage{
    text-align: center;
    margin: 10px;
}

</style>