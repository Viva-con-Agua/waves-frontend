<template>
<div  class="p-container" style="margin-top:3%">
    <el-row  style="margin:auto;padding:3%">
      <el-col :span="6">
        <img
          style="border-radius: 50%;margin:auto;"
          class="profile-img"
          :src="`https://eu.ui-avatars.com/api/?rounded=true&name=${this.$cookies.get('first_name')}+${this.$cookies.get('last_name')}`"
        />
      </el-col>
      <el-col style="margin-top:8px" :span="14">
        <el-row>
          <strong style="margin-top:3%;font-size:20px">{{this.$cookies.get('full_name')}}</strong>
        </el-row>
        <el-row>
          <span style="color:gray">Supporter since 200 days</span>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" style="margin:auto;">
        <el-tab-pane label="Poolevents" name="poolevents">
          <MyPoolevents />
        </el-tab-pane>
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
    </el-row>
  </div>
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
  data() {
    return {
      activeName: "poolevents"
    };
  }
};
</script>

<style>
.p-container {
  margin: auto;
  width: 100%;
}
@media only screen and (min-width: 768px) {
  .p-container {
    margin: auto;
    width: 40%;
  }
}
</style>