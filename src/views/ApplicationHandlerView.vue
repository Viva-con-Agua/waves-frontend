<template>
  <ApplicationsHandler
    style="margin-top:40px"
    :accept_application="accept_application"
    :reject_application="reject_application"
    :applications="getApplications"
    :fetchUserStatistic="fetchUserStatistic"
    :fetch_applications="fetch_applications"
  />
</template>

<script>
import ApplicationsHandler from "../components/ApplicationsHandler.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ApplicationHandlerView",
  components: {
    ApplicationsHandler
  },
  mounted() {
    this.setAccessToken({
      headers: {
        Authorization: `Bearer ${this.$cookies.get("access_token")}`
      }
    });
    this.fetch_applications(this.$route.params.id);
  },
  computed: {
    ...mapGetters(["getApplications", "getAccesToken"])
  },
  methods: {
    ...mapActions({
      fetch_applications: "GET_APPLICATIONS",
      accept_application: "ACCEPT_APPLICATION",
      reject_application: "REJECT_APPLICATION",
      fetchUserStatistic: "FETCH_USER_STATISTIC",
      setAccessToken: "SET_ACCESS_TOKEN",
      logedIn: "IS_LOGED_IN"
    })
  }
};
</script>

<style>
</style>
