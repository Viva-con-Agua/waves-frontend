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
          <b-form-group label="type:">
            <b-form-input v-model="poolEvent.type"/>
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
export default {
  data() {
    return {
      poolEvent: {
        title: "",
        type: "",
        address: "",
        start: null,
        end: null,
        applicationStart: null,
        applicationEnd: null,
        supporterLimit: 0
      }
    };
  },
  computed: {},
  methods: {
    addPoolEvent() {
      //post: http request to create a pool event by using axios.
      let poolEvent = {
        title: this.poolEvent.title,
        type: this.poolEvent.type,
        address: this.poolEvent.address,
        start: this.poolEvent.start,
        end: this.poolEvent.end,
        applicationStart: this.poolEvent.applicationStart,
        applicationEnd: this.poolEvent.applicationEnd,
        supporterLimit: 0
      };
      this.$store.dispatch("POST_POOLEVENT", poolEvent);
    },
    mounted() {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.$refs.autocomplete,
        { types: ["geocode"] }
      );
    }
  }
};
</script>
<style>
.b-container.fluid {
  margin: 10px;
}
</style>
