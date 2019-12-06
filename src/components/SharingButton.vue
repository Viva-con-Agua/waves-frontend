<template>
  <div>
    <el-button
      style="width:40px;float:right;margin:0;border:0"
      @click="dialogFormVisible = true"
      circle
    >
      <i class="el-icon-share"></i>
    </el-button>

    <el-dialog width="30%" title="Share" :visible.sync="dialogFormVisible">
      <container style="margin:auto"> 
        <el-row>
          <el-col  :span="6">
            <facebook :url="location" scale="3"></facebook>
          </el-col>
          <el-col :span="6">
            <twitter :url="location" scale="3"></twitter>
          </el-col>
          <el-col :span="6">
            <linkedin :url="location" scale="3"></linkedin>
          </el-col>
          <el-col :span="6">
            <telegram :url="location" scale="3"></telegram>
          </el-col>
          
        </el-row>
        <el-row>
            <el-col :span="6">
            <whats-app :url="location" title="Hello" scale="3"></whats-app>
          </el-col>
          <el-col :span="6">
            <pinterest :url="location" scale="3"></pinterest>
          </el-col>
          <el-col :span="6">
            <reddit :url="location" scale="3" title="My Github"></reddit>
          </el-col>
          <el-col :span="6">
            <google :url="location" scale="3"></google>
          </el-col>
          <el-col :span="6">
            <email :url="location" subject="Hello" scale="3"></email>
          </el-col>
        </el-row>
      </container>
    </el-dialog>
  </div>
</template>

<script>
import {
  Facebook,
  Twitter,
  Linkedin,
  Pinterest,
  Reddit,
  Telegram,
  WhatsApp,
  Email,
  Google
} from "vue-socialmedia-share";
export default {
  name: "SharingButton",
  components: {
    Facebook,
    Twitter,
    Linkedin,
    Pinterest,
    Reddit,
    Telegram,
    WhatsApp,
    Email,
    Google
  },
  data() {
    return {
      dialogFormVisible: false
    };
  },
  props: ["location"]
};
</script>

<style>
</style>