<template>
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      <el-badge type="danger">
        <img
          style="float:right;width:40px;margin-top:13px;"
          src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
        />
      </el-badge>
    </span>
    <el-dropdown-menu style="padding:0;width:100px" slot="dropdown">
      <ul style="list-style:none;padding:0px;margin:0px;">
        <a style="text-decoration: none;" href="/waves/profile">
          <li class="profile-item">my profile</li>
        </a>
        <a style="text-decoration: none;" href="waves/setting">
          <li class="profile-item">setting</li>
        </a>
        <a style="text-decoration: none;" href="/waves/logout">
          <li class="profile-item">logout</li>
        </a>
      </ul>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: "ProfileDropDown"
};
</script>

<style>
.profile-item:hover {
  background-color: #eee;
  padding: 5px 5px 10px 10px;
  color: black
}

.profile-item {
  padding: 5px 5px 10px 10px;
  color:black
}
</style>