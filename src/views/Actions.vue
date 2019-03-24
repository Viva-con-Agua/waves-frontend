<template>
  <div id="app">
    <div class="row mb-2"></div>
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <ActionFilter/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6" v-bind:key="poolEvent.id" v-for="poolEvent in poolEvents">
        <Action v-bind:poolEvent ="poolEvent"/>
      </div>
    </div>
  </div>
</template>

<script>
import Action from "../components/Action";
import ActionFilter from "../components/ActionFilter";
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  name: "Actions",
  components: { Action, ActionFilter },
  computed: {
    poolEvents (){
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
