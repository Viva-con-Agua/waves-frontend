<template>
  <VcAFrame>
    <VcAColumn size="50%">
      <VcABox :first="false" title="create a new pool-event">
        <el-form :model="poolEvent" :rules="rules" ref="poolEvent" class="rows-container">
          <el-form-item label="title" prop="title">

              <el-input v-model="poolEvent.title"></el-input>

          </el-form-item>
          <el-form-item label="website:" prop="website">
            <el-col :span="20" :offset="1">
              <el-input v-model="poolEvent.website"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="address:" prop="address">
            <el-col :span="20" :offset="1">
              <el-input v-model="poolEvent.address.route"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="type:" prop="type">
            <el-col :span="20" :offset="1">
              <el-select
                v-model="poolEvent.type"
                :value="poolEvent.type"
                placeholder="please select your event type"
              >
                <el-option label="concert" value="concert"></el-option>
                <el-option label="festival" value="festival"></el-option>
                <el-option label="goldeimer festival" value="goldeimer festival"></el-option>
                <el-option label="RUN-4-WASH" value="RUN-4-WASH"></el-option>
                <el-option label="RUN-4-WASH" value="network meeting"></el-option>
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
            <el-col :span="8">
              <el-input-number v-model="poolEvent.supporterLimit" :min="0" :step="1"></el-input-number>
            </el-col>
          </el-form-item>
          <el-form-item label="asp of event">
            <el-col :span="8">
              <el-input v-model="poolEvent.aspOfEvent"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="active user">
          <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click.prevent="editPoolEvent">Create</el-button>
            <el-button v-if="poolEvent.state==='draft'" type="info" @click.prevent="editAndSaveAsDraft">save as draft</el-button>
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
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import { setTimeout } from 'timers';

const state = {
  draft: "draft",
  released: "released",
  refused: "refused",
  finished: "finnished",
  unreleased: "unreleased"
};
export default {
  name: "EditPoolEventForm",
  components: {
    VueGoogleAutocomplete: VueGoogleAutocomplete,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form
  },
  data() {
    return {
      poolEvent: this.$store.getters.getPoolEvent,
      id: this.$route.params.id,
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
  },
  mounted() {
    this.$store.dispatch("GET_POOLEVENT_BY_ID", this.id);
  }
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
