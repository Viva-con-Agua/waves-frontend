<template>
  <el-card :body-style="{ padding: '0px' }">
    <el-col :span="16">
      <div style="padding: 14px;">
        <a :href="url">
          <span>{{poolEvent.title}}</span>
        </a>
        <div class="bottom clearfix">
          <time class="time">
            <i class="el-icon-time"></i>
            {{ getStartTime }}
          </time>
        </div>
        <div class="bottom clearfix">
          <date class="date">
            <i class="el-icon-date"></i>
            {{ getStartDate }}
          </date>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <img v-if="poolEvent.type === 'festival'" :src="icons.festival" class="image">
      <img v-if="poolEvent.type === 'others'" :src="icons.others" class="image">
      <img v-if="poolEvent.type === 'concert'" :src="icons.concert" class="image">
      <img v-if="poolEvent.type === 'networkmeeting'" :src="icons.networkmeeting" class="image">
    </el-col>
  </el-card>
</template>

<script>
import icons_ from "../assets/poolEventIcons.json";
export default {
  name: "PoolEventCard",
  props: ["poolEvent"],
  data() {
    return {
      icons: icons_.data,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: ""
    };
  },
  computed: {
    url() {
      return "/poolevent/" + this.poolEvent.id;
    },
    address() {
      return (
        this.poolEvent.address.route +
        " " +
        this.poolEvent.address.street_number +
        "," +
        this.poolEvent.address.postal_code +
        " " +
        this.poolEvent.address.locality
      );
    },
    getStartTime() {
      let date = new Date(this.poolEvent.start);
      return date.toLocaleTimeString();
    },
    getStartDate() {
      let date = new Date(this.poolEvent.start);
      return date.toDateString();
    }
  }
};
</script>

<style>
.card {
  margin: 10px;
}
.time {
  font-size: 13px;
  color: #999;
}
.date {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
