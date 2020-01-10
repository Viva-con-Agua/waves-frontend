<template>
  <el-card style="margin:auto;width:90%">
    <el-col :span="3">
      <img
        :style="badge.completed==0? 'width:80px;opacity:0.1;' : 'opacity:1;filter;alpha(opacity=50);width:80px'"
        :src="badge.img_url ||'http://via.placeholder.com/100'"
        class="badge-img"
        disable
      />
    </el-col>
    <el-col :span="21">
      <ul class="badge-info-list">
        <li>{{badge.name}}</li>
        <li>
          <el-progress
            :status="badge.completed?'success':'primary'"
            :text-inside="true"
            :stroke-width="26"
            :percentage="Math.round(badge.completed?100:badge.progress/badge.points * 100)"
          />
        </li>
        <li>{{badge.completed===1?badge.message: badge.desc}}</li>
        <li>
          <span v-if="badge.completed" style="color:gray;">{{avg * 100}}% of supporters have this achievement</span>
        </li>
      </ul>
    </el-col>
  </el-card>
</template>

<script>
import Axios from "axios";
export default {
  name: "Badge",
  props: ["badge"],
  data() {
    return { avg: "" };
  },
  async mounted() {
    if (this.badge.completed) {
      const { data } = await Axios.get(
        `/waves/api/v1/achievement/avg/${this.badge.id}`
      );
      this.avg = data.average;
    }
  }
};
</script>

<style>
.el-row {
  width: 100%;
}

.el-card {
  width: 100%;
  padding: 0;
}

.el-col {
  padding: 0px;
}

.badge-img {
  margin: 5px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.badge-info-list {
  list-style-type: none;
}

.badge-info-list li {
  margin: 10px;
}
</style>