<template>
  <div style="margin-top:40px;width:100%">
    <el-card style="width:100%">
        <div slot="header">
          <span style="color:grey">Recomanded</span>
        </div>
      
      <el-row
        class="mst-fvd-item"
        style="padding:10px"
        v-for="pe in mostFavedPoolevents"
        :key="pe.id"
      >

            <a style="text-decoration:none;color:black" :href="`/waves/poolevent/${pe.id}`">

        <el-col :span="6">
          <el-row>
            <strong>{{`${calculateMonth(pe.event_start).toUpperCase()}`}}</strong>
          </el-row>
          <el-row>
            <el-col :span="12" style="text-align:center">
              <span style="font-size:18px">{{new Date(pe.event_start).getDate()}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="18">
          <el-row>
              <span style="margin:0px">{{pe.name}}</span>
          </el-row>
          <el-row>
            <span style="color:grey">{{pe.type.toLowerCase()}}</span>
          </el-row>
          
        </el-col>
      </a>

      </el-row>

      
    </el-card>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "MostFavedPoolevents",
  data() {
    return {
      mostFavedPoolevents: ""
    };
  },
  mounted() {
    this.fetchMostFavedPoolevents();
  },
  methods: {
    async fetchMostFavedPoolevents() {
      const { data } = await Axios.get("/waves/api/v1/favorite/most/me");
      this.mostFavedPoolevents = data.data;
    },
    calculateMonth(date) {
      let d = new Date(date);
      return d.toLocaleString("default", { month: "short" });
    },
    calculateDay(date) {
      let d = new Date(date);
      return d.toLocaleString("default", { weekday: "short" });
    }
  }
};
</script>

<style>
.mst-fvd-item:hover {
  background: #eee;
}
</style>