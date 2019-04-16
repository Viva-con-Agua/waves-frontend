<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox :title="poolEvent.title">
        <div class="user">
          <div class="vca-profile">
            <ul class="crew">
              <li>
                <span class="vca-user-label">type</span>
                <span class="vca-user-value">{{poolEvent.type}}</span>
              </li>
              <li>
                <span class="vca-user-label">website:</span>
                <span class="vca-user-value">{{poolEvent.website}}</span>
              </li>
              <li>
                <span class="vca-user-label">state:</span>
                <span class="vca-user-value">
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
                </span>
              </li>
            </ul>
            <ul class="crew">
              <li>
                <span class="vca-user-label">location:</span>
                <span class="vca-user-value">{{address}}</span>
              </li>
              <li v-if="poolEvent.addressNote">
                <span class="vca-user-label" v-if="poolEvent.addressNote">location note:</span>
                <span class="vca-user-value" v-if="poolEvent.addressNote">{{poolEvent.addressNote}}</span>
              </li>
            </ul>
            <GmapMap
              :center="getLatLong"
              :zoom="18"
              map-type-id="terrain"
              style="width: 100%; height: 350px"
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
            <ul class="crew">
              <li>
                <span class="vca-user-label">{{$t('poolEventView.start')}}</span>
                <span class="vca-user-value">{{getStart}}</span>
              </li>
              <li>
                <span class="vca-user-label">{{$t('poolEventView.end')}}</span>
                <span class="vca-user-value">{{getEnd}}</span>
              </li>
            </ul>
            <ul class="crew">
              <li>
                <span class="vca-user-label">{{$t('poolEventView.applicationStart')}}</span>
                <span class="vca-user-value">{{getApplicationStart}}</span>
              </li>
              <li>
                <span class="vca-user-label">{{$t('poolEventView.applicationEnd')}}</span>
                <span class="vca-user-value">{{getApplicationStart}}</span>
              </li>
              <li>
                <span class="vca-user-label">{{$t('poolEventView.supporterLimit')}}</span>
                <span class="vca-user-value">{{poolEvent.supporterLimit}}</span>
              </li>
            </ul>
            <ul class="crew">
              <li>
                <span
                  class="vca-user-label"
                  v-if="poolEvent.aspOfEvent"
                >{{$t('poolEventView.aspOfEvent')}}</span>
                <span class="vca-user-value">{{poolEvent.aspOfEvent}}</span>
              </li>
              <li>
                <span
                  class="vca-user-label"
                  v-if="poolEvent.description"
                >{{$t('poolEventView.description')}}</span>
                <div v-html="getDescription"></div>
              </li>
            </ul>
          </div>
        </div>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox title="state">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              id="button"
              size="mini"
              v-if="poolEvent.state==='unreleased'|| poolEvent.state === 'refused'"
              @click.prevent="releasePooleEvent"
              type="success"
            >{{$t('poolEventView.button.release')}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button
              id="button"
              size="mini"
              v-if="poolEvent.state==='unreleased'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >{{$t('poolEventView.button.refuse')}}</el-button>
            <el-button
              id="button"
              size="mini"
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
            <el-button
              id="button"
              size="mini"
              style="width: 100%"
              @click.prevent="editPoolEvent"
              type="primary"
            >
              <i class="el-icon-edit"></i>
              {{$t('poolEventView.button.edit')}}
            </el-button>
            <el-button id="button" size="mini" @click.prevent="deletePoolEvent" type="danger">
              <i class="el-icon-delete"></i>
              {{$t('poolEventView.button.delete')}}
            </el-button>
            <PoolEventDuplicator v-bind:poolEvent="poolEvent"/>
            <el-badge
              style="width: 100%"
              :value="getApplications().length"
              type="primary"
            >
              <el-button
                id="button"
                size="mini"
                @click="applicationHandler"
              >{{$t('poolEventView.button.applications')}}</el-button>
            </el-badge>
            <ApplicationForm v-bind:poolEvent="poolEvent"/>
          </el-col>
        </el-row>
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
      },
      markers: [],
      places: [],
      currentPlace: null
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
    this.$store.dispatch("GET_APPLICATIONS", this.$route.params.id);
  },
  methods: {
    releasePooleEvent() {
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
    applicationHandler() {
      this.$router.push("/applications/" + this.id);
    },
    getApplications() {
      return this.$store.getters.getApplications;
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    }
  }
};
</script>
<style lang="less">
.el-button {
  width: 100%;
  margin: 10px;
}
@import "../assets/less/responsive.less";
.vca-button-select-crew {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
.user {
  display: flex;
  justify-content: flex-start;
  align-item: flex-start;
  align-content: flex-start;
  @media @phone-down {
    flex-direction: column;
  }
}
.notConfirmed {
  color: white;
  background-color: rgba(213, 0, 0, 1);
  padding: 0.3em;
  font-size: 0.9em;
  border-radius: 0.5em;
  margin: 0.2em;
}
.roles {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: flex-start;
  & /deep/ .role:not(:first-child) {
    margin-left: 0.2em;
  }
}
.roleButtons {
  margin-bottom: 0.5em;
  button {
    margin-top: 0.5em;
    &:not(:last-child) {
      margin-right: 0.5em;
    }
  }
}
.vca-profile {
  margin-left: 2em;
  list-style: none;
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media @phone-down {
    margin-left: 0;
  }
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-direction: column;
    }
    &.crew {
      align-items: flex-start;
    }
    &.contact {
      flex-direction: column;
    }
    &.demographics {
      justify-content: flex-end;
      li {
        margin-left: 2em;
        flex-direction: row;
        align-items: baseline;
        .vca-user-value {
          margin-left: 0.3em;
        }
      }
    }
  }
}
.vca-user-label {
  /*font-style: italic;*/
  font-weight: bold;
}
.vca-user-value {
  font-size: 1.4em;
}
#button {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  float: left;
}
</style>
