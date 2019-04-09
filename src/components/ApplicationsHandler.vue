<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox>
        <el-table :data="getApplications()" style="width: 100%">
          <el-table-column label="Check-Box" width="180">
            <template>
              <el-checkbox></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Date" width="120">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{scope.row.created}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Name" width="120">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>Name: {{ scope.row.userName }}</p>
                <p>Addr: adsad</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Age" width="50">
            <template slot-scope="scope">
              <p>{{scope.row.age}}</p>
            </template>
          </el-table-column>
          <el-table-column label="Message">
            <template slot-scope="scope" width="100">
              <p>{{scope.row.message}}</p>
            </template>
          </el-table-column>
          <el-table-column label="Operations">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.state!==states.ACCEPTED"
                size="mini"
                type="success"
                @click="acceptApplication"
              >accept</el-button>
              <el-button
                v-if="scope.row.state!==states.WAITING_LIST"
                size="mini"
                @click.prevent="setToWaitingList"
              >waiting list</el-button>
              <el-button
                v-if="scope.row.state!==states.REJECTED"
                size="mini"
                type="danger"
                @click.prevent="declineApplication"
              >reject</el-button>
            </template>
          </el-table-column>
        </el-table>
      </VcABox>
    </VcAColumn>
    <VcAColumn size="20%">
      <VcABox>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row)"
          >accept</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">waiting list</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">reject</el-button>
        </template>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { setTimeout } from "timers";

export default {
  name: "ApplicationsHandler",
  components: { VcAFrame, VcAColumn, VcABox },
  data() {
    return {
      states: {
        WAITING_LIST: "WAITING_LIST",
        ACCEPTED: "ACCEPTED",
        REJECTED: "REJECTED"
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.$route.params.id);
  },
  methods: {
    getApplications(){
        return this.$store.getters.getPoolEvent.applications
    },
    acceptApplication() {
      alert("accept");
    },
    declineApplication() {
      alert("decline");
    },
    setToWaitingList() {
      alert("wait");
    }
  }
};
</script>

<style>
</style>
