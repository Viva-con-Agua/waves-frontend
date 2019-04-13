<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox>
        <el-table
          ref="multipleTable"
          :data="applications"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="name" width="120">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column property="name" label="age" width="120">
            <template slot-scope="scope">{{ scope.row.age }}</template>
          </el-table-column>
          <el-table-column property="message" label="message" show-overflow-tooltip></el-table-column>
          <el-table-column property="state" label="state" show-overflow-tooltip></el-table-column>
        </el-table>
      </VcABox>
    </VcAColumn>
    <VcAColumn size="20%">
      <VcABox>
        <template>
          <el-button size="mini" type="success" @click="acceptApplication">accept</el-button>
          <el-button size="mini" @click="setToWaitingList">waiting list</el-button>
          <el-button size="mini" type="danger" @click="rejectApplication">reject</el-button>
        </template>
      </VcABox>
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
      multipleSelection: []
    };
  },
  mounted() {
    this.$store.dispatch("GET_APPLICATIONS", this.$route.params.id);
  },
  computed: {
    applications() {
      return this.$store.state.applications;
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
    getList(val) {
      console.log(val);
    },
    acceptApplication() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          this.$store.dispatch("ACCEPT_APPLICATIONS", application);
        });
      }
    },
    rejectApplication() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          this.$store.dispatch("REJECT_APPLICATIONS", application);
        });
      }
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

<style>
</style>
