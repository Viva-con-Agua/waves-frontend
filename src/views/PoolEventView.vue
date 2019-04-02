<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <VcABox>
        <div class="container emp-profile">
          <form method="post">
            <div class="row">
              <div class="col-md-6">
                <div class="profile-head">
                  <h1>
                    <strong>
                      {{poolEvent.title}}
                      <el-tag v-if="state==='unreleased'" type="gray">{{state}}</el-tag>
                      <el-tag v-if="state==='released'" type="success">{{state}}</el-tag>
                      <el-tag v-if="state==='refused'" type="danger">{{state}}</el-tag>
                    </strong>
                  </h1>
                  <h3 class="proile-rating">{{poolEvent.type}}</h3>
                  <ul class="nav nav-tabs" id="myTab" role="tablist"></ul>
                </div>
              </div>
              <div class="col-md-2"></div>
            </div>
            <el-row>
              <el-col :span="4"> <h3><strong>address:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.address}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>address note:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.addressNote}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>website:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.website}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>start:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.start}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>end:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.end}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>application strat:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.applicationStart}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>application end:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.applicationEnd}}</h3> </el-col>
            </el-row>
            <el-row>
              <el-col :span="4"> <h3><strong>asp of event:</strong></h3> </el-col>
              <el-col :span="4" :offset="1"><h3>{{poolEvent.aspOfEvent}}</h3> </el-col>
            </el-row>
          </form>
        </div>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              v-if="state==='unreleased'|| state === 'refused'"
              @click.prevent="releasePooleEvent"
              type="success"
            >{{ buttonText }}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              v-if="state==='unreleased'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >refuse</el-button>
            <el-button style="width: 100%"
              v-else-if="state==='released'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >{{ buttonText }}</el-button>
          </el-col>
        </el-row>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
export default {
  name: "PoolEventView",
  data() {
    return {
      id: this.$route.params.id,
      buttonOptions: {
        unreleased: "release",
        released: "refuse",
        refused: "release"
      }
    };
  },
  components: { VcAFrame, VcAColumn, VcABox },
  computed: {
    poolEvent() {
      return this.$store.getters.getPoolEvent;
    },
    buttonText() {
      return this.buttonOptions[this.state];
    },
    state() {
      return this.$store.state.currentState;
    }
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.id);
  },
  methods: {
    releasePooleEvent() {
      this.$store.commit("transition", "release");
    },
    refusePoolEvent() {
      this.$store.commit("transition", "refuse");
    }
  }
};
</script>
<style>
.el-button{
  width: 100%;
  margin: 10px
}
</style>
