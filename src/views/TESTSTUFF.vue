<template>
  <div>
    <Dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <DropdownMenu slot="dropdown">
        <DropdownItem>Action 1</DropdownItem>
        <DropdownItem>Action 2</DropdownItem>
        <DropdownItem>Action 3</DropdownItem>
        <DropdownItem disabled>Action 4</DropdownItem>
        <DropdownItem divided>Action 5</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { Dropdown, DropdownItem, DropdownMenu } from "element-ui";
export default {
  name: "TESTSTUFF",
  components: {
    Dropdown,
    DropdownItem,
    DropdownMenu
  }
};
</script>

<style>
</style>