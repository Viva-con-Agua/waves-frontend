<template>
  <div >
    <el-col v-for="poolevent in favorites" :key="poolevent.id" :span="11">
      <el-card
        :body-style="{ padding: '0px' }"
        style="padding:20px;
      margin:auto;
      margin-bottom:5px;width:80%"
      >
        <el-row>
          <strong>
            <a :href="`/waves/poolevent/${poolevent.id}`">{{poolevent.name}}</a>
          </strong>
          <el-tag
            style="padding:0;float:right;"
            :type="poolevent.state=='UNRELEASED'?'warning'
              :poolevent.state=='RELEASED'?'success':'danger'"
            size="mini"
          >{{poolevent.state}}</el-tag>
        </el-row>
        <el-row style="margin-top:15px">
          <ul class="event-start-end">
            <li>
              <i class="el-icon-time"></i>
            </li>
            <li>{{`${new Date(poolevent.event_start).toLocaleString()}` }}</li>
          </ul>
        </el-row>
        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-location-outline"></i>
            </li>
            <li></li>
          </ul>
        </el-row>
        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-loading"></i>
            </li>
            <li>
              <a :href="poolevent.website"></a>
              {{ poolevent.website}}
            </li>
          </ul>
        </el-row>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "MyFavoritePoolevents",
  data() {
    return {
      favorites: []
    };
  },
  async mounted() {
    const config = {
      headers: {
        Authorization: `bearer ${this.$cookies.get("access_token")}`
      }
    };
    const { data } = await Axios.get("/waves/api/v1/favorite/1", config);
    this.favorites = data.data;
  }
};
</script>

<style>
</style>