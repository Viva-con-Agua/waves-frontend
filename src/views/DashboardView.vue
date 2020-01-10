<template>
  <div style="margin:auto">
    <el-col :span="20">
      <el-input v-model="pe_type" placeholder="input new poolevent type"></el-input>
    </el-col>
    <el-col :span="4">
      <el-button @click="submit">CREATE</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "DaschboardView",
  data(){
      return {
          pe_type:""
      }
  },
  methods:{
      submit(){
          console.log(this.pe_type);
      }
  }
};
</script>

<style>
</style>