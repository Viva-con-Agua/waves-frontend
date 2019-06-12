<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="poolEvent in myPoolEvents" :key="poolEvent.id">
        <PoolEventCard :poolEvent="poolEvent"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PoolEventCard from "./PoolEventCard";
export default {
  name: "MyPoolEvents",
  components: { PoolEventCard },
  props: ["poolEvents"],
  data() {
    return {};
  },
  computed: {
    myPoolEvents() {
      return this.poolEvents.filter(
        pe => pe.creator.userName === this.$store.getters.getCurrentUser.name
      );
    }
  }
};
</script>

<style>
</style>
