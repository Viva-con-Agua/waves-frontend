<template>
    <el-button type="primary" @click="submit">duplicate</el-button>
</template>

<script>
export default {
name : "PoolEventDuplicator",
props : ['poolEvent'],
methods : {
    submit(){
        this.$store.dispatch('POST_POOLEVENT', this.poolEvent);
        this.notifySuccess();
    },
    notifySuccess() {
      setTimeout(() => {
        this.$notify.success({
          title: "Poolevent successfuly duplicated",
          message: "",
          offset: 100
        });
      }, 3000);
    }
}

}
</script>

<style>

</style>
