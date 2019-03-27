<template>
  <div class="page-non-script">
    <b-form @submit.prevent="addPoolEvent">
      <b-row>
        <b-col cols="6">
          <b-form-group label="title:">
            <b-form-input v-model="poolEvent.title"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="website:">
            <b-form-input v-model="poolEvent.website"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="type:">
            <b-form-select v-model="poolEvent.type" :options="eventTypes" size="sm" class="mt-3"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group ref="autocomplete" label="address:">
            <vue-google-autocomplete
              ref="address"
              id="map"
              class="form-control"
              placeholder="Please type your address"
              v-on:placechanged="getAddressData"
            ></vue-google-autocomplete>
            <br>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="address note:">
            <textarea
              class="form-control"
              v-model="poolEvent.addressNote"
              placeholder="add multiple lines"
            ></textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="start:">
            <b-form-input type="date" v-model="poolEvent.start"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="end:">
            <b-form-input type="date" v-model="poolEvent.end"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="application start:">
            <b-form-input type="date" v-model="poolEvent.applicationStart"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="application end:">
            <b-form-input type="date" v-model="poolEvent.applicationEnd"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="supporter limit:">
            <b-form-input type="number" v-model="poolEvent.supporterLimit"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="asp of event:">
            <b-form-input type="text" v-model="poolEvent.aspOfEvent"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="message:">
            <quill v-model="poolEvent.message" output="html"></quill>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6"></b-col>
      </b-row>
      <b-row>
        <b-col cols="12"></b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import MessageEditor from "../components/MessageEditor";

const state = {
  draft: "DRAFT",
  released: "RELEASED",
  refused: "REFUSED",
  finished: "FINISHED",
  unreleased: "UNRELEASED"
};
export default {
  components: { VueGoogleAutocomplete, MessageEditor },
  data() {
    return {
      poolEvent: {
        title: null,
        website: null,
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
        message : null
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
      model: null
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
        message : this.poolEvent.message
      };
      this.$store.dispatch("POST_POOLEVENT", poolEvent);
    },
    getAddressData(addressData) {
      this.poolEvent.address = addressData;
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
