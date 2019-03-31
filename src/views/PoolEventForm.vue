<template>
  <VcAFrame title="form" hasContainer="true">
    <VcAColumn size="50%">
      <VcABox :first="false" title="create a new pool-event">
        <el-form :model="poolEvent" :rules="rules" class="rows-container">
          <el-form-item label="Title" :span="11">
            <el-input v-model="poolEvent.title"></el-input>
          </el-form-item>

          <el-form-item label="website">
            <el-input v-model="poolEvent.website"></el-input>
          </el-form-item>

          <el-form-item label="pool event type">
            <el-select v-model="poolEvent.type" placeholder="please select your zone">
              <el-option label="concert" value="concert"></el-option>
              <el-option label="festival" value="festival"></el-option>
              <el-option label="goldeimer festival" value="goldeimer festival"></el-option>
              <el-option label="RUN-4-WASH" value="RUN-4-WASH"></el-option>
              <el-option label="others" value="others"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="event kick-off">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.start"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="event end">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.end"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="application start">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.applicationStart"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="Pick a time"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-time-picker>
            </el-col>
          </el-form-item>

          <el-form-item label="application end">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="poolEvent.applicationEnd"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
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

          <el-form-item label="asp of event">
            <el-input v-model="poolEvent.aspOfEvent"></el-input>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click.prevent="addPoolEvent">Create</el-button>
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
        title: [{ required: true, message: '姓名是必填项', trigger: 'change'}],
        website:  [{ required: true, message: '姓名是必填项', trigger: 'change'}],
        type: null,
        address: null,
        addressNote: null,
        start: null,
        end: null,
        applicationStart: null,
        applicationEnd: null,
        supporterLimit: null,
        aspOfEvent: null,
        state: state.draft,
        message: null
      },
      eventTypes: [
        { value: null, text: "Please select an option" },
        { value: "concert", text: "concert" },
        { value: "festival", text: "festival" },
        { value: "goldeimer festival", text: "goldeimer festival" },
        { value: "network meeting", text: "network meeting" },
        { value: "Run-4-Wash", text: "Run-4-Wash" },
        { value: "others", text: "others" }
      ],
      model: null,
      rules: null
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
      this.$store.dispatch("POST_POOLEVENT", poolEvent);
      this.$router.push("/");
    },
    getAddressData(addressData) {
      this.poolEvent.address = addressData;
    },
    cancel(){
      this.$router.push('/')
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
