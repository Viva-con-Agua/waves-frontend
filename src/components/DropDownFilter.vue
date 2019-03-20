<template>
<div>
<div>
  <b-dropdown id="ddown1" text='DropDown' class="m-md-2">
    <b-dropdown-item>First Action</b-dropdown-item>
    <b-dropdown-item>Second Action</b-dropdown-item>
    <b-dropdown-item>Third Action</b-dropdown-item>
    <b-dropdown-divider />
    <b-dropdown-item active>Active action</b-dropdown-item>
    <b-dropdown-item disabled>Disabled action</b-dropdown-item>
  </b-dropdown>
</div>

</div>
    
</template>

<script>
export default {
name: 'DopDownFilter',
props:['btn_name']

}
</script>

<style>

</style>
