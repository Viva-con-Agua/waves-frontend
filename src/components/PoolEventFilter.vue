<template>
  <el-form>
    <el-row>
      <el-button style="margin-left:0;width:70px" @click="filterButtonHandler">Filter</el-button>
    </el-row>
    <el-row v-if="show">
      <el-col :span="8">
        <el-form-item prop="type">
          <el-select style="width:90%" v-model="filter.type" placeholder="Type">
            <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
            <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
            <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
            <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
            <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item prop="region">
          <el-select style="width:90%" v-model="filter.region" placeholder="Region">
            <el-option
              v-for="region in regions"
              :key="region.city"
              :label="region.city"
              :value="region.city"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item prop="type">
          <el-select style="width:90%" v-model="filter.month" placeholder="Month">
            <el-option v-for="month in getMonths()" :key="month" :label="month" :value="month"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
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
      poolevents: this.$store.getters.getAllPoolEvents.data,
      show: false
    };
  },
  methods: {
    getMonths() {
      return moment.months();
    },
    filterButtonHandler() {
      if (this.show) {
        const keys = Object.keys(this.filter);
        let filter = "";
        keys.map(key => {
          filter += `${key}=${this.filter[key]}&`;
        });
        this.$store.dispatch("FETCH_POOLEVENTS_BY_FILTER", filter);
      } else {
        this.show = true;
      }
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
