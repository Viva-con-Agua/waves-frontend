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
          v-if="isLogedIn&&getRoles=='admin'||crew.city==poolevent.crew"
          @click="()=> this.$router.push(`/waves/poolevent/${this.$route.params.id}/edit`)"
          class="profile-item"
        >
          <i class="el-icon-edit"></i> edit
        </li>

        <li v-if="isLogedIn&&getRoles=='admin'" class="profile-item">
          <i class="el-icon-delete"></i> remove
        </li>

        <li
          @click="releaseHandler"
          v-if="isLogedIn&&getRoles=='admin'&&poolevent.state!='RELEASED'"
          class="profile-item"
        >
          <i class="el-icon-circle-check"></i> release
        </li>
        <li
          @click="rejectHandler"
          v-if="isLogedIn&&getRoles=='admin'&&poolevent.state!='REJECTED'"
          class="profile-item"
        >
          <i class="el-icon-circle-close"></i> reject
        </li>
        <li
          @click="cancelHandler"
          v-if="isLogedIn&&poolevent.state!='CANCELED'&&
          (getRoles=='admin'||(crew.role=='VolunteerManager'&&
          crew.city==poolevent.crew))"
          class="profile-item"
        >
          <i class="el-icon-document-delete"></i> cancel
        </li>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PooleventDropdown",
  props: ["poolevent"],
  computed: {
    ...mapGetters(["crew", "getRoles", "isLogedIn"])
  },
  methods: {
    ...mapActions({
      cancelEvent: "SET_TO_CANCELED"
    }),
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
    },
    async cancelHandler() {
      await this.cancelEvent(this.$route.params.id);
    }
  }
};
</script>

<style>
</style>