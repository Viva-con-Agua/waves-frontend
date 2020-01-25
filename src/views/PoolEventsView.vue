<template>
  <div class="p-container">
    <el-row>
      <el-col :xs="24" :lg="14" style="margin-top:20px;padding:5px;" size="600px">
        <el-row>
          <PoolEventFilter :roles="getRoles" />
        </el-row>
        <el-row v-if="!poolEvents" style="margin-top:50%;padding:10px;">
          <rotate-square2 style="margin:auto;"></rotate-square2>
        </el-row>
        <el-row style="margin-top:1%;">
          <el-col :span="24" v-for="poolEvent in poolEvents" :key="poolEvent.id">
            <PoolEventCard :poolEvent="poolEvent" />
          </el-col>
        </el-row>
      </el-col>
      <el-col class="most-faved" fixed :span="10" style="margin-top:20px;padding:5px" size="250px">
        <MostFavedPoolevents />
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import PoolEventFilter from "../components/PoolEventFilter";
import PoolEventCard from "../components/PoolEventCard";
import MyPoolEvents from "../components/MyPoolEvents";
import Pagination from "../components/Pagination";
import MostFavedPoolevents from "../components/MostFavedPoolevents";
import { mapGetters } from "vuex";

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
    MostFavedPoolevents,
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
    ...mapGetters(["getRoles"]),
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

.most-faved {
  display: none;
}
.p-container {
  margin: auto;
  width: 100%;
}
@media only screen and (min-width: 768px) {
  .most-faved {
    display: block;
  }
  .p-container {
    margin: auto;
    width: 60%;
  }
}
</style>
