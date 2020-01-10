<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <el-row style="margin-top:20px;width:100%">
        <strong>
          <span>Respond to Your {{applications.length}} Application Requests</span>
        </strong>
        <el-button
          @click="acceptApplication"
          type="success"
          size="mini"
          style="width:100px;float:right;margin:0"
          
        >ACCEPT</el-button>
        <el-button
          @click="rejectApplication"
          type="danger"
          size="mini"
          style="width:100px;float:right;margin-right:10px;"
        >REJECT</el-button>
        <el-button
          v-if="!selected"
          @click="selectAll"
          type="primary"
          size="mini"
          style="width:100px;float:right;"
        >SELECT ALL</el-button>
        <el-button
          v-else
          @click="unselectAll"
          type="primary"
          size="mini"
          style="width:100px;float:right;"
        >UNSELECT</el-button>

        <el-row
          style="margin-top:20px"
          v-for="application in getApplications()"
          :key="application.id"
        >
          <ApplicationCard :list="list" :selected="selected" :application="application" />
        </el-row>
      </el-row>
    </VcAColumn>
  </VcAFrame>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import ApplicationCard from "./ApplicationCard";

export default {
  name: "ApplicationsHandler",
  components: { VcAFrame, VcAColumn, VcABox, ApplicationCard },
  data() {
    return {
      selected: false,
      list: [],
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
      this.list.map(id => {
        this.$store.dispatch("ACCEPT_APPLICATION", id);
      });
    },
    rejectApplication(id) {
      this.list.map(id => {
        this.$store.dispatch("REJECT_APPLICATION", id);
      });
    },
    setToWaitingList() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          this.$store.dispatch("SET_TO_APPLICATION_WAITINGLIST", application);
        });
      }
    },

    selectAll() {
      this.selected = true;
      this.list = [];
      this.applications.map(application => {
        this.list.push(application.application_id);
      });
    },
    unselectAll() {
      this.selected = false;
      this.list = [];
    }
  }
};
</script>

<style lang="less" scoped>
</style>
