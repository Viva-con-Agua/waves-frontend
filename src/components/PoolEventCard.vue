<template>
  <div >
    <div
      class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
    >
      <div class="col p-4 d-flex flex-column position-static">
        <a v-bind:href="url">
          <strong class="d-inline-block mb-2 text-primary">{{poolEvent.title}}</strong>
        </a>
        <div class="mb-1 text-muted">
          <i class="el-icon-date"></i>
          {{getStart}} - {{getEnd}}
        </div>
        <div class="mb-1 text-muted">
          <i class="el-icon-time"></i>
          {{getApplicationStart}} - {{getApplicationEnd}}
        </div>
        <i class="el-icon-location"> {{address}}</i>
      </div>
      <div class="col-auto d-none d-lg-block">
        <img  :src="icons.festival" width="100%" heigh t="100%">
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
    },
    address() {
      return (
        this.poolEvent.address.route +
        " " +
        this.poolEvent.address.street_number +
        "," +
        this.poolEvent.address.postal_code +
        " " +
        this.poolEvent.address.locality
      );
    },
    getStart(){
        let date = new Date(this.poolEvent.start);
        return  date.toLocaleTimeString() +", "+ date.toDateString();
    },
    getEnd(){
        let date = new Date(this.poolEvent.end);
        return  date.toLocaleTimeString() +", "+ date.toDateString();
    },
    getApplicationStart(){
        let date = new Date(this.poolEvent.applicationStart);
        return  date.toLocaleTimeString() +", "+ date.toDateString();
    },
    getApplicationEnd(){
        let date = new Date(this.poolEvent.applicationEnd);
        return  date.toLocaleTimeString() +", "+ date.toDateString();
    } 
  }
};
</script>

<style>
.card{
  margin: 10px
}
</style>
