<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <VcABox :first="false" title="create a new pool-event">
        <el-form :model="poolEvent" :rules="rules" ref="poolEvent" class="rows-container">
          <el-form-item label="title" prop="title">
            <el-col :span="20" :offset="1">
              <el-input v-model="poolEvent.title"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="website:" prop="website">
            <el-col :span="20" :offset="1">
              <el-input v-model="poolEvent.website"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="address:" prop="address">
            <el-col :span="20" :offset="1">
              <el-input v-model="poolEvent.address"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="type:" prop="type">
            <el-col :span="20" :offset="1">
              <el-select v-model="poolEvent.type" value placeholder="please select your event type">
                <el-option label="concert" value="concert"></el-option>
                <el-option label="festival" value="festival"></el-option>
                <el-option label="goldeimer festival" value="goldeimer festival"></el-option>
                <el-option label="RUN-4-WASH" value="RUN-4-WASH"></el-option>
                <el-option label="others" value="others"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="event kick-off" prop="start">
            <el-col :span="8" :offset="1">
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
                v-model="poolEvent.end"
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
                v-model="poolEvent.applicationEnd"
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
            <el-col :span="8">
              <el-input-number v-model="poolEvent.supporterLimit" :min="0" :step="1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="asp of event" prop="aspOfEvent">
            <el-col :span="8">
              <el-input v-model="poolEvent.aspOfEvent"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click.prevent="addPoolEvent">Create</el-button>
            <el-button type="info" @click.prevent="saveAsDraft">save as draft</el-button>
            <el-button @click.prevent="cancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </VcABox>
    </VcAColumn>
    <VcAColumn>
      <VcABox :first="false" title="create a new pool-event"></VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import MessageEditor from "../components/MessageEditor";
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";

const state = {
  draft: "DRAFT",
  released: "RELEASED",
  refused: "REFUSED",
  finished: "FINISHED",
  unreleased: "UNRELEASED"
};
export default {
  components: {
    VueGoogleAutocomplete: VueGoogleAutocomplete,
    MessageEditor: MessageEditor,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form
  },
  data() {
    return {
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
        state: state.draft,
        message: ""
      },
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
          },
          {
            min: 3,
            max: 100,
            message: "Length should be 3 to 24",
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
        supporterLimit: 0,
        aspOfEvent: this.poolEvent.aspOfEvent,
        state: this.poolEvent.state,
        message: this.poolEvent.message
      };
      if (this.submitForm("poolEvent")) {
        this.$store.dispatch("POST_POOLEVENT", poolEvent);
        this.$router.push("/");
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
        state: state.draft,
        message: this.poolEvent.message
      };
      this.$store.dispatch("POST_POOLEVENT", poolEvent);
      this.$router.push("/");
    },
    getAddressData(addressData) {
      this.poolEvent.address = addressData;
    },
    cancel() {
      this.$router.push("/");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  } //,
  //mounted() {
  // To demonstrate functionality of exposed component functions
  // Here we make focus on the user input
  //this.$refs.address.focus();
  //}
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
