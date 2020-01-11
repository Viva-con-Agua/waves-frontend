<template>
  <div style="margin:auto;width:100%">
    <el-tabs tab-position="left" style="width:70%;margin-top:60px">
      <el-tab-pane label="Type">
        <el-row>
          <el-col :span="20">
            <el-input v-model="pe_type" placeholder="event type..."></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="submit">CREATE</el-button>
          </el-col>
        </el-row>

        <el-row style="margin:auto">
          <el-table :data="event_types" style="width: 100%">
            <el-table-column label="Name" prop="name"></el-table-column>
            <el-table-column label="Date" prop="created_at"></el-table-column>
          </el-table>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Achievements">
        <AchievementCreater />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Axios from "axios";
import AchievementCreater from "../components/AchievementCreater";

export default {
  name: "DaschboardView",
  components:{
      AchievementCreater
  },
  data() {
    return {
      pe_type: "",
      event_types: []
    };
  },
  async mounted() {
    this.event_types = await this.fetchAllTypes();
  },
  methods: {
    async submit() {
      try {
        await Axios.post("/waves/api/v1/eventtype", { name: this.pe_type });
      } catch (error) {
        this.$notify.error({
          title: "Error",
          message: `submit type error`
        });
      }
    },
    async fetchAllTypes() {
      try {
        const { data } = await Axios.get("/waves/api/v1/eventtype");
        return data.types;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>