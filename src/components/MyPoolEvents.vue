<template>
  <div>
    <el-col v-for="poolevent in mypoolevents" :key="poolevent.id" :span="24">
      <PooleventCard style="width:95%;margin:auto;margin-top:5px" :poolEvent="poolevent"/>
    </el-col>
  </div>
</template>
<script>
import Axios from "axios";
import PooleventCard from './PoolEventCard'
export default {
  name: "MyPoolevents",
  components:{PooleventCard},
  data() {
    return {
      mypoolevents: []
    };
  },
  async mounted() {
    await this.fetchMyPoolevents();
  },
  methods: {
    async fetchMyPoolevents() {
      const config = {
        headers: {
          Authorization: `bearer ${this.$cookies.get("access_token")}`
        }
      };
      const { data } = await Axios.get(
        "/waves/api/v1/poolevent/user/me ",
        config
      );
      this.mypoolevents = data.data;
    }
  }
};
</script>

<style lang="less" scoped>
.row-text-application {
  border-radius: 2%;
  background: #eee;
  padding: 10px;
}

.event-start-end {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    float: left;
    padding: 5px;
  }
}
</style>
