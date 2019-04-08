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
          <el-form-item label="title" prop="title">
            <el-input v-model="poolEvent.title" :placeholder="$t('poolEventForm.input.title.placeholder')"></el-input>
          </el-form-item>
          <el-form-item label="website:" prop="website">
            <el-input v-model="poolEvent.website" placeholder="Please type your website"></el-input>
          </el-form-item>
          <el-form-item label="address:" prop="address">
            <div>
              <vue-google-autocomplete
                ref="address"
                id="map"
                class="form-control"
                placeholder="Please type your address"
                v-on:placechanged="getAddressData"
                country="de"
              ></vue-google-autocomplete>
            </div>
          </el-form-item>
          <el-form-item label="type:" prop="type">
            <el-select v-model="poolEvent.type" value placeholder="please select your event type">
              <el-option label="concert" value="concert"></el-option>
              <el-option label="festival" value="festival"></el-option>
              <el-option label="goldeimer festival" value="goldeimer festival"></el-option>
              <el-option label="RUN-4-WASH" value="RUN-4-WASH"></el-option>
              <el-option label="others" value="others"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="event start" prop="start">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.start"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.start"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="event end" prop="end">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="application start" prop="applicationStart">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.applicationStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.applicationStart"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="application end" prop="applicationEnd">
            <el-col :span="8">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col :span="8">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="supporter limit">
            <el-input-number v-model="poolEvent.supporterLimit" :min="0" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="active user">
            <el-switch v-model="poolEvent.activeUserOnly"></el-switch>
          </el-form-item>
          <el-form-item label="asp of event">
            <WidgetUserAutocomplete
              placeholder
              :preselection="involvedSupporter"
              @vca-user-selection="selectSupporter"
            />
          </el-form-item>
          <el-form-item label="description:">
            <quill v-model="poolEvent.description" output="html"></quill>
          </el-form-item>
        </el-form>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="false" title>
        <el-button type="primary" @click.prevent="addPoolEvent">Create</el-button>
        <el-button type="info" @click.prevent="saveAsDraft">save as draft</el-button>
        <el-button type="danger" @click.prevent="cancel">Cancel</el-button>
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

const inter = {};

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
      inter: {
        en: {
          message: {
            title: "create new pool-event"
          }
        },
        de: {
          message: {
            title: "erstelle einen neuen Pool-event"
          }
        }
      },
      involvedSupporter: [],
      poolEvent: {
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
        activeUserOnly: ""
      },
      address: "",
      isValidForm: "",
      rules: {
        title: [
          {
            required: true,
            message: "Please input title",
            trigger: "blur"
          },
          {
            min: 3,
            max: 100,
            message: "Length should be 3 to 100",
            trigger: "blur"
          }
        ],
        website: [
          {
            required: true,
            message: "Please input website",
            trigger: "blur"
          },
          {
            min: 3,
            max: 100,
            message: "Length should be 3 to 100",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Please input address",
            trigger: "blur"
          }
        ],
        type: [
          {
            required: true,
            message: "Please select event type",
            trigger: "change"
          }
        ],
        start: [
          { required: true, message: "Please input start", trigger: "change" }
        ],
        end: [
          { required: true, message: "Please input end", trigger: "change" }
        ],
        applicationStart: [
          {
            required: true,
            message: "Please input application start",
            trigger: "change"
          }
        ],
        applicationEnd: [
          {
            required: true,
            message: "Please input applicaiton end",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    addPoolEvent() {
      let poolEvent = {
        title: this.poolEvent.title,
        website: this.poolEvent.website,
        type: this.poolEvent.type,
        address: this.poolEvent.address,
        addressNote: this.poolEvent.addressNote,
        start: this.poolEvent.start,
        end: this.poolEvent.end,
        applicationStart: this.poolEvent.applicationStart,
        applicationEnd: this.poolEvent.applicationEnd,
        supporterLimit: this.poolEvent.supporterLimit,
        aspOfEvent: this.poolEvent.aspOfEvent,
        state: "unreleased",
        description: this.poolEvent.description
      };
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", poolEvent)
          .then(() => {
            this.$router.push("/");
          })
          .catch(() => {
            alert("Error");
          });
      }
    },
    saveAsDraft() {
      let poolEvent = {
        title: this.poolEvent.title,
        website: this.poolEvent.website,
        type: this.poolEvent.type,
        address: this.poolEvent.address,
        addressNote: this.poolEvent.addressNote,
        start: this.poolEvent.start,
        end: this.poolEvent.end,
        applicationStart: this.poolEvent.applicationStart,
        applicationEnd: this.poolEvent.applicationEnd,
        supporterLimit: 0,
        aspOfEvent: this.poolEvent.aspOfEvent,
        state: "draft",
        description: this.poolEvent.description
      };
      this.submitForm("poolEvent");
      if (this.isValidForm) {
        this.$store
          .dispatch("POST_POOLEVENT", poolEvent)
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
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
