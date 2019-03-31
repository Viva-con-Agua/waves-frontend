<template>
  <div id="app">
    
    <div class="row">
      <div class="col-md-6" v-bind:key="poolEvent.id" v-for="poolEvent in poolEvents">
        <PoolEventCard v-bind:poolEvent="poolEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import PoolEventCard from "../components/PoolEventCard";

export default {
  name: "PoolEvents",
  components: { PoolEventCard },
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
