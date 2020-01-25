<template>
  <el-card style="width:100%" :body-style="{ paddingTop: '10px' }">
    <div slot="header">
      <el-row>
        <el-col :span="getRoles=='admin'?14:17">
          <a :href="`/waves/poolevent/${poolEvent.id}`" style="text-decoration:none;color:black">
            <span>{{poolEvent.name}}</span>
          </a>
        </el-col>

        <el-col :span="7">
          <span style="color:grey;float:right">{{poolEvent.type_name}}</span>
        </el-col>
        <el-col v-if="getRoles=='admin'" :span="3">
          <el-tag
            :type="poolEvent.state=='RELEASED'?'success':poolEvent.state=='UNRELEASED'?'primary':'danger'"
            size="mini"
          >{{poolEvent.state}}</el-tag>
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
      <el-col :span="22">
        {{new Date(poolEvent.event_start).getDate()}}. {{new Date(poolEvent.event_start).toLocaleString("default", { month: "short" })}}
        {{new Date(poolEvent.event_start).getFullYear()}}
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col style="text-align:center" :span="5">
        <el-button
          v-if="getRoles=='admin'"
          style="margin-top:5px;
                width:40px;
                height:40px;
                margin:auto;
                border:0
                text-align:center"
          @click="()=> this.$router.push(`/waves/applications/${this.$route.params.id}`)"
          circle
        >
          <i class="el-icon-circle-plus"></i>
        </el-button>
      </el-col>
      <el-col style="text-align:center" :span="5">
        <ApplicationButton
          :poolevent="poolEvent"
          style="width:40px;margin:0;border:0;text-align:center;margin:auto"
        />
      </el-col>
      <el-col style="text-align:center" :span="5">
        <SharingButton
          :location="`https://localhost${this.$router.history.current.path}`"
          style="width:40px;margin:0;border:0;text-align:center;margin:auto"
        />
      </el-col>
      <el-col style="text-align:center" :span="5">
        <el-button style="border:0;width:40px;height:40px;margin:0;margin:auto;padding:0px" circle>
          <i
            :v-model="favorite.poolevent_id=poolEvent.id"
            @click="setFavorite"
            style="width:100%;float:right;margin:0;padding:0"
            class="el-icon-star-on"
          />
        </el-button>
      </el-col>
      <el-col style="text-align:center" v-if="getRoles=='admin'" :span="4">
        <PooleventDropdown :poolevent="poolEvent" style="margin-top:0;padding-top:0;" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import PooleventDropdown from "./PooleventDropdown";
import SharingButton from "./SharingButton";

import ApplicationButton from "./ApplicationButton";
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "PoolEventCard",
  components: {
    ApplicationButton,
    SharingButton,
    PooleventDropdown
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
      await Axios.post("/waves/api/v1/favorite", this.favorite, config);
    },
    submitForm() {
      this.$store.dispatch("APPLY", {
        application: this.application,
        poolEventId: this.poolEvent.id
      });
    }
  },
  computed: {
    ...mapGetters(["getRoles"]),
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
