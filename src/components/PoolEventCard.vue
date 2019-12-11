<template>
  <el-card style="width:95%" :body-style="{ paddingTop: '10px' }">
    <div slot="header">
      <el-row>
        <el-col :span="12">
          <a :href="`/waves/poolevent/${poolEvent.id}`" style="text-decoration : none;color:black">
            <p>{{poolEvent.name}}</p>
          </a>
        </el-col>
        <el-col :span="12">
          <p style="color:grey;float:right">{{poolEvent.type}}</p>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 10px;">
      <el-col :span="1">
        <i class="el-icon-time"></i>
      </el-col>
      <el-col :span="22">{{new Date(poolEvent.event_start).toLocaleString()}}</el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="1">
        <i class="el-icon-location-outline"></i>
      </el-col>
      <el-col
        :span="22"

      >{{`${poolEvent.street_name} ${poolEvent.street_number}, ${poolEvent.post_code} ${poolEvent.city}`}}</el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-button style="border:0;width:40px;height:40px;margin:0;float:right" circle>
        <i
          :v-model="favorite.poolevent_id=poolEvent.id"
          @click="setFavorite"
          style="float:right;margin:0"
          class="el-icon-star-off"
        />
      </el-button>
      <ApplicationButton style="float:right" :poolevent="poolEvent" />
    </el-row>
  </el-card>
</template>

<script>
import ApplicationForm from "./ApplicationForm";
import icons_ from "../assets/poolEventIcons.json";
import ApplicationButton from "./ApplicationButton";
import { Icon } from "element-ui";
import Axios from "axios";

export default {
  name: "PoolEventCard",
  components: {
    ApplicationForm,
    ApplicationButton
  },
  props: ["poolEvent"],
  data() {
    return {
      favorite: {
        poolevent_id: ""
      },
      application: {
        user_id: 1,
        text: ""
      },
      icons: icons_.data,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      daysGer: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      monthsGer: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ]
    };
  },
  methods: {
    async setFavorite() {
      const config = {
        headers: {
          Authorization: `bearer ${this.$cookies.get("access_token")}`
        }
      };
      const { data } = await Axios.post(
        "/waves/api/v1/favorite",
        this.favorite,
        config
      );
    },
    submitForm() {
      this.$store.dispatch("APPLY", {
        application: this.application,
        poolEventId: this.poolEvent.id
      });
    }
  },
  computed: {
    getStart() {
      let date = new Date(this.poolEvent.start);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getEnd() {
      let date = new Date(this.poolEvent.end);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getApplicationStart() {
      let date = new Date(this.poolEvent.start);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getApplicationEnd() {
      let date = new Date(this.poolEvent.end);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
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
.location {
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
  margin-top: 5px;
  margin-left: -5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
#card {
  margin: 10px;
}

.card-expansion {
  height: auto;
}

.md-card {
  width: 95%;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
}

.input-text-area {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  height: 100px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.md-body {
  margin-top: 15px;
}

.card-event {
  border-radius: 2%;
}

.el-icon-star-off:hover {
  color: #ffd700;
}
</style>
