<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox :title="$t('applicationHandler.applications')">
        <el-table
          v-loading="loading"
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
    <VcAColumn>
      <VcABox>
        <template>
          <el-button class="vca-button-primary" type="success" @click="acceptApplication">{{$t('applicationHandler.button.accept')}}</el-button>
          <el-button  class="vca-button-primary" @click="setToWaitingList">{{$t('applicationHandler.button.waitingList')}}</el-button>
          <el-button  class="vca-button-primary" type="danger" @click="rejectApplication">{{$t('applicationHandler.button.reject')}}</el-button>
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
      multipleSelection: [],
      loading : false
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

<style lang="less" scoped>
.vca-button-primary {
  background-color: #0a6b91;
  color: #FFFFFF;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
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
