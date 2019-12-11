<template>
  <VcAFrame>
    <VcAColumn style="margin-top:20px;" size="10%">
      <h4 style="color:grey">Support Needed</h4>
    </VcAColumn>
    <VcAColumn style="margin-top:20px;" size="40%">
      <el-row >
        <PoolEventFilter/>
      </el-row>
      <el-row v-if="!poolEvents" style="margin-top:50%;">
        <rotate-square2 style="margin:auto;"></rotate-square2>
      </el-row>
      <el-row style="margin-top:1%;">
        <el-col :span="24" v-for="poolEvent in poolEvents" :key="poolEvent.id">
          <PoolEventCard :poolEvent="poolEvent" />
        </el-col>
      </el-row>
    </VcAColumn>
    <VcAColumn style="margin-top:20px;" size="20%">
      <h4 style="color:grey">Recomanded Poolevents</h4>
    </VcAColumn>
  </VcAFrame>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import PoolEventFilter from "../components/PoolEventFilter";
import PoolEventCard from "../components/PoolEventCard";
import MyPoolEvents from "../components/MyPoolEvents";
import Pagination from "../components/Pagination";
import {
  Input,
  Form,
  Container,
  Card,
  Dropdown,
  DropdownItem
} from "element-ui";
import { RotateSquare2 } from "vue-loading-spinner";

export default {
  name: "PoolEventsView",
  components: {
    RotateSquare2,
    PoolEventCard,
    VcAFrame,
    VcAColumn,
    VcABox,
    Pagination,
    PoolEventFilter,
    MyPoolEvents,
    Container,
    Card,
    Dropdown
  },
  computed: {
    poolEvents() {
      return this.$store.getters.getAllPoolEvents.data;
    }
  },
  data() {
    return {
      poolevents: this.$store.getters.getAllPoolEvents.data,
      loading: true,
      myPoolEventsFlag: false,
      poolEventsFlag: true,
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
      this.$store.dispatch("FETCH_MY_POOLEVENTS");
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

.el-button {
  margin-left: 0;
  margin-right: 0;
}
</style>
