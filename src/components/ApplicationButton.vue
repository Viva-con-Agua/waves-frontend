<template>
  <div>
    <el-button
      style="width:40px;float:right;margin:0;border:0"
      @click="dialogFormVisible = true"
      circle
    >
      <i class="el-icon-tickets"></i>
    </el-button>
    <el-dialog width="30%" title="Application" :visible.sync="dialogFormVisible">
        <ApplicationForm :poolevent="poolevent"/>
    </el-dialog >
  </div>
</template>

<script>
import ApplicationForm from "./ApplicationForm";
export default {
  name: "ApplicationButton",
  components: { ApplicationForm },
  props:['poolevent'],
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style>
</style>