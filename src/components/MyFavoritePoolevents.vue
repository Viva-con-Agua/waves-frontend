<template>
  <div>
    <el-col v-for="poolevent in favorites" :key="poolevent.id" :span="24">
      <PooleventCard style="width:95%;margin:auto;margin-top:5px" :poolEvent="poolevent" />
    </el-col>
  </div>
</template>

<script>
import Axios from "axios";
import PooleventCard from "./PoolEventCard";
export default {
  name: "MyFavoritePoolevents",
  components: {
    PooleventCard
  },
  data() {
    return {
      favorites: []
    };
  },
  async mounted() {
    const config = {
      headers: {
        Authorization: `bearer ${this.$cookies.get("access_token")}`
      }
    };
    const { data } = await Axios.get("/waves/api/v1/favorite/1", config);
    this.favorites = data.data;
  }
};
</script>

<style>
</style>