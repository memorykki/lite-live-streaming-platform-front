<template>
   <!-- 定义表格组件 -->
   <div>
     <el-card>
       <el-table :data="tableData" stripe height="300" stripe style="width: 80%">
          <el-table-column
          label="序号"
               type="index"
               width="80">
             </el-table-column>
          <el-table-column prop="name" label="主播名称"></el-table-column>
          <el-table-column label="" width="130">
            <template slot-scope="scope">
              <el-tooltip content="取消关注" placement="bottom">
                <el-button size="mini" @click="remove()" type="warning" circle icon="el-icon-star-on">
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
     </el-card>
   </div>

</template>

<script>
  export default {
        data() {
          return {
            tableData: [{
              name: '王小虎',
            }, {
              name: '王小虎',
            }, {
              name: '王小虎',
            }, {
              name: '王小虎',
            }]
          }
        }
      }
</script>

<style>
</style>
