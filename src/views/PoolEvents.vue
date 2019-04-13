<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox title="Pool-Events">
        <div class="row">
          <div class="col-md-6" v-bind:key="poolEvent.id" v-for="poolEvent in poolEvents">
            <PoolEventCard v-bind:poolEvent="poolEvent"/>
          </div>
        </div>
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <Pagination/>
          </el-col>
        </el-row>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-button type="success" @click="createNewPoolEvent">
          <i class="el-icon-circle-plus"></i> add event
        </el-button>
        <el-button  >
           my pool-events
        </el-button>
        <el-button  >
          my applications
        </el-button>
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
