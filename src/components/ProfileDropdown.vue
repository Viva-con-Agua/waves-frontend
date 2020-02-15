<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-button style="width:30px;height:30px;padding:0;border:0" circle>
        <el-badge type="danger">
          <img
            style="float:right;width:30px;height:30px"
            :src="this.$cookies.get('access_token')?`https://eu.ui-avatars.com/api/?rounded=true&name=${this.$cookies.get('first_name')}+${this.$cookies.get('last_name')}`
          :'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            alt="profile-img"
          />
        </el-badge>
      </el-button>
    </span>
    <el-dropdown-menu style="padding:0;width:110px" slot="dropdown">
      <ul style="list-style:none;padding:0px;margin:0px;">
        <a
          v-if="this.$cookies.get('access_token')"
          style="text-decoration: none;"
          href="/waves/profile"
        >
          <li class="profile-item"> <i class="el-icon-user"></i>  my profile</li>
        </a>
        <a
          style="text-decoration: none;"
          v-if="getRoles=='admin'&&this.$cookies.get('access_token')"
          href="/waves/dashboard"
        >
          <li class="profile-item"> <i class="el-icon-setting"></i> dashboard</li>
        </a>
        <a
          v-if="this.$cookies.get('access_token')"
          style="text-decoration: none;"
          href="/waves"
          @click="logout"
        >
          <li class="profile-item">logout</li>
        </a>
        <a
          v-if="!this.$cookies.get('access_token')"
          style="text-decoration: none;"
          :href="`https://stage.vivaconagua.org/drops/oauth2/code/get?client_id=wavesex&response_type=code&state=${`http://localhost${this.$router.history.current.path}`}&redirect_uri=http://localhost/waves/api/v1/oauth`"
        >
          <li class="profile-item">login</li>
        </a>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileDropDown",
  props: ['logout'],
  computed: {
    ...mapGetters(["getRoles"])
  }
};
</script>

<style>
.profile-item:hover {
  background-color: #eee;
  padding: 5px 5px 10px 10px;
  color: black;
}

.profile-item {
  padding: 5px 5px 10px 10px;
  color: black;
}
</style>