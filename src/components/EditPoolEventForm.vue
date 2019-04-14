<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <VcABox :first="false" :title="$t('poolEventForm.editFormTitle')">
        <el-form
          label-position="left"
          label-width="140px"
          :model="poolEvent"
          :rules="rules"
          ref="poolEvent"
          class="rows-container"
        >
          <el-form-item :label="$t('poolEventForm.input.title.label')" prop="title">
            <el-input v-model="poolEvent.title" :placeholder="$t('poolEventForm.input.title.placeholder')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.website.label')" prop="website">
            <el-input v-model="poolEvent.website" :placeholder="$t('poolEventForm.input.website.placeholder')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.address.label')" prop="address">
            <div>
              <vue-google-autocomplete
                ref="address"
                id="map"
                class="form-control"
                :placeholder="$t('poolEventForm.input.address.placeholder')"
                v-on:placechanged="getAddressData"
                country="de"
              ></vue-google-autocomplete>
            </div>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.type.label')" prop="type">
            <el-select v-model="poolEvent.type" value :placeholder="$t('poolEventForm.input.type.placeholder')">
              <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="goldeimerFestival"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.RUN4WASH')" value="RUN4WASH"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.others')" value="others"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.start.label')" prop="start">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('poolEventForm.input.start.datePicker.placeholder')"
                v-model="poolEvent.start"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                :placeholder="$t('poolEventForm.input.start.timePicker.placeholder')"
                v-model="poolEvent.start"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.end.label')" prop="end">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('poolEventForm.input.end.datePicker.placeholder')"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                :placeholder="$t('poolEventForm.input.end.timePicker.placeholder')"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item :label="$t('poolEventForm.input.applicationStart.label')" prop="applicationStart">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('poolEventForm.input.applicationStart.datePicker.placeholder')"
                v-model="poolEvent.applicationStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
                v-model="poolEvent.applicationStart"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item :label="$t('poolEventForm.input.applicationEnd.label')" prop="applicationEnd">
            <el-col :span="8">
              <el-date-picker
                type="date"
                :placeholder="$t('poolEventForm.input.applicationEnd.datePicker.placeholder')"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                :placeholder="$t('poolEventForm.input.applicationEnd.timePicker.placeholder')"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.supporterLimit.label')">
            <el-input-number v-model="poolEvent.supporterLimit" :min="0" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.activeUserOnly.label')">
            <el-switch v-model="poolEvent.activeUserOnly"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.aspOfEvent.label')">
            <WidgetUserAutocomplete
              :preselection="involvedSupporter"
              @vca-user-selection="selectSupporter"
            />
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.description.label')">
            <quill :placeholder="$t('poolEventForm.input.description.placeholder')" v-model="poolEvent.description" output="html"></quill>
          </el-form-item>
        </el-form>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="false" title>
        <el-button type="primary" @click.prevent="editPoolEvent">Create</el-button>
        <el-button type="info" @click.prevent="editAndSaveAsDraft">save as draft</el-button>
        <el-button type="danger" @click.prevent="cancel">Cancel</el-button>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import { setTimeout } from 'timers';
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
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form
  },
  data() {
    return {
      involvedSupporter: [],
      poolEvent: this.$store.getters.getPoolEvent,
      id: this.$route.params.id,
      isValidForm: "",
      rules: rulesJon.rules,
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
        this.$store.dispatch("EDIT_POOLEVENT", this.poolEvent);
        setTimeout(() => {
            this.$router.push('/');
        },2000);
      }
    },
    editAndSaveAsDraft() {
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store.dispatch("EDIT_AND_SAVE_POOLEVENT", this.poolEvent);
        setTimeout(() => {
            this.$router.push('/');
        },2000);
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
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.id);
    this.$refs.address.focus();
  }
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
