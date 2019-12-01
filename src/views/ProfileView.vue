<template>
  <div style="margin-top:3%">
    <el-row style="width:50%;margin:auto;padding:3%">
      <el-col :span="3">
        <img
          style="border-radius: 50%;margin:auto;"
          class="profile-img"
          src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
        />
      </el-col>
      <el-col :span="3" style="margin-top:3%;font-size:20px">
        <strong >{{this.$cookies.get('full_name')}}</strong>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" style="width:50%;margin:auto;">
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
</style>