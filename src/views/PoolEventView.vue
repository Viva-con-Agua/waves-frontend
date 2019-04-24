<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox :title="poolEvent.title">
        <div slot="header">
          <el-tag
            class="active-user-tag"
            v-if="poolEvent.activeUserOnly"
            type="warning"
          >active users only</el-tag>
          <el-tag
            v-if="poolEvent.state==='unreleased'"
            type="gray"
          >{{$t('poolEventView.state.unreleased')}}</el-tag>
          <el-tag
            type="success"
            v-if="poolEvent.state==='released'"
          >{{$t('poolEventView.state.released')}}</el-tag>
          <el-tag
            v-if="poolEvent.state==='refused'"
            type="danger"
          >{{$t('poolEventView.state.refused')}}</el-tag>
          <el-tag
            v-if="poolEvent.state==='draft'"
            type="standard"
          >{{$t('poolEventView.state.draft')}}</el-tag>
        </div>
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
                <span class="vca-user-label">{{$t('poolEventView.aspOfEvent')}}</span>
                <span class="vca-user-value" v-if="poolEvent.aspOfEvent">{{poolEvent.aspOfEvent}}</span>
                <span class="vca-user-value" v-else>None</span>
              </li>
              <li>
                <span class="vca-user-label">{{$t('poolEventView.start')}}</span>
                <span class="vca-user-value">{{getStart}}</span>
              </li>
              <li>
                <span class="vca-user-label">{{$t('poolEventView.end')}}</span>
                <span class="vca-user-value">{{getEnd}}</span>
              </li>
            </ul>
          </div>
        </div>
      </VcABox>

      <VcABox title="location">
        <div class="user">
          <div class="vca-profile">
            <el-row>
              <el-col :span="11">
                <el-row>
                  <el-col :span="8" :offset="12">
                    <span class="vca-user-label">location</span>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="16" :offset="7">
                    <span class="vca-user-value">{{address}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class='location-row' :span="8" :offset="12" >
                    <span class="vca-user-label">description:</span>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col :span="20" :offset="4">
                    <span class="location-note">{{poolEvent.addressNote}}</span>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="10" :offset="3">
                <GmapMap
                  :center="getLatLong"
                  :zoom="18"
                  map-type-id="terrain"
                  style=" width : 100%; height: 350px"
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
              </el-col>
            </el-row>
          </div>
        </div>
      </VcABox>
      <VcABox title="application">
        <div class="user">
          <div class="vca-profile">
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
          </div>
        </div>
      </VcABox>

      <VcABox :title="$t('poolEventView.description')">
        <div class="user">
          <div class="vca-profile">
            <ul class="crew">
              <li>
                <div v-html="getDescription"></div>
              </li>
            </ul>
          </div>
        </div>
      </VcABox>
      <VcABox title="comments">
        <CommentForm/>
        <CommentCard/>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox title="state">
        <el-row>
          <el-col>
            <el-button
              class="vca-button-primary"
              id="button"
              v-if="poolEvent.state==='unreleased'|| poolEvent.state === 'refused'"
              @click.prevent="releasePooleEvent"
              type="success"
              style="width: 100%"
            >{{$t('poolEventView.button.release')}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button
              class="vca-button-primary"
              id="button"
              v-if="poolEvent.state==='unreleased'"
              @click.prevent="refusePoolEvent"
              type="danger"
            >{{$t('poolEventView.button.refuse')}}</el-button>
            <el-button
              class="vca-button-primary"
              id="button"
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
          <el-col>
            <el-button
              class="vca-button-primary"
              id="button"
              style="width: 100%"
              @click.prevent="editPoolEvent"
              type="primary"
            >
              <i class="el-icon-edit"></i>
              {{$t('poolEventView.button.edit')}}
            </el-button>
            <el-button
              class="vca-button-warn"
              id="button"
              @click.prevent="deletePoolEvent"
              type="danger"
            >
              <i class="el-icon-delete"></i>
              {{$t('poolEventView.button.delete')}}
            </el-button>
            <PoolEventDuplicator v-bind:poolEvent="poolEvent"/>
          </el-col>
        </el-row>
      </VcABox>
      <VcABox title="application">
        <el-row>
          <el-col>
            <el-badge style="width:100%" :value="getApplications().length" type="primary">
              <el-button
                class="vca-button-primary"
                id="button"
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
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

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
      applied: false,
      markers: [],
      places: [],
      currentPlace: null,
      daysGer: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag"
      ],
      monthsGer: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ]
    };
  },
  components: {
    CommentForm,
    CommentCard,
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
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getEnd() {
      let date = new Date(this.poolEvent.end);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getApplicationStart() {
      let date = new Date(this.poolEvent.applicationStart);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
    getApplicationEnd() {
      let date = new Date(this.poolEvent.applicationEnd);
      return (
        this.daysGer[date.getDay()] +
        " " +
        date.getDate() +
        ". " +
        this.monthsGer[date.getMonth()] +
        " um " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
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
    this.$store.dispatch("GET_APPLICATIONS", this.id);
    this.$store.dispatch("FETCH_COMMENTS", this.id);
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
.vca-button-primary {
  background-color: #0a6b91;
  color: #ffffff;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
.vca-button-warn {
  background-color: #d50000;
  color: #ffffff;
  padding: 0.5em 0;
  border: 0;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
    0 3px 10px 0 rgba(0, 0, 0, 0.19);
}
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
      margin-top: 20px;
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
  text-align: center;
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

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  float: left;
}

.active-user-tag {
  margin-right: 10px;
}

.location-note {
  text-align: justify;
}

#location-label {
  margin-left: 25%;
}

.location-row{
  margin-top: 20px 
}
</style>
