<template>
  <div class="row">
    <div class="col-md-4">
      <DropDownFilter/>
    </div>
    <div class="col-md-4">
      <DropDownFilter/>
    </div>
    <div class="col-md-4">
      <DropDownFilter/>
    </div>
  </div>
</template>

<script>
import DropDownFilter from "./DropDownFilter";
export default {
  name: "ActionFilter",
  components: {
    DropDownFilter
  },
  date() {
    return {
      btn_name: {
        month: "month",
        region: "region",
        type: "type"
      }
    };
  }
};
</script>

<style>
.row {
  margin: 10 px;
}
</style>
