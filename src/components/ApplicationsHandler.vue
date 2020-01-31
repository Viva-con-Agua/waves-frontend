<template>
  <div class="app-handler-container" style="margin-top:50px;margin:auto">
    <el-row>
      <h4>Respond to your {{applications.length}} application requests</h4>
    </el-row>
    <el-row>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >Check all</el-checkbox>
      <el-button
        @click="setToAccepted"
        style="float:right;width:80px"
        size="mini"
        type="success"
      >ACCEPT</el-button>
      <el-button
        @click="setToRejected"
        style="float:right;width:80px"
        size="mini"
        type="danger"
      >REJECT</el-button>
    </el-row>

    <div style="margin-top:20px ;"></div>

    <el-card v-for="application in applications" :key="application.application_id">
      <el-col :span="1">
        <el-checkbox @change="handleChange(application.application_id)"></el-checkbox>
      </el-col>
      <el-col :span="23">
        <el-row>
          <el-col :span="4">
            <el-image
              class="avatar-p"
              :src="`https://eu.ui-avatars.com/api/?rounded=true&name=${application.first_name}+${application.last_name}`"
            ></el-image>
          </el-col>
          <el-col style="margin-top:8px" :span="20">
            <span>{{`${application.first_name} ${application.last_name}`}}</span>
            <el-tag
              :type="application.state=='REJECTED'?'danger'
            :application.state=='ACCEPTED'?'success':
            'warning'"
              style="float:right"
              size="mini"
            >{{application.state}}</el-tag>
          </el-col>
        </el-row>
        <el-row class="application-row" :span="24" style="margin-top:10px">
          <el-col :sm="24">
            <span style="float:left">{{`crew`}}</span>
            <span style="float:right">{{application.user.profiles[0].supporter.crew.name}}</span>
          </el-col>
          <el-col class="application-row" :sm="24">
            <span style="float:left">{{`supporter seit`}}</span>
            <span style="float:right">{{new Date(application.user.created).toLocaleDateString()}}</span>
          </el-col>
          <el-col class="application-row" :sm="24">
            <span style="float:left">{{`accepted`}}</span>
            <span style="float:right">{{`${application.statistic.accepted_count}`}}</span>
          </el-col>
          <el-col class="application-row" :sm="24">
            <span style="float:left">rejected</span>
            <span style="float:right">{{`${application.statistic.rejected_count}`}}</span>
          </el-col>
          <el-col class="application-row" :sm="24">
            <span style="float:left">{{`informed`}}</span>
            <span style="float:right">yes</span>
          </el-col>
          <el-col class="application-row" :sm="24">
            <span style="float:left">{{`verfied`}}</span>
            <span style="float:right">{{application.user.profiles[0].confirmed?"yes":"no"}}</span>
          </el-col>
        </el-row>
        <el-row
          style="margin-top:20px;margin-bottom:30px;padding:10px;background:#eee;border-radius:5px"
        >
          <span>{{application.text}}</span>
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ApplicationFilter from "./ApplicationFilter";

export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      applications: this.applications,
      isIndeterminate: true
    };
  },
  components: {
    ApplicationFilter
  },
  props: [
    "applications",
    "accept_application",
    "reject_application",
    "fetchUserStatistic",
    "getUserStatistic",
    "fetch_applications"
  ],
  mounted() {
    this.getStats("1");
  },
  methods: {
    handleCheckAllChange(val) {
      const ids = this.applications.map(a => a.application_id);
      this.checkedCities = val ? this.applications : [];
      this.isIndeterminate = false;
    },
    async handleChange(value) {
      const b = await this.checkedCities.filter(a => value == a);
      if (b.length < 1) {
        this.checkedCities.push(value);
      } else {
        this.checkedCities = await this.checkedCities.filter(a => value != a);
      }
    },
    setToAccepted() {
      this.checkedCities.map(async c => {
        await this.accept_application(c);
        this.fetch_applications(this.$route.params.id);
      });
    },
    setToRejected() {
      this.checkedCities.map(c => {
        this.reject_application(c);
        this.fetch_applications(this.$route.params.id);
      });
    },
    getStatistic(userId) {
      this.fetchUserStatistic(userId);
    }
  }
};
</script>

<style scoped>
.app-handler-container {
  width: 95%;
}

@media screen and (min-width: 768px) {
  .app-handler-container {
    width: 50%;
  }
}

.application-row {
  margin-top: 5px;
  color: gray;
}

.avatar-p {
  height: 40px;
  width: 40px;
}
</style>