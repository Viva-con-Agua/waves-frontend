<template>
  <div id="app">
    <div class="row mb-2"></div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <PoolFilterForm/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" v-bind:key="poolEvent.id" v-for="poolEvent in poolEvents">
        <PoolEventCard v-bind:poolEvent="poolEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import PoolEventCard from "../components/PoolEventCard";
import PoolFilterForm from "../components/PoolFilterForm";



export default {
  name: "PoolEvents",
  components: { PoolEventCard, PoolFilterForm },
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
