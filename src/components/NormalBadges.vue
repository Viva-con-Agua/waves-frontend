<template>
  <div>
      <h3>Onboarding Badges</h3>
    <el-row :gutter="20" style="margin-top:20px" v-for="badge in badges" :key="badge.id">
      <el-col :span="2">
        <img :src="badge.img_url" alt=""  style="width:60px"/>
      </el-col>
      <el-col justify="center" :span="4" :offset="1">
        <span>{{badge.name}}</span>
      </el-col>
      <el-col :span="12"><span>{{badge.desc}}</span></el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NormaleBadges",
  props: ["badges"],
  data() {
    return {
      config: ""
    };
  }
};
</script>

<style>
</style>