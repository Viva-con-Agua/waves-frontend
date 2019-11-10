<template>
  <VcAFrame>
    <VcAColumn size="65%">
      <VcABox title="Pool-Events" :expand="true">
        <el-row >
          <h v-if="loading">loading...</h>
          <el-col  :span="8" v-for="poolEvent in poolEvents" :key="poolEvent.id">
            <PoolEventCard v-if="poolEventsFlag && !loadding" :poolEvent="poolEvent"/>
          </el-col>
        </el-row>
        <el-row v-if="myPoolEventsFlag">
          <MyPoolEvents  :poolEvents="poolEvents"/>
        </el-row>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-col>
          <el-button class="vca-button-primary" type="success" @click="createNewPoolEvent">
            <i class="el-icon-circle-plus"></i> add event
          </el-button>
          <el-button class="vca-button-primary" @click="myPoolEventsButtonHandler">my poolevents</el-button>
          <el-button class="vca-button-primary" @click="myApplicationsButtonHandler">my applications</el-button>
        </el-col>
      </VcABox>
      <VcABox title="filter">
        <el-col :span="16" :offset="4">
          <PoolEventFilter/>
        </el-col>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import PoolEventFilter from "../components/PoolEventFilter";
import PoolEventCard from "../components/PoolEventCard";
import MyPoolEvents from "../components/MyPoolEvents";
import Pagination from "../components/Pagination";
import { Input, Form } from "element-ui";

export default {
  name: "PoolEvents",
  components: {
    PoolEventCard,
    VcAFrame,
    VcAColumn,
    VcABox,
    Pagination,
    PoolEventFilter,
    MyPoolEvents
  },
  computed: {
    poolEvents() {
      console.log(this.$store.getters.getAllPoolEvents.data); 
      return this.$store.getters.getAllPoolEvents.data;
    }
  },
  data() {
    return {
      loadding: false,
      myPoolEventsFlag: false,
      poolEventsFlag:true,
      myApplicationsFlag: false
    };
  },
  mounted() {
    this.$store.dispatch("LOAD_DATA");
  },
  methods: {
    editPoolEvent() {
      this.$router.push();
    },
    createNewPoolEvent() {
      this.$router.push("/waves/create");
    },
    myPoolEventsButtonHandler() {
      this.PoolEventsFlag = false;
      this.myApplicationsFlag = false;
      this.myPoolEventsFlag = true;
    },
    myApplicationsButtonHandler() {
      this.myPoolEventsFlag = false;
      this.PoolEventsFlag = false;
      this.myApplicationsFlag = true;
    }
  }
};
</script>
<style lang="less" scoped>
input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 95%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
#tag {
  float: left;
}
</style>
