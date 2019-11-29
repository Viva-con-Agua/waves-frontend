<template>
  <el-form>
    <el-col :span="24">
      <el-form-item prop="type">
        <el-select v-model="filter.type" :placeholder="$t('poolEventForm.input.type.placeholder')">
          <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
          <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="region">
        <el-select v-model="filter.region" placeholder="region">
          <el-option
            v-for="region in regions"
            :key="region.city"
            :label="region.city"
            :value="region.city"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="type">
        <el-select v-model="filter.month" placeholder="select month">
          <el-option v-for="month in getMonths()" :key="month" :label="month" :value="month"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button style="margin:0" @click="getEventsByFilter">FILTER</el-button>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "PoolEventFilter",
  data() {
    return {
      filter: {},
      regions: [],
      store: this.$store,
      poolevents:this.$store.getters.getAllPoolEvents.data
    };
  },
  methods: {
    getMonths() {
      return moment.months();
    },
    getEventsByFilter() {
      const keys = Object.keys(this.filter);
      let filter = "";
      keys.map(key => {
        filter += `${key}=${this.filter[key]}&`;
      });
      this.$store.dispatch('FETCH_POOLEVENTS_BY_FILTER', filter);
    },
    async fetchRegions() {}
  },
  async mounted() {
    const { data } = await axios.get("/waves/api/v1/regions");
    this.regions = data.data;
  }
};
</script>

<style>
.el-select {
  display: block;
}
</style>
