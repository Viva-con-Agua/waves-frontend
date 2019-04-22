<template>
  <VcAFrame title="Pool-Event erstellen" hasContainer="true">
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
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="poolEvent.activeUserOnly"
            ></el-switch>
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
            <el-col :span="16" :offset="4">
              <el-button id="button" type="primary" @click.prevent="addPoolEvent">create</el-button>
              <el-button id="button" type="info" @click.prevent="saveAsDraft">save as draft</el-button>
              <el-button id="button" type="danger" @click.prevent="cancel">cancel</el-button>
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
    "el-form": Form,
    VcAInfoBox: VcAInfoBox
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
      rules: rulesJon.rules,
      config: {
        placeholder: "Compose a description",
        label: "Description"
      }
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
  }
};
</script>
<style lang="less" scoped>
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

.buttonSignUp {
  margin-top: 1em;
  margin-bottom: 1em;
  width: 100%;
  /*padding-top: 0.6em;*/
}
/*.suggestions {*/
/*line-height: 1em;*/
/*}*/
el-form-item {
  float: left;
}
.genderOptions {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 0 0.5em;
  .el-radio {
    margin: 0em;
    padding-left: 0.5em;
  }
}
#genContent {
  float: left;
  clear: both;
  width: 100%;
}
</style>
