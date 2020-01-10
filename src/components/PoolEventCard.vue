<template>
  <el-card style="width:100%" :body-style="{ paddingTop: '10px' }">
    <div slot="header">
      <el-row>
        <el-col :span="16">
          <a :href="`/waves/poolevent/${poolEvent.id}`" style="text-decoration:none;color:black">
            <span>{{poolEvent.name}}</span>
          </a>
        </el-col>
        <el-col :span="8">
          <span style="color:grey;float:right">{{poolEvent.type}}</span>
        </el-col>
      </el-row>
    </div>
    <el-row style="margin-top: 10px;">
      <el-col :span="1">
        <i class="el-icon-location-outline"></i>
      </el-col>
      <el-col
        :span="22"
      >{{`${poolEvent.route} ${poolEvent.street_number}, ${poolEvent.postal_code} ${poolEvent.locality}`}}</el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="1">
        <i class="el-icon-time"></i>
      </el-col>
      <el-col
        :span="22"
      >{{`${new Date(poolEvent.event_start).getUTCHours()}:${new Date(poolEvent.event_start).getUTCMinutes()}h`}} - {{`${new Date(poolEvent.event_end).getUTCHours()}:${new Date(poolEvent.event_end).getUTCMinutes()}h`}}</el-col>
    </el-row>
    <el-row style="margin-top: 10px;">
      <el-col :span="1">
        <i class="el-icon-date"></i>
      </el-col>
      <el-col
        :span="22"
      >
      {{new Date(poolEvent.event_start).getDate()}}. {{new Date(poolEvent.event_start).toLocaleString("default", { month: "short" })}}
      {{new Date(poolEvent.event_start).getFullYear()}}
      </el-col>
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
import ApplicationButton from "./ApplicationButton";
import Axios from "axios";

export default {
  name: "PoolEventCard",
  components: {
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
      await Axios.post(
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


.card-event {
  border-radius: 2%;
}


</style>
