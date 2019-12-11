<template>
  <div>
    <el-row style="margin-top:20px">
      <el-col v-for="application in applications" :key="application.id" :span="24">
        <el-card
          :body-style="{ padding: '0px' }"
          style="padding:20px;margin:10px;margin-bottom:5px;width:90%"
        >
          <el-row>
            <el-row>
              <strong>
                <a :href="`/waves/poolevent/${application.poolevent_id}`">{{application.name}}</a>
              </strong>
              <el-tag
                style="float:right;padding:0;"
                :type="application.state=='WAITING'?'warning'
              :application.state=='ACCEPTED'?'success':'danger'"
                size="mini"
              >{{application.state}}</el-tag>
            </el-row>
            <el-row>
              <p class="row-text-application" style>{{application.text}}</p>
            </el-row>
            <el-row>
              <el-button
                type="danger"
                style="border-radius: 50%;
                width:30px;
                margin:0;
                padding:5px;
                float:right"
                @click="cancelApplication(application.id)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </el-row>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import Axios from "axios";
export default {
  name: "MyApplications",
  components: {
    VcAFrame,
    VcAColumn
  },
  data() {
    return {
      states: {
        WAITING_LIST: "WAITING_LIST",
        ACCEPTED: "ACCEPTED",
        REJECTED: "REJECTED"
      },
      applications: [],
      config: ""
    };
  },
  async mounted() {
    this.config = await {
      headers: { Authorization: `Bearer ${this.$cookies.get("access_token")}` }
    };
    await this.fetchApplications();
  },
  methods: {
    async cancelApplication(id) {
      const { data } = await Axios.put(
        `/waves/api/v1/application/${id}`,
        {
          state: "CANCELED"
        },
        this.config
      );
      await this.fetchApplications();
    },
    async fetchApplications() {
      const { data } = await Axios.get(
        "/waves/api/v1/application/user/1",
        this.config
      );
      this.applications = data.data;
    }
  }
};
</script>

<style lang="less" scoped>
.row-text-application {
  border-radius: 2%;
  background: #eee;
  padding: 10px;
}
</style>
