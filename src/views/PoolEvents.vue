<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox>
        <div class="row">
          <div class="col-md-6" v-bind:key="poolEvent.id" v-for="poolEvent in poolEvents">
            <PoolEventCard v-bind:poolEvent="poolEvent"/>
          </div>
        </div>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import PoolEventCard from "../components/PoolEventCard";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";

export default {
  name: "PoolEvents",
  components: { PoolEventCard, VcAFrame, VcAColumn, VcABox },
  computed: {
    poolEvents() {
      return this.$store.getters.getAllPoolEvents;
    }
  },
  mounted() {
    this.$store.dispatch("LOAD_DATA");
  }
};
</script>
<style>
.row {
  margin: 10px;
}
</style>
