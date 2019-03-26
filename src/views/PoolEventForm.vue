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
            <b-form-select
              v-model="poolEvent.type"
              :options="eventTypes"
              size="sm"
              class="mt-3"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group ref="autocomplete" label="address:">
            <b-form-input class="search-location" v-model="poolEvent.address"/>
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

const state = {
  draft : "DRAFT",
  released : "RELEASED",
  refused : "REFUSED",
  finished : "FINISHED",
  unreleased : "UNRELEASED"
}
export default {
  data() {
    return {
      poolEvent: {
        title: "",
        website: "",
        type: "",
        address: "",
        addressNote: "",
        start: null,
        end: null,
        applicationStart: null,
        applicationEnd: null,
        supporterLimit: 0,
        aspOfEvent : "",
        state : state.draft
      },
      eventTypes: [
        { value: null, text: "Please select an option" },
        { value: "concert", text: "concert" },
        { value: "festival", text: "festival" },
        { value: "goldeimer festival", text: "goldeimer festival" },
        { value: "network meeting", text: "network meeting" },
        { value: "Run-4-Wash", text: "Run-4-Wash" },
        { value: "others", text: "others" }
      ]
    };
  },
  computed: {},
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
        aspOfEvent : this.poolEvent.aspOfEvent,
        state : this.state
      };
      this.$store.dispatch("POST_POOLEVENT", poolEvent);
    }
  }
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
