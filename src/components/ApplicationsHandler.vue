<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <el-row style="margin-top:20px">
        <el-card
          :body-style="{ padding: '0px' }"
          style="padding:20px;margin:0;margin-bottom:5px"
          v-for="application in getApplications()"
          :key="application.id"
        >
          <el-col :span="3">
            <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png" />
          </el-col>
          <el-col :span="5">
            <span style="margin:20px;">{{`${application.first_name} ${application.last_name}`}}</span>
          </el-col>
          <el-col :span="10">
            <span>{{application.text}}</span>
          </el-col>
          <el-col :span="6">
            <el-col :span="12">
              <el-button
                v-if="application.state=='REJECTED'"
                @click="acceptApplication(application.application_id)"
                style="padding:5px;float:right"
                type="success"
              >accept</el-button>
            </el-col>
            <el-col :span="12">
              <el-button
                v-if="application.state=='ACCEPTED'"
                @click="rejectApplication(application.application_id)"
                style="padding:5px;float:right"
                type="danger"
              >reject</el-button>
            </el-col>
          </el-col>
        </el-card>
      </el-row>
    </VcAColumn>
  </VcAFrame>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
export default {
  name: "ApplicationsHandler",
  components: { VcAFrame, VcAColumn, VcABox },
  data() {
    return {
      states: {
        WAITING_LIST: "WAITING_LIST",
        ACCEPTED: "ACCEPTED",
        REJECTED: "REJECTED"
      },
      multipleSelection: [],
      loading: false
    };
  },
  mounted() {
    this.$store.dispatch("GET_APPLICATIONS", this.$route.params.id);
  },
  computed: {
    applications() {
      return this.$store.getters.getApplications;
    }
  },
  methods: {
    getApplications() {
      return this.$store.getters.getApplications;
    },
    getPoolEvent() {
      return this.$store.getters.getPoolEvent;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    acceptApplication(id) {
      this.$store.dispatch("ACCEPT_APPLICATION", id);
    },
    rejectApplication(id) {
      this.$store.dispatch("REJECT_APPLICATION", id);
    },
    setToWaitingList() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          this.$store.dispatch("SET_TO_APPLICATION_WAITINGLIST", application);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.vca-button-primary {
  background-color: #0a6b91;
  color: #ffffff;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.vca-button-warn {
  background-color: #d50000;
  color: #ffffff;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
