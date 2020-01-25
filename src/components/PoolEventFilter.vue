<template>
  <el-form>
    <el-row>
      <el-button
        style="margin-left:0;width:80px;padding:10px;border:0;"
        @click="()=>{show?show=false:show=true}"
        icon="el-icon-s-operation"
      >FILTER</el-button>
    </el-row>
    <el-collapse-transition>
      <el-row v-if="show" style="margin:auto;margin-top:10px">
        <el-col v-if="roles=='admin'" style="padding:5px" :span="roles=='admin'?6:8">
          <el-form-item prop="type">
            <el-select
              @change="filterButtonHandler"
              style="width:100%"
              v-model="filter.state"
              placeholder="State"
            >
              <el-option label="unreleased" value="UNRELEASED"></el-option>
              <el-option label="released" value="RELEASED"></el-option>
              <el-option label="rejected" value="REJECTED"></el-option>
              <el-option label="canceled" value="CANCELED"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding:5px" :span="roles=='admin'?6:8">
          <el-form-item prop="type">
            <el-select
              @change="filterButtonHandler"
              style="width:100%"
              v-model="filter.type"
              placeholder="Type"
            >
              <el-option
                v-for="type in types"
                :key="type.idevent_type"
                :label="type.name"
                :value="type.idevent_type"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col style="padding:5px" :span="roles=='admin'?6:8">
          <el-form-item prop="region">
            <el-select
              @change="filterButtonHandler"
              style="width:100%"
              v-model="filter.region"
              placeholder="Region"
            >
              <el-option
                v-for="region in regions"
                :key="region.locality"
                :label="region.locality"
                :value="region.locality"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col style="padding:5px" :span="roles=='admin'?6:8">
          <el-form-item prop="type">
            <el-select
              @change="filterButtonHandler"
              style="width:100%"
              v-model="filter.start"
              placeholder="Month"
            >
              <el-option v-for="month in getAllMonths" :key="month" :label="month" :value="month"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-collapse-transition>
  </el-form>
</template>

<script>
import axios from "axios";
import Axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PoolEventFilter",
  data() {
    return {
      filter: {},
      regions: [],
      store: this.$store,
      poolevents: this.$store.getters.getAllPoolEvents.data,
      show: false,
      types: []
    };
  },
  props: ["roles"],
  methods: {
    ...mapActions({
      fetchAllMonths: "FETCH_ALL_MONTHS"
    }),
    
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
    async fetchAllTypes() {
      const { data } = await Axios.get("/waves/api/v1/eventtype");
      this.types = data.types;
    }
  },
  async mounted() {
    const { data } = await axios.get("/waves/api/v1/regions");
    this.regions = data.data;
    await this.fetchAllTypes();
    this.fetchAllMonths();
  },
  computed: {
    ...mapGetters(["getAllMonths"])
  }
};
</script>

<style>
.el-select {
  display: block;
}
</style>
