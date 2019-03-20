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
import actions_json from "../../testdata/data.json";
import ActionFilter from "../components/ActionFilter";

export default {
  name: "Actions",
  components: { Action, ActionFilter },
  data() {
    return actions_json;
  }
};
</script>
<style>
.row {
  margin: 10px;
}
</style>
