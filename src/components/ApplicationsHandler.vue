<template>
  <div class="app-handler-container">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >Check all</el-checkbox>

    <el-button
      @click="setToAccepted"
      style="float:right;width:80px;"
      size="mini"
      type="success"
    >ACCEPT</el-button>
    <el-button
      @click="setToRejected"
      style="float:right;width:80px;margin-right:10px"
      size="mini"
      type="danger"
    >REJECT</el-button>

    <el-row
      v-for="(application) in applications"
      :key="application.application_id"
      style="margin-top:5px"
    >
      <el-col class="container-sc" :xs="2" :lg="1">
        <el-row>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-row>
              <el-checkbox :label="application" :key="application.application_id">{{''}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-row>
      </el-col>
      <el-col class="container-sc" :xs="22" :lg="23">
        <div style="margin-top:5px" :label="application" :key="application.application_id">
          <el-card>
            <el-row>
              <el-col :xs="4" :lg="3">
                <el-image
                  class="avatar-p"
                  :src="`https://eu.ui-avatars.com/api/?rounded=true&name=${application.first_name}+${application.last_name}`"
                ></el-image>
              </el-col>
              <el-col style="margin-top:8px" :xs="20" :lg="21">
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
              <el-col v-if="application.user.profiles[0].supporter.crew" :sm="24">
                <span style="float:left">crew</span>
                <span style="float:right">{{application.user.profiles[0].supporter.crew.name}}</span>
              </el-col>
              <el-col class="application-row" :sm="24">
                <span style="float:left">{{`supporter seit`}}</span>
                <span
                  style="float:right"
                >{{new Date(application.user.created).toLocaleDateString()}}</span>
              </el-col>
              <el-col class="application-row" :sm="24">
                <span style="float:left">accepted</span>
                <span style="float:right">{{`${application.statistic.accepted_count}`}}</span>
              </el-col>
              <el-col class="application-row" :sm="24">
                <span style="float:left">rejected</span>
                <span style="float:right">{{`${application.statistic.rejected_count}`}}</span>
              </el-col>
              <el-col class="application-row" :sm="24">
                <span style="float:left">informed</span>
                <span style="float:right">yes</span>
              </el-col>
              <el-col v-if="application.user.profiles" class="application-row" :sm="24">
                <span style="float:left">{{`verfied`}}</span>
                <span style="float:right">{{application.user.profiles[0].confirmed?"yes":"no"}}</span>
              </el-col>
            </el-row>
            <el-row
              style="margin-top:20px;margin-bottom:30px;padding:10px;background:#eee;border-radius:5px"
            >
              <span>{{application.text}}</span>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters , mapActions} from "vuex";
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      isIndeterminate: true
    };
  },
  props: [
    "applications",
    "accept_application",
    "reject_application",
    "fetchUserStatistic",
    "getUserStatistic",
    "fetch_applications"
  ],
  computed: {
    ...mapGetters(["getApplications"])
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.applications : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.applications.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.applications.length;
    },
    setToAccepted() {
      this.checkedCities.map(async c => {
        await this.accept_application(c.application_id);
      });
      this.fetch_applications(this.$route.params.id);
    },
    async setToRejected() {
      await this.checkedCities.map(c => {
        this.reject_application(c.application_id);
      });
      await this.fetch_applications(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
.app-handler-container {
  width: 95%;
  margin: auto;
}

@media screen and (min-width: 768px) {
  .app-handler-container {
    width: 40%;
    margin: auto;
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