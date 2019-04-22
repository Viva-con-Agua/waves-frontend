<template>
  <VcAFrame>
    <VcAColumn height="100%" size="60%">
      <VcABox title="Pool-Events" :v-loading="loading">
        <el-row>
          <el-col :span="8" v-for="poolEvent in poolEvents" :key="poolEvent.id">
            <PoolEventCard v-bind:poolEvent="poolEvent"/>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <Pagination/>
          </el-col>
        </el-row>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-col>
          <el-button class="vca-button-primary" type="success" @click="createNewPoolEvent">
            <i class="el-icon-circle-plus"></i> add event
          </el-button>
          <el-button class="vca-button-primary">my pool-events</el-button>
          <el-button class="vca-button-primary">my applications</el-button>
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
import PoolEventCard from "../components/PoolEventCard";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import Pagination from "../components/Pagination";
import PoolEventFilter from "../components/PoolEventFilter";

export default {
  name: "PoolEvents",
  components: {
    PoolEventCard,
    VcAFrame,
    VcAColumn,
    VcABox,
    Pagination,
    PoolEventFilter
  },
  computed: {
    poolEvents() {
      return this.$store.getters.getAllPoolEvents;
    }
  },
  data() {
    return {
      loadding: false
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
      this.$router.push("/pooleventform");
    }
  }
};
</script>
<style lang="less" scoped>
.row {
  margin: 10px;
}

.PoolEventCard {
  margin: 10px;
}
input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
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

.vca-button-primary {
  background-color: #0a6b91;
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
