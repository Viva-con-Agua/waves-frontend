<template>
  <el-form  :model="application" ref="application" class="rows-container">
    <el-form-item label="message">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Please input message..."
        v-model="application.text"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        class="vca-button-primary"
        id="button"
        type="success"
        @click.prevent="submitApplication"
        style="margin-left:0px;margin-right:0px;"
      >apply</el-button>
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
    VcABox,
  },
  props: ["poolEvent", "currentUser"],
  data() {
    return {
      application: {
        text: "",
        user_id:1,
        poolevent_id: this.$route.params.id
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
      this.$store.dispatch("APPLY", 
        this.application
      );
      //this.applied = true;
    }
  }
};
</script>
<style>
.el-select {
  display: block;
}

.vca-button-primary {
  background-color: #0a6b91;
  color: #ffffff;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
</style>
