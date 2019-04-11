<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox>
        <el-table
          ref="multipleTable"
          :data="getApplications()"
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
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.$route.params.id);
  },
  methods: {
    getApplications() {
      return this.$store.getters.getPoolEvent.applications;
    },
    getPoolEvent() {
      return this.$store.getters.getPoolEvent;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    acceptApplication() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          application.state = this.states.ACCEPTED;
        });
      }
    },
    rejectApplication() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          application.state = this.states.REJECTED;
        });
      }
    },
    setToWaitingList() {
      if (this.multipleSelection) {
        this.multipleSelection.forEach(application => {
          application.state = this.states.WAITING_LIST;
        });
      }
    }
  }
};
</script>

<style>
</style>
