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
          <b-form-group label="address:">
            <b-form-input v-model="poolEvent.address"/>
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
  data () {
    return {
      poolEvent : {
        title : "",
        type : "" ,
        address : ""
      }
    }
  }
  ,
  computed: {},
  methods: {
    addPoolEvent() {
      //post: http request to create a pool event by using axios.
      let poolEvent = {
        title : this.poolEvent.title,
        type :  this.poolEvent.type,
        address : this.poolEvent.address
        }
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
