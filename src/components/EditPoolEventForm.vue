<template>
  <VcAFrame title="Pool-Event bearbeiten" hasContainer="true">
    <el-form :model="poolEvent" :rules="rules" ref="poolEvent" class="columns-container">
      <VcAColumn>
        <VcABox :first="true" title="Eventdaten">
          <VcAInfoBox>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere molestias reprehenderit, ullam recusandae, quisquam adipisci at vero iusto tempora omnis amet cupiditate laborum repellendus debitis facilis repellat porro exercitationem magni.</VcAInfoBox>
          <el-form-item :label="$t('poolEventForm.input.title.label')" prop="title">
            <el-input
              v-model="poolEvent.title"
              :placeholder="$t('poolEventForm.input.title.placeholder')"
            ></el-input>
          </el-form-item>

          <el-form-item :label="$t('poolEventForm.input.type.label')" prop="type">
            <el-select
              v-model="poolEvent.type"
              :placeholder="$t('poolEventForm.input.type.placeholder')"
            >
              <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.website.label')" prop="website">
            <el-input
              v-model="poolEvent.website"
              :placeholder="$t('poolEventForm.input.website.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.activeUserOnly.label')">
            <el-switch v-model="poolEvent.activeUserOnly"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.start.label')" prop="start">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.start.datePicker.placeholder')"
              v-model="poolEvent.start"
              style="width: 100%;"
            ></el-date-picker>

            <el-time-picker
              :placeholder="$t('poolEventForm.input.start.timePicker.placeholder')"
              v-model="poolEvent.start"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.end.label')" prop="end">
            <el-date-picker
              type="date"
              :placeholder="$t('poolEventForm.input.end.datePicker.placeholder')"
              v-model="poolEvent.end"
              style="width: 100%;"
            ></el-date-picker>

            <el-time-picker
              :placeholder="$t('poolEventForm.input.end.timePicker.placeholder')"
              v-model="poolEvent.end"
              style="width: 100%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="asp of Event">
            <WidgetUserAutocomplete
              :preselection="involvedSupporter"
              @vca-user-selection="selectSupporter"
            />
          </el-form-item>
          <quill :config="config" v-model="poolEvent.description" output="html"></quill>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :first="true" title="Location">
          <el-form-item :label="$t('poolEventForm.input.address.label')" prop="address">
            <vue-google-autocomplete
            :value="poolEvent.address.route"
              ref="address"
              id="map"
              class="form-control"
              :placeholder="$t('poolEventForm.input.address.placeholder')"
              v-on:placechanged="getAddressData"
              country="de"
            ></vue-google-autocomplete>
          </el-form-item>
          <el-form-item label="Addressbeschreibung" prop="addressNote">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="Please input"
              v-model="poolEvent.addressNote"
            ></el-input>
          </el-form-item>
        </VcABox>
        <VcABox title="Application">
          <el-form-item
            :label="$t('poolEventForm.input.applicationStart.label')"
            prop="applicationStart"
          >
            <el-date-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationStart.datePicker.placeholder')"
              v-model="poolEvent.applicationStart"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolEvent.applicationStart"
            ></el-time-picker>
          </el-form-item>
          <el-form-item
            :label="$t('poolEventForm.input.applicationEnd.label')"
            prop="applicationEnd"
          >
            <el-date-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.datePicker.placeholder')"
              v-model="poolEvent.applicationEnd"
            ></el-date-picker>

            <el-time-picker
              style="width: 100%;"
              :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
              v-model="poolEvent.applicationEnd"
            ></el-time-picker>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.supporterLimit.label')">
            <el-input-number v-model="poolEvent.supporterLimit" :min="0" :step="1"></el-input-number>
          </el-form-item>
        </VcABox>
        <VcABox title="Erstellen">
          <el-row>
            <el-col :span="23">
              <el-button class="vca-button-primary" id="button" type="primary" @click.prevent="editPoolEvent">create</el-button>
              <el-button class="vca-button-primary" id="button" type="info" @click.prevent="editAndSaveAsDraft">save as draft</el-button>
              <el-button class="vca-button-warn" id="button" type="danger" @click.prevent="cancel">cancel</el-button>
            </el-col>
          </el-row>
        </VcABox>
      </VcAColumn>
    </el-form>
  </VcAFrame>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import { setTimeout } from "timers";
import { WidgetUserAutocomplete } from "vca-widget-user";
import "vca-widget-user/dist/vca-widget-user.css";
import rulesJon from "../rules/form";

export default {
  name: "EditPoolEventForm",
  components: {
    WidgetUserAutocomplete: WidgetUserAutocomplete,
    VueGoogleAutocomplete: VueGoogleAutocomplete,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcAInfoBox,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form
  },
  data() {
    return {
      involvedSupporter: [],
      poolEvent: this.$store.getters.getPoolEvent,
      isValidForm: "",
      rules: rulesJon.rules
    };
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editPoolEvent() {
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        console.log(this.poolEvent)
        this.$store.dispatch("EDIT_POOLEVENT", this.poolEvent);
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    },
    editAndSaveAsDraft() {
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store.dispatch("EDIT_AND_SAVE_POOLEVENT", this.poolEvent);
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
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
    selectSupporter(supporter) {
      this.involvedSupporter = supporter;
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.poolEvent.address = addressData;
    }
  },
  computed : {
    getPoolEvent(){
      return this.$store.getters.getPoolEvent
    }
  }
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
.el-select {
  display: block;
}

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
    width: 100%
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
</style>
