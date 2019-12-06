<template>
  <el-dropdown style="margin-top:0;padding:0" trigger="click">
    <span class="el-dropdown-link">
      <el-button
        style="transform: rotate(90deg);width:40px;float:right;margin:0;border:0"
        circle
      >
        <i class="el-icon-more"></i>
      </el-button>
    </span>
    <el-dropdown-menu style="margin:0;padding:0;width:100px" slot="dropdown">
      <ul style="list-style:none;padding:0px;margin:0px;">
        <a
          v-if="this.$cookies.get('access_token')"
          style="text-decoration: none;"
          href="/waves/profile"
        >
          <li class="profile-item">edit</li>
        </a>
        <a style="text-decoration: none;" href="waves/setting">
          <li class="profile-item">remove</li>
        </a>
        <a
          v-if="this.$cookies.get('access_token')"
          style="text-decoration: none;"
          href="/waves"
        >
          <li class="profile-item">duplicate</li>
        </a>
        <a
          v-if="!this.$cookies.get('access_token')"
          style="text-decoration: none;"
          href=""
        >
          <li class="profile-item">release</li>
        </a>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "PooleventDropdown"
};
</script>

<style>
</style>