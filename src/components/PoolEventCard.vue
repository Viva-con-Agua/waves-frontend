<template>
  <el-col>
    <div class="card-expansion">
      <md-card>
        <md-card-header>
          <a :href="url" style="text-decoration : none">
            <div class="md-title">{{poolEvent.title}}</div>
          </a>
          <div class="md-subhead">{{poolEvent.type}}</div>
          <div class="md-body">
            <span>
              <i class="el-icon-time"></i>
              {{getStart}} bis {{getEnd}}
            </span>
          </div>
          <div class="md-body">
            <span>
              <i class="el-icon-location-outline"></i>
              {{address}}
            </span>
          </div>
          <div class="md-body">
            <span style="margin-left:18px">Noch 42 Plätze frei</span>
          </div>
        </md-card-header>
        <md-card-expand>
          <md-card-actions md-alignment="space-between">
            <div></div>
            <md-card-expand-trigger>
              <md-button class="md-icon-button">
                <i class="el-icon-arrow-up"></i>
              </md-button>
            </md-card-expand-trigger>
          </md-card-actions>
          <md-card-expand-content>
            <md-card-content>
              <span>Bewerbung möglich bis {{getApplicationEnd}}</span>
                <el-form :model="application">
                  <el-form-item label="message">
                <textarea class="input-text-area" v-model="application.message"  placeholder="send message to asp... " ></textarea>
                  </el-form-item>
                <el-button  style="width: 94%" class="vca-button-primary" @click.prevent="submitForm">apply</el-button>
              </el-form>
            </md-card-content>
          </md-card-expand-content>
        </md-card-expand>
      </md-card>
    </div>
  </el-col>
</template>

<script>
import ApplicationForm from "./ApplicationForm";
import icons_ from "../assets/poolEventIcons.json";
export default {
  name: "PoolEventCard",
  components: {
    ApplicationForm
  },
  props: ["poolEvent"],
  data() {
    return {
      application: {
        userName: "user",
        age: "18",
        message: "",
        created: new Date(),
        state: "WAITING_LIST"
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
  methods : {
    submitForm(){
      this.$store.dispatch('APPLY', {
        application:this.application,
        poolEventId : this.poolEvent.id
      } )
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

.md-body{
  margin-top:15px
}

</style>
