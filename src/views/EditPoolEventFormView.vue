<template>
  <EditPoolEventForm/>
</template>

<script>
import EditPoolEventForm from "../components/EditPoolEventForm";

export default {
  name: "EditPoolEventFormView",
  components: {
    EditPoolEventForm: EditPoolEventForm
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.$route.params.id);
  }
};
</script>
<style>
</style>