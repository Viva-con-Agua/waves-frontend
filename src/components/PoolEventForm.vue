<template>
  <VcAFrame title="Poolevent erstellen" hasContainer="true">
    <el-form :model="poolevent" :rules="rules" ref="poolevent" class="columns-container">
      <VcAColumn>
        <VcABox :expand="true" :first="true" title="Aktion">
          <el-form-item :label="$t('poolEventForm.input.title.label')" prop="front.name">
            <el-input
              v-model="poolevent.front.name"
              :placeholder="$t('poolEventForm.input.title.placeholder')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('poolEventForm.input.type.label')" prop="front.type">
            <el-select
              v-model="poolevent.front.type"
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
          <el-form-item :label="$t('poolEventForm.input.website.label')" prop="front.website">
            <el-input
              v-model="poolevent.front.website"
              :placeholder="$t('poolEventForm.input.website.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.activeUserOnly.label')">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="poolevent.front.active_user_only"
            ></el-switch>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.start.label')" prop="front.event_start">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.start.datePicker.placeholder')"
              v-model="poolevent.front.event_start"
              style="width: 100%;"
            ></el-date-picker>
            <el-time-picker
              :placeholder="$t('poolEventForm.input.start.timePicker.placeholder')"
              v-model="poolevent.front.event_start"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.end.label')" prop="front.event_end">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.end.datePicker.placeholder')"
              v-model="poolevent.front.event_end"
              style="width: 100%;"
            ></el-date-picker>

            <el-time-picker
              :placeholder="$t('poolEventForm.input.end.timePicker.placeholder')"
              v-model="poolevent.front.event_end"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <WidgetUserAutocomplete placeholde="Ansprechpartner" :preselection="[poolevent.front.asp_event_id]" @vca-user-selection="selectASP">
<!--          <el-form-item label="Ansprechpartner">-->
<!--            <el-select-->
<!--              style="width:100%"-->
<!--              multiple-->
<!--              filterable-->
<!--              allow-create-->
<!--              v-model="poolevent.front.asp_event_id"-->
<!--            >-->
<!--              <el-option-->
<!--                v-for="user in users"-->
<!--                :key="user.id"-->
<!--                :label="user.last_name"-->
<!--                :value="user.id"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <quill :config="config" v-model="poolevent.description.html" output="html"></quill>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <el-card :first="true" title="Location">
          <el-form-item
            :label="$t('poolEventForm.input.address.label')"
            prop="location.full_address"
          >
            <vue-google-autocomplete
              ref="location"
              id="map"
              class="form-control"
              :placeholder="$t('poolEventForm.input.address.placeholder')"
              v-on:placechanged="getAddressData"
              v-model="poolevent.location.full_address"
            ></vue-google-autocomplete>
          </el-form-item>
          <el-row>
            <el-col :span="16">
              <el-form-item label="street name" prop="location.route">
                <el-input v-model="poolevent.location.route" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col style="margin-left:10px" :span="7">
              <el-form-item label="number" prop="location.street_number">
                <el-input v-model="poolevent.location.street_number" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="city" prop="location.locality">
                <el-input v-model="poolevent.location.locality" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col style="margin-left:10px" :span="7">
              <el-form-item label="postal code" prop="location.postal_code">
                <el-input v-model="poolevent.location.postal_code" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="Adressbeschreibung">
            <el-input
              show-word-limit
              placeholder="Please input"
              v-model="poolevent.location.desc"
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
              v-model="poolevent.front.application_start"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolevent.front.application_start"
            ></el-time-picker>
          </el-form-item>
          <el-form-item
            :label="$t('poolEventForm.input.applicationEnd.label')"
            prop="application_end"
          >
            <el-date-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.datePicker.placeholder')"
              v-model="poolevent.front.application_end"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolevent.front.application_end"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.supporterLimit.label')">
            <el-input-number v-model="poolevent.front.supporter_lim" :min="0" :step="1"></el-input-number>
          </el-form-item>
        </el-card>
        <el-card title="Erstellen">
          <el-row>
            <el-col>
              <el-button
                class="vca-button-primary"
                type="primary"
                @click.prevent="()=> addPoolEvent('UNRELEASED')"
                style="margin-left:0;margin-right:0;"
                size="mini"
              >CREATE</el-button>
              <el-button
                class="vca-button-primary"
                type="info"
                @click.prevent="saveAsDraft('DRAFT')"
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
import { WidgetUserAutocomplete } from "vca-widget-user";
import { Input, Form } from "element-ui";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import "../assets/pool_event_style.css";
import rulesJson from "../rules/form";
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
    VcAInfoBox: VcAInfoBox,
    WidgetUserAutocomplete: WidgetUserAutocomplete
  },
  data() {
    return {
      users: [],
      errors: [],
      content: {
        ops: []
      },
      involvedSupporter: [],
      poolevent: {
        front: {
          name: "",
          event_start: "",
          event_end: "",
          application_start: "",
          application_end: "",
          asp_event_id: "",
          website: "",
          supporter_lim: 0,
          active_user_only: "",
          type: ""
        },
        location: {
          locality: "",
          country: "",
          latitude: "",
          longitude: "",
          postal_code: "",
          route: "",
          street_number: "",
          full_address: ""
        },
        description: {
          text: "",
          html: ""
        }
      },
      isValidForm: "",
      rules: rulesJson.rules,
      config: {
        placeholder: "Compose a description",
        label: "Beschreibung"
      }
    };
  },
  async mounted() {
    this.errors = this.$store.state.errors;
    await this.fetchAllUsers();
    if (this.$route.params.id) {
      await this.fetchPooleventById(this.$route.params.id);
    }
    const {
      locality,
      postal_code,
      route,
      street_number
    } = this.poolevent.location;
    this.poolevent.location.full_address = route
      ? `${route} ${street_number}, ${postal_code} ${locality}`
      : "";
    console.log("-->", this.poolevent);
  },
  methods: {
    selectASP(event) {
      var asp = ""
      if(Array.isArray(event) && event.length) {
        asp = event[0]
      }
      this.poolevent.front.asp_event_id = asp
    },
    addPoolEvent(option) {
      if (this.$route.params.id == undefined) {
        this.submitForm("poolevent");
        if (this.isValidForm) {
          this.$store.dispatch("POST_POOLEVENT", this.poolevent);
        }
      } else if (this.$route.params.id != undefined) {
        this.$store.dispatch("PUT_POOLEVENT", {
          poolevent: this.poolevent,
          id: this.$route.params.id
        });
      }
    },
    cancel() {
      this.$router.push("/waves");
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
    getAddressData(addressData) {
      this.poolevent.location.locality = addressData.locality;
      this.poolevent.location.postal_code = addressData.postal_code;
      this.poolevent.location.route = addressData.route;
      this.poolevent.location.street_number = addressData.street_number;
      this.poolevent.location.latitude = addressData.latitude.toString();
      this.poolevent.location.longitude = addressData.longitude.toString();
      const {
        locality,
        postal_code,
        route,
        street_number
      } = this.poolevent.location;
      this.poolevent.location.full_address = `${route} ${street_number}, ${postal_code} ${locality}`;
    },
    selectSupporter(supporter) {
      this.involvedSupporter = supporter;
    },
    async fetchPooleventById(id) {
      const { data } = await Axios.get(`/waves/api/v1/poolevent/${id}`);
      const { location, description, ...front } = data.data;
      this.poolevent.description.html = description.html;
      this.poolevent.description.text = description.text;
      this.poolevent.location.route = location.route;
      this.poolevent.location.street_number = location.street_number;
      this.poolevent.location.postal_code = location.postal_code;
      this.poolevent.location.locality = location.locality;
      this.poolevent.location.desc = location.desc;
      this.poolevent.location.latitude = location.latitude;
      this.poolevent.location.longitude = location.longitude;
      this.poolevent.location.full_address = location.full_address;
      this.poolevent.front.name = front.name;
      this.poolevent.front.event_start = front.event_start;
      this.poolevent.front.event_end = front.event_end;
      this.poolevent.front.application_start = front.application_start;
      this.poolevent.front.application_end = front.application_end;
      this.poolevent.front.website = front.website;
      this.poolevent.front.type = front.type;
      this.poolevent.front.asp_event_id = front.asp_event_id;
      this.poolevent.front.supporter_lim = front.supporter_lim;
      this.poolevent.front.supporter_lim = front.supporter_lim;
    }
  }
};
</script>
