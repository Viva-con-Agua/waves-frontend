<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox title="Pool-Events">
        <el-row>
          <el-col :span="6" v-for="poolEvent in poolEvents" :key="poolEvent.id" :offset="1">
            <PoolEventCard v-bind:poolEvent="poolEvent"/>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <Pagination/>
          </el-col>
        </el-row>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-button size="mini" type="success" @click="createNewPoolEvent">
          <i class="el-icon-circle-plus"></i> add event
        </el-button>
        <el-button size="mini">my pool-events</el-button>
        <el-button size="mini">my applications</el-button>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import PoolEventCard from "../components/PoolEventCard";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import Pagination from "../components/Pagination";

export default {
  name: "PoolEvents",
  components: { PoolEventCard, VcAFrame, VcAColumn, VcABox, Pagination },
  computed: {
    poolEvents() {
      return this.$store.getters.getAllPoolEvents;
    }
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
<style>
.row {
  margin: 10px;
}

.PoolEventCard {
  margin: 10px;
}
</style>
