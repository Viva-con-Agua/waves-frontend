<template>
    <VcABox v-if="!applied" :first="false" title="Apply as supporter">
      <el-form
        label-position="left"
        label-width="140px"
        :model="poolEvent"
        :rules="rules"
        ref="poolEvent"
        class="rows-container"
      >
        <el-form-item label="User">
          <el-input v-model="application.userName"></el-input>
        </el-form-item>
        <el-form-item label="Message">
          <el-input type="textarea" :rows="4" placeholder="Please input" v-model="application.message"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="success" @click.prevent="submitApplication">
                Apply
            </el-button>
        </el-form-item>
      </el-form>
    </VcABox>
</template>
<script>
import { Input, Form } from "element-ui";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
  name: "ApplicationForm",
  components : {
       VcAFrame, VcAColumn, VcABox
  },
  props :['poolEvent'],
  data() {
    return {
      application: {
        userName: "",
        message: ""
      },
      applied : false
    };
  },
  methods : {
      submitApplication(){
        console.log(this.$props.poolEvent);
      }
  }
};
</script>


<style>
</style>
