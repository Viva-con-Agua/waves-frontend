<template>
  <el-container>
    <el-row>
      <p style="margin-left:40px">learn more about Achievements <a href="/waves/wiki/badges">here</a></p>
      <el-col :span="24" :v-if="badges.length>0" v-for="badge in badges" :key="badge.id">
        <Badge style="margin-top:5px" :badge="badge"></Badge>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import axios from "axios";
import Badge from "./Badge";
export default {
  name: "BadgeView",
  components: {
    Badge
  },
  data() {
    return {
      badges: ""
    };
  },
  methods: {
    async getAllBadges() {
      const config = {
        headers: {
          Authorization: `bearer ${this.$cookies.get("access_token")}`
        }
      };
      const { data } = await axios.get("/waves/api/v1/badge/user/1", config);
      this.badges = data.data;
    }
  },
  async mounted() {
    this.getAllBadges();
  }
};
</script>

<style>
.el-container {
  width: 100%;
  margin: auto;
}
</style>