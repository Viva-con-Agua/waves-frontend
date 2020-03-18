<template>
  <div v-if="poolEvent">
    <el-row >
      <el-card >
        <div slot="header" class="clearfix">
          <strong>{{poolEvent.event_name}}</strong>
          <span style="color:grey;float:right">{{ poolEvent.type_name }}</span>
          <div v-if="isLogedIn">
            <el-tag
              size="mini"
              class="active-user-tag"
              v-if="poolEvent.active_user_only && isAdmin"
              type="warning"
              >active users only</el-tag
            >
            <el-tag
              size="mini"
              v-if="poolEvent.state === 'UNRELEASED'"
              type="gray"
              >{{ $t("poolEventView.state.unreleased") }}</el-tag
            >
            <el-tag
              size="mini"
              type="success"
              v-if="poolEvent.state === 'RELEASED'"
              >{{ $t("poolEventView.state.released") }}</el-tag
            >
            <el-tag
              size="mini"
              v-if="poolEvent.state === 'REJECTED'"
              type="danger"
              >{{ $t("poolEventView.state.refused") }}</el-tag
            >
            <el-tag
              size="mini"
              v-if="poolEvent.state === 'DRAFT'"
              type="standard"
              >{{ $t("poolEventView.state.draft") }}</el-tag
            >
            <el-tag
              size="mini"
              v-if="poolEvent.state === 'CANCELED'"
              type="warning"
              >{{ poolEvent.state }}</el-tag
            >
          </div>
        </div>

        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-location-outline"></i>
            </li>
            <li>
              {{
                `${poolEvent.location.route} ${poolEvent.location.street_number}, ${poolEvent.location.postal_code} ${poolEvent.location.locality}`
              }}
            </li>
          </ul>
        </el-row>
        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-time"></i>
            </li>
            <li>
              {{
                `${new Date(poolEvent.event_start).getUTCHours()}:${new Date(
                  poolEvent.event_start
                ).getUTCMinutes()}h`
              }}
              -
              {{
                `${new Date(poolEvent.event_end).getUTCHours()}:${new Date(
                  poolEvent.event_end
                ).getUTCMinutes()}h`
              }}
            </li>
          </ul>
        </el-row>
        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-date"></i>
            </li>
            <li>
              {{ new Date(poolEvent.event_start).getDate() }}.
              {{
                new Date(poolEvent.event_start).toLocaleString("default", {
                  month: "short"
                })
              }}
              {{ new Date(poolEvent.event_start).getFullYear() }} -
              {{ new Date(poolEvent.event_end).getDate() }}.
              {{
                new Date(poolEvent.event_end).toLocaleString("default", {
                  month: "short"
                })
              }}
              {{ new Date(poolEvent.event_end).getFullYear() }}
            </li>
          </ul>
        </el-row>

        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-info"></i>
            </li>
            <li>{{ poolEvent.website }}</li>
          </ul>
        </el-row>

        <el-row>
          <ul class="event-start-end">
            <li>
              <i class="el-icon-user"></i>
            </li>
            <li>{{ poolEvent.asp_event_id.profiles[0].supporter.fullName }}</li>
          </ul>
        </el-row>

        <el-row v-if="isLogedIn">
          <el-col
            v-if="
              getRoles == 'admin' ||
                (crew.role == 'VolunteerManager' && crew.city == poolEvent.crew)
            "
            style="text-align:center"
            :span="
              getRoles == 'admin' || crew.role == 'VolunteerManager' ? 5 : 8
            "
          >
            <el-button
              v-if="
                getRoles == 'admin' ||
                  (crew.role == 'VolunteerManager' &&
                    crew.city == poolEvent.crew)
              "
              style="margin-top:5px;
                width:40px;
                height:40px;
                margin:auto;
                border:0
                text-align:center"
              @click="
                () =>
                  this.$router.push(
                    `/waves/applications/${this.$route.params.id}`
                  )
              "
              circle
            >
              <i class="el-icon-circle-plus"></i>
            </el-button>
          </el-col>
          <el-col
            style="text-align:center"
            :span="
              getRoles == 'admin' || crew.role == 'VolunteerManager' ? 5 : 8
            "
          >
            <ApplicationButton
              :poolevent_id="id"
              style="width:40px;margin:0;border:0;text-align:center;margin:auto"
            />
          </el-col>
          <el-col
            style="text-align:center"
            :span="
              getRoles == 'admin' || crew.role == 'VolunteerManager' ? 5 : 8
            "
          >
            <SharingButton
              :location="
                `https://localhost${this.$router.history.current.path}`
              "
              style="width:40px;margin:0;border:0;text-align:center;margin:auto"
            />
          </el-col>
          <el-col
            style="text-align:center"
            :span="
              getRoles == 'admin' || crew.role == 'VolunteerManager' ? 5 : 8
            "
          >
            <FavoriteButton :poolevent_id="id" />
          </el-col>
          <el-col
            style="text-align:center"
            v-if="
              getRoles == 'admin' ||
                (crew.role == 'VolunteerManager' && crew.city == poolEvent.crew)
            "
            :span="
              getRoles == 'admin' || crew.role == 'VolunteerManager' ? 4 : 8
            "
          >
            <PooleventDropdown
              :poolevent="poolEvent"
              style="margin-top:0;padding-top:0;"
            />
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row>
      <el-card
        v-if="poolEvent.description.html"
        :title="$t('poolEventView.description')"
      >
        <div v-html="getDescription"></div>
      </el-card>
      <el-card :body-style="{ padding: '0px' }">
        <div style="margin:13px">
          <p>{{ poolEvent.location.desc }}</p>
        </div>

        <GmapMap
          :center="{
            lat: parseFloat(poolEvent.location.latitude),
            lng: parseFloat(poolEvent.location.longitude)
          }"
          :zoom="14"
          map-type-id="terrain"
          style=" width : 100%; height: 200px; "
        >
          <GmapMarker
            :position="{
              lat: parseFloat(poolEvent.location.latitude),
              lng: parseFloat(poolEvent.location.longitude)
            }"
            :key="index++"
            :clickable="true"
            :draggable="true"
          />
        </GmapMap>
      </el-card>
    </el-row>
    <el-row>
      <CommentForm v-if="isLogedIn" />
      <CommentCard />
    </el-row>
  </div>
</template>
<script>
import PooleventDropdown from "../components/PooleventDropdown";
import ApplicationButton from "../components/ApplicationButton";
import SharingButton from "../components/SharingButton";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";
import FavoriteButton from "../components/FavoriteButton";

import { mapGetters } from "vuex";

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
      currentPlace: null
    };
  },
  components: {
    ApplicationButton,
    CommentForm,
    CommentCard,
    PooleventDropdown,
    SharingButton,
    FavoriteButton
  },
  computed: {
    ...mapGetters(["getRoles", "isLogedIn", "crew", "getPoolEvent"]),
    poolEvent() {
      return this.getPoolEvent;
    },
    getDescription() {
      return this.poolEvent.description.html;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    }
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.id);
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
