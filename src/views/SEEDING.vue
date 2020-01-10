<template>
  <div>
    <el-row :span="24">
      <span>poolevents:</span>
      <el-input v-model="poolevents" :autosize="{ minRows: 2, maxRows: 100}" type="textarea"></el-input>
    </el-row>
    <el-row>
      <span>Achievements:</span>
      <el-input v-model="achievements" :autosize="{ minRows: 2, maxRows: 100}" type="textarea"></el-input>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "SEEDING",
  data() {
    return{
      poolevents: "",
      achievements: ""
    };
  }
};
</script>

<style>
</style>