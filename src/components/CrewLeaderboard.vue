<template>
  <el-card v-loading="getLeaderboard.length==0">
    <div slot="header" class="clearfix">
      <strong> Leaderboard</strong>
    </div>
    <el-row v-for="(entry,i) in getLeaderboard" :key="i"  style="padding:10px;justify: center;text-align:center;margin-bottom:15px">
      <el-col  :span="4" :offset="1" >
      <i class="el-icon-top"> </i>
      </el-col>
      <el-col :span="12" :offset="1" >
        {{entry.name}}
      </el-col>
      <el-col :span="6" >
        +{{entry.score}}
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  name: "CrewLeaderboard",

  mounted(){
    this.fetchLeaderboard()
  },
  methods:{
    ...mapActions({
      fetchLeaderboard : "FETCH_LEADERBOARD"
    })
  },
    computed:{
      ...mapGetters(['getLeaderboard'])
  }
};
</script>
