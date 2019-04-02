<template>
  <div>
    <div
      class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <div class="col p-4 d-flex flex-column position-static">
        <a v-bind:href="url">
          <strong class="d-inline-block mb-2 text-primary">{{poolEvent.title}}</strong>
        </a>
        <div class="mb-1 text-muted">
          <i class="el-icon-date"></i>
          {{poolEvent.start}} - {{poolEvent.end}}
        </div>
        <div class="mb-1 text-muted">
          <i class="el-icon-time"></i>
          {{poolEvent.start}} - {{poolEvent.end}}
        </div>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img v-if="poolEvent.state==='festival'" :src="icons.festival" width="100%" heigh t="100%">
        <img v-if="poolEvent.state==='concert'" :src="icons.concert" width="100%" heigh t="100%">
        <img v-if="poolEvent.state==='others'" :src="icons.others" width="100%" heigh t="100%">
        <img
          v-if="poolEvent.state==='networkmeeting'"
          :src="icons.networkmeeting"
          width="100%"
          heigh
          t="100%"
        >
      </div>
    </div>
  </div>
</template>

<script>
import icons_ from "../assets/action_icons.json";
export default {
  name: "PoolEventCard",
  props: ["poolEvent"],
  data() {
    return {
      icons: icons_.data,
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: ""
    };
  },
  computed: {
    url() {
      return "/pooleventview/" + this.poolEvent.id;
    }
  }
};
</script>

<style>
</style>
