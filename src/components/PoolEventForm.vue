<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <VcABox :first="false" :title="$t('poolEventForm.title')">
        <el-form
          label-position="left"
          label-width="140px"
          :model="poolEvent"
          :rules="rules"
          ref="poolEvent"
          class="rows-container"
        >
          <el-form-item :label="$t('poolEventForm.input.title.label')" prop="title">
            <el-input
              v-model="poolEvent.title"
              :placeholder="$t('poolEventForm.input.title.placeholder')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('poolEventForm.input.website.label')" prop="website">
            <el-input
              v-model="poolEvent.website"
              :placeholder="$t('poolEventForm.input.website.placeholder')"
            ></el-input>
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
            <el-select
              v-model="poolEvent.type"
              value
              :placeholder="$t('poolEventForm.input.type.placeholder')"
            >
              <el-option :label="$t('poolEventForm.input.type.options.concert')" value="concert"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.festival')" value="festival"></el-option>
              <el-option :label="$t('poolEventForm.input.type.options.goldEimer')" value="festival"></el-option>
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

          <el-form-item
            :label="$t('poolEventForm.input.applicationStart.label')"
            prop="applicationStart"
          >
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

          <el-form-item
            :label="$t('poolEventForm.input.applicationEnd.label')"
            prop="applicationEnd"
          >
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
            <quill
              :placeholder="$t('poolEventForm.input.description.placeholder')"
              v-model="poolEvent.description"
              output="html"
            ></quill>
          </el-form-item>
        </el-form>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="false" title>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-button id="button" type="primary" @click.prevent="addPoolEvent">create</el-button>
            <el-button id="button" type="info" @click.prevent="saveAsDraft">save as draft</el-button>
            <el-button id="button" type="danger" @click.prevent="cancel">cancel</el-button>
          </el-col>
        </el-row>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { WidgetUserAutocomplete } from "vca-widget-user";
import "vca-widget-user/dist/vca-widget-user.css";
import VueQuill from "vue-quill";
import rulesJon from "../rules/form";

export default {
  name: "PoolEventForm",
  components: {
    VueQuill,
    WidgetUserAutocomplete: WidgetUserAutocomplete,
    VueGoogleAutocomplete,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form
  },
  data() {
    return {
      content: {
        ops: []
      },
      involvedSupporter: [],
      poolEvent: {
        created: new Date(),
        title: "",
        website: "",
        type: "",
        address: "",
        addressNote: "",
        start: "",
        end: "",
        applicationStart: "",
        applicationEnd: "",
        supporterLimit: "",
        aspOfEvent: "",
        state: "unreleased",
        description: "",
        activeUserOnly: "",
        applications: []
      },
      address: "",
      isValidForm: "",
      rules: rulesJon.rules
    };
  },
  methods: {
    addPoolEvent() {
      this.poolEvent.state = "unreleased";
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", this.poolEvent)
          .then(() => {
            setTimeout(() => {
              this.$router.push("/");
            }, 3000);
          })
          .catch(() => {
            alert("Error");
          });
      }
    },
    saveAsDraft() {
      this.poolEvent.state = "draft";
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", this.poolEvent)
          .then(() => {
            this.$router.push("/");
          })
          .catch(err => {
            console.log(err.message);
          });
      }
    },
    cancel() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
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
    getAddressData: function(addressData, placeResultData, id) {
      this.poolEvent.address = addressData;
    },
    selectSupporter(supporter) {
      this.involvedSupporter = supporter;
    }
  },
  mounted() {
    // To demonstrate functionality of exposed component functions
    // Here we make focus on the user input
    this.$refs.address.focus();
  }
};
</script>
<style scoped>
.b-container.fluid {
  margin: 10px;
}
input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
#tag {
  float: left;
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
