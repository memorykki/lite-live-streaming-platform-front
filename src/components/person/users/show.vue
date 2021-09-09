<template>
  <el-card class="box-card">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="您的电话">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="主播类型">
              <el-select v-model="form.class" placeholder="请选择主播类别">
                <el-option label="类型一" value="shanghai"></el-option>
                <el-option label="类型二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="加入公会">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item> -->
            <el-form-item label="直播主题">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食" name="type"></el-checkbox>
                <el-checkbox label="LOL" name="type"></el-checkbox>
                <el-checkbox label="旅游" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="申请说明">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即申请</el-button>
            </el-form-item>
          </el-form>
      </el-card>
</template>

<script>
   export default {
      data() {
        return {
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style>
</style>
