<template>
  <Form v-if="!applied" :model="poolEvent" ref="poolEvent" class="rows-container">
      <FormItem label="message">
        <el-input
          type="textarea"
          :rows="4"
          placeholder="Please input message..."
          v-model="application.message"
        ></el-input>
      </FormItem>
      <FormItem>
        <el-button
          class="vca-button-primary"
          id="button"
          type="success"
          @click.prevent="submitApplication"
          style="width:100%"
        >apply</el-button>
      </FormItem>
  </Form>
</template>
<script>
import { Input, FormItem } from "element-ui";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
  name: "ApplicationForm",
  components: {
    VcAFrame,
    VcAColumn,
    VcABox
  },
  props: ["poolEvent","currentUser"],
  data() {
    return {
      application: {
        creator : {
          userName : ""
        },
        message: "",
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
      console.log(this.currentUser)
      this.application.creator.userName = this.currentUser.name;
      this.applied = true;
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
