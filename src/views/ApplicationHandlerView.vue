<template>
  <ApplicationsHandler
    style="margin-top:40px"
    :accept_application="accept_application"
    :reject_application="reject_application"
    :applications="getApplications"
    :fetchUserStatistic="fetchUserStatistic"
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
  },
  computed: {
    ...mapGetters(["getApplications"])
  },
  methods: {
    ...mapActions({
      fetch_applications: "GET_APPLICATIONS",
      accept_application: "ACCEPT_APPLICATION",
      reject_application: "REJECT_APPLICATION",
      fetchUserStatistic: "FETCH_USER_STATISTIC"
    })
  }
};
</script>

<style>
</style>
