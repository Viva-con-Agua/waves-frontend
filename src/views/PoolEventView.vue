<template>
  <div style="margin:0;padding:0">
    <rotate-square2 style="margin:auto auto" v-if="!poolEvent"></rotate-square2>
    <VcAFrame v-if="poolEvent">
      <VcAColumn size="50%">
        <VcABox :title="poolEvent.name">
          <div slot="header">
            <el-tag
              class="active-user-tag"
              v-if="poolEvent.active_user_only && isAdmin"
              type="warning"
            >active users only</el-tag>
            <el-tag
              v-if="poolEvent.state==='UNRELEASED'"
              type="gray"
            >{{$t('poolEventView.state.unreleased')}}</el-tag>
            <el-tag
              type="success"
              v-if="poolEvent.state==='RELEASED'"
            >{{$t('poolEventView.state.released')}}</el-tag>
            <el-tag
              v-if="poolEvent.state==='REJECTED'"
              type="danger"
            >{{$t('poolEventView.state.refused')}}</el-tag>
            <el-tag
              v-if="poolEvent.state==='DRAFT'"
              type="standard"
            >{{$t('poolEventView.state.draft')}}</el-tag>
          </div>
          <Row>
            <ul class="event-start-end">
              <li style="margin-top:10px">
                <i class="el-icon-time"></i>
              </li>
              <li
                style="margin-top:10px"
              >{{`${new Date(poolEvent.event_start).toLocaleString()} - ${new Date(poolEvent.event_end).toLocaleString()}` }}</li>
              <li style="width:auto;float:right">
                <PooleventDropdown style="float:right;margin-top:0;padding-top:0" />
              </li>
            </ul>
          </Row>
          <Row>
            <ul class="event-start-end">
              <li>
                <i class="el-icon-location-outline"></i>
              </li>
              <li>{{`${poolEvent.location.street_name} ${poolEvent.location.street_number}, ${poolEvent.location.post_code} ${poolEvent.location.city}` }}</li>
            </ul>
          </Row>
          <Row>
            <ul class="event-start-end">
              <li>
                <i class="el-icon-loading"></i>
              </li>
              <li>
                <a :href="poolEvent.website"></a>
                {{ poolEvent.website}}
              </li>
            </ul>
          </Row>
          <el-row>
            <SharingButton
              :location="`https://localhost${this.$router.history.current.path}`"
              style="width:40px;float:right;margin:0;border:0"
            />
            <ApplicationButton style="width:40px;float:right;margin:0;border:0" />
          </el-row>
        </VcABox>

        <Card :title="$t('poolEventView.description')">
          <div v-html="getDescription"></div>
        </Card>
        <Card :body-style="{ padding: '0px' }">
          <div style="margin:13px">
            <p>
              <Strong>Adressbeschreibung:</Strong>
              {{poolEvent.location.desc}}
            </p>
          </div>

          <GmapMap
            :center="{
            lat: parseFloat(poolEvent.location.lat) ,
            lng:parseFloat(poolEvent.location.long)}"
            :zoom="14"
            map-type-id="terrain"
            style=" width : 100%; height: 200px; "
          >
            <GmapMarker
              :position="{lat: parseFloat( poolEvent.location.lat) , 
              lng :parseFloat( poolEvent.location.long)}"
              :key="index++"
              :clickable="true"
              :draggable="true"
            />
          </GmapMap>
        </Card>
        <CommentForm />
        <CommentCard />
      </VcAColumn>
    </VcAFrame>
  </div>
</template>
<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { Container, Row, Card } from "element-ui";
import "vca-widget-base/dist/vca-widget-base.css";
import ApplicationForm from "../components/ApplicationForm";
import PoolEventDuplicator from "../components/PoolEventDuplicator";
import PooleventDropdown from "../components/PooleventDropdown";
import ApplicationButton from "../components/ApplicationButton";
import SharingButton from "../components/SharingButton";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import { RotateSquare2 } from "vue-loading-spinner";

export default {
  name: "PoolEventView",
  data() {
    return {
      index: 0,
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
    ApplicationButton,
    Card,
    CommentForm,
    CommentCard,
    VcAFrame,
    VcAColumn,
    VcABox,
    ApplicationForm,
    PoolEventDuplicator,
    Container,
    Row,
    RotateSquare2,
    PooleventDropdown,
    SharingButton
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
        this.poolEvent.location.street_name +
        " " +
        this.poolEvent.location.street_number +
        "," +
        this.poolEvent.location.post_code +
        " " +
        this.poolEvent.location.city
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
      return this.poolEvent.description.html;
    },
    getLatLong() {
      return {
        lat: this.poolEvent.address.latitude,
        lng: this.poolEvent.address.longitude
      };
    },
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
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
      this.$router.push("/waves/applications/" + this.id);
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

.location-row {
  margin-top: 20px;
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
