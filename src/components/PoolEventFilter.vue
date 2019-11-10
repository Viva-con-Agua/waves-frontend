<template>
  <el-form>
    <el-col :span="20"> 
      <el-form-item prop="type">
        <el-select
          v-model="poolEvent.type"
          :placeholder="$t('poolEventForm.input.type.placeholder')"
        >
          <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="poolEvent.region" placeholder="region">
          <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="poolEvent.month" placeholder="select month">
          <el-option v-for="month in getMonths()" :key="month" :label="month" :value="month"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button>filter</el-button>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script>
import moment from "moment";

export default {
  name: "PoolEventFilter",
  data() {
    return {
      poolEvent: {
        type: "",
        month: "",
        region: ""
      }
    };
  },
  methods: {
    getMonths() {
      return moment.months();
    },
    getRegions() {}
  }
};
</script>

<style>
.el-select {
  display: block;
}
</style>
