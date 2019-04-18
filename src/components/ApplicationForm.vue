<template>
  <el-form :model="poolEvent" ref="poolEvent" class="rows-container">
    <el-col>
      <el-form-item 
      v-if="showApplicationForm">
        <el-input 
          v-if="showApplicationForm"
          type="textarea"
          :rows="4"
          placeholder="Please input message..."
          v-model="application.message"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
        id="button"
          size="mini"
          type="success"
          v-if="showApplicationForm"
          @click.prevent="submitApplication"
          style="width:100%"
        >submit</el-button>
        <el-button
          size="mini"
          type="success"
          v-if="!showApplicationForm"
          @click.prevent="showApplciationForm"
          style="width:100%"
        >apply</el-button>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
import { Input, Form } from "element-ui";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
  name: "ApplicationForm",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox
  },
  props: ["poolEvent"],
  data() {
    return {
      application: {
        userName: "user",
        age: "18",
        message: "",
        created: new Date(),
        state: "WAITING_LIST"
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
        poolEventId: this.poolEvent.id,
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
</style>
