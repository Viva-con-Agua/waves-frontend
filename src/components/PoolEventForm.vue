<template>
  <VcAFrame title="Pool-Event erstellen" hasContainer="true">
    <el-form :model="poolEvent" :rules="rules" ref="poolEvent" class="columns-container">
      <VcAColumn>
        <VcABox :expand="true" :first="true" title="Eventdaten">
          <VcAInfoBox>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias reprehenderit, ullam recusandae, quisquam adipisci at vero iusto tempora omnis amet cupiditate laborum repellendus debitis facilis repellat porro exercitationem magni.</VcAInfoBox>
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
            <WidgetUserAutocomplete
              :preselection="involvedSupporter"
              @vca-user-selection="selectSupporter"
            />
          </el-form-item>

          <quill :config="config" v-model="description.html" output="html"></quill>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" title="Location">
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
              v-model="address_desc"
              type="textarea"
              :rows="2"
              placeholder="Please input"
              :maxLength="240"
            ></el-input>
          </el-form-item>
        </VcABox>
        <VcABox title="Application" :expand="true">
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
        </VcABox>
        <VcABox title="Erstellen">
          <el-row>
            <el-col>
              <el-button
                class="vca-button-primary"
                type="primary"
                @click.prevent="addPoolEvent"
                style="margin-left:0;margin-right:0"
              >create</el-button>
              <el-button
                class="vca-button-primary"
                type="info"
                @click.prevent="saveAsDraft"
                style="margin-left:0;margin-right:0"
              >save as draft</el-button>
              <el-button
                style="margin-left:0;margin-right:0"
                class="vca-button-warn"
                type="danger"
                @click.prevent="cancel"
              >cancel</el-button>
            </el-col>
          </el-row>
        </VcABox>
      </VcAColumn>
    </el-form>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { WidgetUserAutocomplete } from "vca-widget-user";
import "vca-widget-user/dist/vca-widget-user.css";
import "../assets/pool_event_style.css";
import rulesJon from "../rules/form";

export default {
  name: "PoolEventForm",
  components: {
    WidgetUserAutocomplete: WidgetUserAutocomplete,
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
        asp_event_Id: 0,
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
      }
    };
  },
  mounter() {
    this.errors = this.$store.state.errors;
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
      console.log(data);
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
      console.log(data);
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", this.poolEvent)
          .then(() => {
            //this.$router.push("/");
          })
          .catch(err => {
            throw err;
          });
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAddressData: function(addressData) {
      this.address = addressData;
    },
    selectSupporter(supporter) {
      this.involvedSupporter = supporter;
    }
  }
};
</script>
<style lang="less" scoped>
</style>
