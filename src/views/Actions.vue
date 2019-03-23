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
      <div class="col-md-6" v-bind:key="action.id" v-for="action in actions">
        <Action v-bind:action="action"/>
      </div>
    </div>
    
  </div>


</template>

<script>
import Action from "../components/Action";
import ActionFilter from "../components/ActionFilter";
import {mapGetters}  from "vuex"
export default {
  name: "Actions",
  components: { Action, ActionFilter },
  computed: {
    ...mapGetters({
    actions : 'getAllPoolEvents'
  })
  }
};
</script>
<style>
.row {
  margin: 10px;
}
</style>
