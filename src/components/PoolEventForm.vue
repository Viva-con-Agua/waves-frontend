<template>
  <VcAFrame title="Pool-Event erstellen" hasContainer="true">
    <el-form :model="poolEvent" :rules="rules" ref="poolEvent" class="columns-container">
      <VcAColumn>
        <VcABox :expand="true" :first="true" title="Aktion">
          <el-form-item :label="$t('poolEventForm.input.title.label')" prop="name">
            <el-input
              v-model="poolEvent.name"
              :placeholder="$t('poolEventForm.input.title.placeholder')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('poolEventForm.input.type.label')" prop="type">
            <el-select
              v-model="poolEvent.type"
              :placeholder="$t('poolEventForm.input.type.placeholder')"
              style="width:100%"
            >
              <el-option :label="$t('poolEventForm.input.type.options.concert')" value="CONCERT"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.festival')" value="FESTIVAL"></el-option>
              <el-option
                :label="$t('poolEventForm.input.type.options.goldEimer')"
                value="GOLDEIMER_FESTIVAL"
              ></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.others')" value="OTHER"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.website.label')" prop="website">
            <el-input
              v-model="poolEvent.website"
              :placeholder="$t('poolEventForm.input.website.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.activeUserOnly.label')">
            <el-switch :active-value="1" :inactive-value="0" v-model="poolEvent.active_user_only"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.start.label')" prop="event_start">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.start.datePicker.placeholder')"
              v-model="poolEvent.event_start"
              style="width: 100%;"
            ></el-date-picker>
            <el-time-picker
              :placeholder="$t('poolEventForm.input.start.timePicker.placeholder')"
              v-model="poolEvent.event_start"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.end.label')" prop="event_end">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.end.datePicker.placeholder')"
              v-model="poolEvent.event_end"
              style="width: 100%;"
            ></el-date-picker>

            <el-time-picker
              :placeholder="$t('poolEventForm.input.end.timePicker.placeholder')"
              v-model="poolEvent.event_end"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="asp of Event">
            <el-select style="width:100%" multiple filterable allow-create v-model="poolEvent.asp_event_id">
              <el-option
                v-for="user in users"
                :key="user.id"
                :label="user.last_name"
                :value="user.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <quill :config="config"  v-model="description.html" output="html"></quill>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <el-card :first="true" title="Location">
          <el-form-item :label="$t('poolEventForm.input.address.label')" prop="address">
            <vue-google-autocomplete
              ref="address"
              id="map"
              class="form-control"
              :placeholder="$t('poolEventForm.input.address.placeholder')"
              v-on:placechanged="getAddressData"
              country="de"
            ></vue-google-autocomplete>
          </el-form-item>
          <el-form-item label="Adressbeschreibung">
            <el-input
              show-word-limit
              placeholder="Please input"
              v-model="address_desc"
              maxlength="1000"
              :autosize="{minRows: 2, maxRows:10}"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-card>
        <el-card title="Application" :expand="true">
          <el-form-item
            :label="$t('poolEventForm.input.applicationStart.label')"
            prop="application_start"
          >
            <el-date-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationStart.datePicker.placeholder')"
              v-model="poolEvent.application_start"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolEvent.application_start"
            ></el-time-picker>
          </el-form-item>
          <el-form-item
            :label="$t('poolEventForm.input.applicationEnd.label')"
            prop="application_end"
          >
            <el-date-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.datePicker.placeholder')"
              v-model="poolEvent.application_end"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolEvent.application_end"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.supporterLimit.label')">
            <el-input-number v-model="poolEvent.supporter_lim" :min="0" :step="1"></el-input-number>
          </el-form-item>
        </el-card>
        <el-card title="Erstellen">
          <el-row>
            <el-col>
              <el-button
                class="vca-button-primary"
                type="primary"
                @click.prevent="addPoolEvent"
                style="margin-left:0;margin-right:0;"
                size="mini"
              >CREATE</el-button>
              <el-button
                class="vca-button-primary"
                type="info"
                @click.prevent="saveAsDraft"
                style="margin-left:0;margin-right:0;margin-top:10px"
                size="mini"
              >SAVE AS DRAFT</el-button>
              <el-button
                style="margin-left:0;margin-right:0;margin-top:10px"
                class="vca-button-warn"
                type="danger"
                @click.prevent="cancel"
                size="mini"
              >CANCEL</el-button>
            </el-col>
          </el-row>
        </el-card>
      </VcAColumn>
    </el-form>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import "../assets/pool_event_style.css";
import rulesJon from "../rules/form";
import Axios from "axios";

export default {
  name: "PoolEventForm",
  components: {
    VueGoogleAutocomplete,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form,
    VcAInfoBox: VcAInfoBox
  },
  data() {
    return {
      users: [],
      errors: [],
      content: {
        ops: []
      },
      involvedSupporter: [],
      poolEvent: {
        name: "",
        event_start: "",
        event_end: "",
        application_start: "",
        application_end: "",
        asp_event_id: "",
        website: "",
        supporter_lim: 0,
        active_user_only: "",
        state: "UNRELEASED"
      },
      description: {
        text: "",
        html: ""
      },
      address: "",
      address_desc: "",
      isValidForm: "",
      rules: rulesJon.rules,
      config: {
        placeholder: "Compose a description",
        label: "Beschreibung"
      },
      poolevent: ""
    };
  },
  async mounted() {
    this.errors = this.$store.state.errors;
    await this.fetchAllUsers();
    if (this.$route.params.id) {
      await this.fetchPooleventById(this.$route.params.id);
    }
  },
  methods: {
    addPoolEvent() {
      const data = {};
      data.poolevent = this.poolEvent;
      data.poolevent.event_start = new Date(
        data.poolevent.event_start
      ).toISOString();
      data.poolevent.event_end = new Date(
        data.poolevent.event_end
      ).toISOString();
      data.poolevent.application_start = new Date(
        data.poolevent.application_start
      ).toISOString();
      data.poolevent.application_end = new Date(
        data.poolevent.application_end
      ).toISOString();

      const {
        locality,
        country,
        latitude,
        longitude,
        postal_code,
        route,
        street_number
      } = this.address;
      data.location = {
        street_name: route,
        street_number: street_number,
        long: longitude.toString() || "",
        lat: latitude.toString() || "",
        city: locality,
        country: country,
        post_code: postal_code,
        desc: this.address_desc
      };
      data.description = this.description;
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", {
            config: {
              headers: {
                Authorization: `bearer ${this.$cookies.get("access_token")}`
              }
            },
            poolevent: data
          })
          .then(() => {
            setTimeout(() => {
              //this.$router.push("/");
            }, 3000);
          })
          .catch(() => {
            alert("Error");
          });
      }
    },
    saveAsDraft() {
      const data = {};
      data.poolevent = this.poolEvent;
      data.poolevent.event_start = new Date(
        data.poolevent.event_start
      ).toISOString();
      data.poolevent.event_end = new Date(
        data.poolevent.event_end
      ).toISOString();
      data.poolevent.application_start = new Date(
        data.poolevent.application_start
      ).toISOString();
      data.poolevent.application_end = new Date(
        data.poolevent.application_end
      ).toISOString();

      const {
        locality,
        country,
        latitude,
        longitude,
        postal_code,
        route,
        street_number
      } = this.address;
      data.location = {
        street_name: route,
        street_number: street_number,
        long: longitude.toString() || "",
        lat: latitude.toString() || "",
        city: locality,
        country: country,
        post_code: postal_code,
        desc: this.address_desc
      };
      data.description = this.description;
      data.poolevent.state = "DRAFT";
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store.dispatch("POST_POOLEVENT", this.poolEvent);
      }
    },
    cancel() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isValidForm = valid;
        } else {
          this.isValidForm = valid;
        }
      });
    },
    async fetchAllUsers() {
      const { data } = await Axios.get("/waves/api/v1/user");
      this.users = data.data;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAddressData: function(addressData) {
      this.address = addressData;
    },
    selectSupporter(supporter) {
      this.involvedSupporter = supporter;
    },
    async fetchPooleventById(id) {
      const { data } = await Axios.get(`/waves/api/v1/poolevent/${id}`);
      this.poolevent = data.data;
      const { location, description, ...poolevent } = data.data;
      console.log( '-->',description.html);
      this.poolEvent = poolevent;

      this.description = description;
    }
  }
};
</script>
