<template>
  <el-dropdown style="margin-top:0;padding:0" trigger="click">
    <span class="el-dropdown-link">
      <el-button style="transform: rotate(90deg);width:40px;float:right;margin:0;border:0" circle>
        <i class="el-icon-more"></i>
      </el-button>
    </span>
    <el-dropdown-menu style="margin:0;padding:0;width:100px" slot="dropdown">
      <ul style="list-style:none;padding:0px;margin:0px;">
        <li
          v-if="this.$cookies.get('access_token')"
          @click="()=> this.$router.push(`/waves/poolevent/${this.$route.params.id}/edit`)"
          class="profile-item"
        >edit</li>

        <li v-if="this.$cookies.get('access_token')" class="profile-item">remove</li>

        <li v-if="this.$cookies.get('access_token')" class="profile-item">duplicate</li>

        <li
          @click="releaseHandler"
          v-if="this.$cookies.get('access_token')&&poolevent.state!='RELEASED'"
          class="profile-item"
        >release</li>
        <li
          @click="rejectHandler"
          v-if="this.$cookies.get('access_token')&&poolevent.state!='REJECTED'"
          class="profile-item"
        >reject</li>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "PooleventDropdown",
  props: ["poolevent"],
  methods: {
    async releaseHandler() {
      await this.$store.dispatch("SET_TO_RELEASED", this.$route.params.id);
      this.$message({
        message: "Poolevent released!",
        type: "success"
      });
    },
    async rejectHandler() {
      await this.$store.dispatch("SET_TO_REFUSED", this.$route.params.id);
      this.$message({
        message: "Poolevent rejected!",
        type: "success"
      });
    }
  }
};
</script>

<style>
</style>