<template>
  <el-form :model="application" ref="application">
    <el-form-item>
      <el-input
        show-word-limit
        placeholder="Please input"
        v-model="application.text"
        maxlength="1000"
        :autosize="{minRows: 4, maxRows:10}"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click.prevent="submitApplication"
        style="width:100px;float:right"
      >APPLY</el-button>
      <el-button
        type="danger"
        @click.prevent="submitApplication"
        style="margin-left:5px;margin-right:5px;width:100px;float:right"
      >CANCEL</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
  name: "ApplicationForm",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox
  },
  props: ["poolevent_id"],
  data() {
    return {
      application: {
        text: "",
        poolevent_id: this.poolevent_id
      },
      applied: false,
      showApplicationForm: false
    };
  },
  methods: {
    showApplciationForm() {
      this.showApplicationForm = true;
    },
    submitApplication() {
      this.$store.dispatch("APPLY", {
        config: {
          headers: {
            Authorization: `bearer ${this.$cookies.get("access_token")}`
          }
        },
        application: this.application
      });
      //this.applied = true;
    }
  }
};
</script>
<style>
.el-select {
  display: block;
}

@media only screen and (min-width: 768px) {
  .app-container {
    margin: auto;
    width: 100%;
  }
  .app-btn {
    width: 10%;
  }
}

</style>
