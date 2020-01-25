<template >
  <div style="text-align:center">
    <el-button
      style="width:40px;
            height:40px;
            margin:0;
            border:0;
            text-align:center"
      @click="dialogFormVisible = true"
      circle
    >
      <i class="el-icon-tickets"></i>
    </el-button>
    <el-dialog
      width="95%"
      class="app-container"
      title="Application"
      :visible.sync="dialogFormVisible"
    >
      <span></span>

      <ApplicationForm :poolevent="poolevent" />
    </el-dialog>
  </div>
</template>

<script>
import ApplicationForm from "./ApplicationForm";
export default {
  name: "ApplicationButton",
  components: { ApplicationForm },
  props: ["poolevent"],
  data() {
    return {
      dialogFormVisible: false
    };
  }
};
</script>

<style>
.app-container {
  margin: auto;
  width: 100%;
}

@media only screen and (min-width: 768px) {
  .app-container {
    margin: auto;
    width: 100%;
  }
}
</style>