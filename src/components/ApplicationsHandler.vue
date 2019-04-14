<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox :title="$t('applicationHandler.applications')">
        <el-table
          ref="multipleTable"
          :data="getApplications()"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column :label="$t('applicationHandler.name')" width="120">
            <template slot-scope="scope">{{ scope.row.userName }}</template>
          </el-table-column>
          <el-table-column property="age" :label="$t('applicationHandler.age')" width="120">
            <template slot-scope="scope">{{ scope.row.age }}</template>
          </el-table-column>
          <el-table-column property="message" :label="$t('applicationHandler.message')" show-overflow-tooltip></el-table-column>
          <el-table-column property="state" :label="$t('applicationHandler.state')" show-overflow-tooltip></el-table-column>
        </el-table>
      </VcABox>
    </VcAColumn>
    <VcAColumn size="20%">
      <VcABox>
        <template>
          <el-button size="mini" type="success" @click="acceptApplication">{{$t('applicationHandler.button.accept')}}</el-button>
          <el-button size="mini" @click="setToWaitingList">{{$t('applicationHandler.button.waitingList')}}</el-button>
          <el-button size="mini" type="danger" @click="rejectApplication">{{$t('applicationHandler.button.reject')}}</el-button>
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
      return this.$store.getters.getApplications
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
