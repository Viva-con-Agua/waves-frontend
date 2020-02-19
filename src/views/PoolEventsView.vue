<template>
  <div class="p-container">
    <el-row>
      <el-col :xs="24" :lg="14" style="margin-top:16px;padding:5px;" size="600px">
        <el-row>
          <PoolEventFilter :roles="getRoles" />
        </el-row>
        <el-row v-if="!poolEvents" style="margin-top:50%;padding:10px;">
          <rotate-square2 style="margin:auto;"></rotate-square2>
        </el-row>
        <el-row style="margin-top:1%;">
          <el-col
            :span="24"
            style="margin-top:5px"
            v-for="poolEvent in poolEvents"
            :key="poolEvent.id"
          >
            <PoolEventCard :poolEvent="poolEvent" />
          </el-col>
        </el-row>
        <el-row style="margin:30px 0px 30px 0px;">
          <div style="margin-top:10%">
            <el-pagination
              style="text-align:center;"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="page"
              :page-sizes="pageSizes"
              :page-size="size"
              layout="sizes, prev, pager, next"
              :total="count"
            ></el-pagination>
          </div>
        </el-row>
      </el-col>
      <el-col class="most-faved" fixed :span="10" style="margin-top:20px;padding:5px" size="250px">
        <MostFavedPoolevents />
      </el-col>
    </el-row>s
  </div>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import PoolEventFilter from "../components/PoolEventFilter";
import PoolEventCard from "../components/PoolEventCard";
import MyPoolEvents from "../components/MyPoolEvents";
import Pagination from "../components/Pagination";
import MostFavedPoolevents from "../components/MostFavedPoolevents";
import { mapGetters, mapActions } from "vuex";
import { range } from "../helper";

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
    ...mapGetters(["getRoles", "getAllPoolEvents"]),
    poolEvents() {
      return this.$store.getters.getAllPoolEvents.data;
    },
    page() {
      return this.getAllPoolEvents.page;
    },
    size() {
      return this.getAllPoolEvents.size;
    },
    count() {
      return this.getAllPoolEvents.count;
    }
  },
  data() {
    return {
      poolevents: this.$store.getters.getAllPoolEvents.data,
      loading: true,
      myPoolEventsFlag: false,
      poolEventsFlag: true,
      myApplicationsFlag: false,
      pageSizes: [5, 10, 15, 20]
    };
  },
  mounted() {
    this.fetchPoolevents(0, 10);

    //this.pageSizes = range(5, this.getAllPoolEvents.count, 5);
  },
  methods: {
    ...mapActions({ pe: "LOAD_DATA" }),
    handleSizeChange(val) {
      this.fetchPoolevents(+0, val);
    },
    handleCurrentChange(val) {
      this.fetchPoolevents(+val - 1, 10);
    },
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
    },
    fetchPoolevents(page, limit) {
      this.pe({ page, limit });
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
