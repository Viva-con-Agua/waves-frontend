<template>
  <el-tabs v-model="activeName" style="width:50%;margin:auto;">
    <el-tab-pane label="Poolevents" name="poolevents"><MyPoolevents/></el-tab-pane>
    <el-tab-pane label="Favorites" name="favorites">
      <MyFavoritePoolevents />
    </el-tab-pane>
    <el-tab-pane label="Applications" name="applications">
      <MyApplications />
    </el-tab-pane>
    <el-tab-pane label="Achievements" name="achievements">
      <BadgeView></BadgeView>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import BadgeView from "../components/BadgeView";
import MyFavoritePoolevents from "../components/MyFavoritePoolevents";
import MyApplications from "../components/MyApplications";
import MyPoolevents from "../components/MyPoolEvents";


export default {
  name: "ProfileView",
  components: {
    BadgeView,
    MyFavoritePoolevents,
    MyApplications,
    MyPoolevents
  },
  data(){
    return{
      activeName: 'poolevents'
    }
  }
};
</script>

<style>
</style>