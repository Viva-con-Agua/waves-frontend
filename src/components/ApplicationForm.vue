<template>
  <VcABox v-if="!applied" :first="false" title="Apply as supporter">
    <el-form
      label-position="left"
      label-width="140px"
      :model="poolEvent"
      ref="poolEvent"
      class="rows-container"
    >
      <el-form-item label="User">
        <el-input v-model="application.userName"></el-input>
      </el-form-item>
      <el-form-item label="Message">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Please input"
          v-model="application.message"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click.prevent="submitApplication" style="width:100px">Apply</el-button>
      </el-form-item>
    </el-form>
  </VcABox>
</template>
<script>
import { Input, Form } from "element-ui";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { constants } from "crypto";
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
        userName: "",
        age : "18",
        message: "",
        created: new Date(),
        state : "WAITING_LIST"
      },
      applied: false
    };
  },
  methods: {
    submitApplication() {
      let poolEvent = this.$props.poolEvent;
      poolEvent.applications.push(this.application);
      console.log(this.application);
      this.$store.dispatch("APPLY", poolEvent);
      this.applied = true;
    }
  }
};
</script>
<style>
</style>
