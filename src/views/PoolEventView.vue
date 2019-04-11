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
                      <el-tag
                        v-if="poolEvent.state==='unreleased'"
                        type="gray"
                      >{{$t('poolEventView.state.unreleased')}}</el-tag>
                      <el-tag
                        v-if="poolEvent.state==='released'"
                        type="success"
                      >{{$t('poolEventView.state.released')}}</el-tag>
                      <el-tag
                        v-if="poolEvent.state==='refused'"
                        type="danger"
                      >{{$t('poolEventView.state.refused')}}</el-tag>
                      <el-tag
                        v-if="poolEvent.state==='draft'"
                        type="standard"
                      >{{$t('poolEventView.state.draft')}}</el-tag>
                    </strong>
                  </h1>
                  <a class="proile-rating">{{poolEvent.type}}</a>
                  <ul class="nav nav-tabs" id="myTab" role="tablist"></ul>
                </div>
              </div>
              <div class="col-md-2"></div>
            </div>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventForm.input.address.label')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{address}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong v-if="poolEvent.addressNote">{{poolEventForm.addressNote}}</strong>
                </p>
              </el-col>
              <el-col v-if="poolEvent.addressNote" :span="6" :offset="1">
                <h3>{{$t('poolEvent.addressNote')}}</h3>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.website')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{poolEvent.website}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.start')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{getStart}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.end')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{getEnd}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.applicationStart')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{getApplicationStart}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.applicationEnd')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{getApplicationEnd}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.aspOfEvent')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{poolEvent.aspOfEvent}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.supporterLimit')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <p>{{poolEvent.supporterLimit}}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">
                <p>
                  <strong>{{$t('poolEventView.description')}}</strong>
                </p>
              </el-col>
              <el-col :span="6" :offset="1">
                <div v-html="getDescription"></div>
              </el-col>
            </el-row>
          </form>
        </div>
      </VcABox>
      <ApplicationForm v-bind:poolEvent="poolEvent"/>
    </VcAColumn>
    <VcAColumn>
      <VcABox>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              v-if="poolEvent.state==='unreleased'|| poolEvent.state === 'refused'"
              @click.prevent="releasePooleEvent"
              type="success"
            >{{$t('poolEventView.button.release')}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              v-if="poolEvent.state==='unreleased'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >{{$t('poolEventView.button.refuse')}}</el-button>
            <el-button
              style="width: 100%"
              v-else-if="poolEvent.state==='released'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >
              <i class="el-icon-circle-close"></i>
              {{$t('poolEventView.button.refuse')}}
            </el-button>
          </el-col>
        </el-row>
      </VcABox>
      <VcABox>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button style="width: 100%" @click.prevent="editPoolEvent" type="primary">
              <i class="el-icon-edit"></i>
              {{$t('poolEventView.button.edit')}}
            </el-button>
            <el-button @click.prevent="deletePoolEvent" type="danger">
              <i class="el-icon-delete"></i>
              {{$t('poolEventView.button.delete')}}
            </el-button>
            <PoolEventDuplicator v-bind:poolEvent="poolEvent"/>
            <el-badge :value="poolEvent.applications.length" type="primary">
              <el-button @click="applicationHandler">applications</el-button>
            </el-badge>
          </el-col>
        </el-row>
      </VcABox>
      <VcABox>
        <GmapMap
          :center="getLatLong"
          :zoom="15"
          map-type-id="terrain"
          style="width: 350px; height: 300px"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import ApplicationForm from "../components/ApplicationForm";
import PoolEventDuplicator from "../components/PoolEventDuplicator";

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
  components: {
    VcAFrame,
    VcAColumn,
    VcABox,
    ApplicationForm,
    PoolEventDuplicator
  },
  computed: {
    poolEvent() {
      return this.$store.getters.getPoolEvent;
    },
    buttonText() {
      return this.buttonOptions[this.state];
    },
    state() {
      return this.$store.state.currentState;
    },
    address() {
      return (
        this.poolEvent.address.route +
        " " +
        this.poolEvent.address.street_number +
        "," +
        this.poolEvent.address.postal_code +
        " " +
        this.poolEvent.address.locality
      );
    },
    getStart() {
      let date = new Date(this.poolEvent.start);
      return date.toLocaleTimeString() + ", " + date.toDateString();
    },
    getEnd() {
      let date = new Date(this.poolEvent.end);
      return date.toLocaleTimeString() + ", " + date.toDateString();
    },
    getApplicationStart() {
      let date = new Date(this.poolEvent.applicationStart);
      return date.toLocaleTimeString() + ", " + date.toDateString();
    },
    getApplicationEnd() {
      let date = new Date(this.poolEvent.applicationEnd);
      return date.toLocaleTimeString() + ", " + date.toDateString();
    },
    getDescription() {
      return this.poolEvent.description;
    },
    getLatLong() {
      return {
        lat: this.poolEvent.address.latitude,
        lng: this.poolEvent.address.longitude
      };
    }
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.id);
  },
  methods: {
    releasePooleEvent() {
      console.log(this.state.released);
      this.$store.dispatch("SET_TO_RELEASED", this.id);
    },
    refusePoolEvent() {
      this.$store.dispatch("SET_TO_REFUSED", this.id);
    },
    deletePoolEvent() {
      this.$store.dispatch("DELETE_POOLEVENT", this.id);
    },
    editPoolEvent() {
      this.$router.push("/editpooleventform/" + this.id);
    },
    applicationHandler(){
      this.$router.push('/applications/' + this.id)
    }
  }
};
</script>
<style>
.el-button {
  width: 100%;
  margin: 10px;
}
</style>
