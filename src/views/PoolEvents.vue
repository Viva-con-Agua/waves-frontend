<template>
  <VcAFrame>
    <VcAColumn style="margin-top:20px" size="50%">
      <el-row v-if="!poolEvents" style="margin-top:50%;">
        <rotate-square2 style="margin:auto;"></rotate-square2>
      </el-row>
      <el-row>
        <el-col :span="12" v-for="poolEvent in poolEvents" :key="poolEvent.id">
          <PoolEventCard :poolEvent="poolEvent" />
        </el-col>
      </el-row>
      <el-row v-if="myPoolEventsFlag">
        <MyPoolEvents :poolEvents="poolEvents" />
      </el-row>
    </VcAColumn>
    <VcAColumn size="20%">
      <VcABox style="padding:0px">
        <div style="padding:0px" slot="header">
          <img
            style="width:15%;
                  padding:0px;"
            alt="filter"
            src="https://cdn2.iconfinder.com/data/icons/photo-editor-user-interface-2/100/11-512.png"
          />
        </div>
        <el-col :span="24">
          <PoolEventFilter />
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
  name: "PoolEvents",
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
