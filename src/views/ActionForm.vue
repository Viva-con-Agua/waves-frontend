<template>

  <b-container fluid>    
    <form action="" method="post">
      <b-row class="my-1" v-for="type_label in type_labels" :key="type_label">
      <b-col sm="3">
        <label :for="`type-${type_label.label}`"><strong> {{ type_label.label }}: </strong></label>
      </b-col>
      <b-col sm="9">
        <b-form-input :id="`type-${type_label.type}`" :type="type_label.type"/>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col sm="3">
      </b-col>
      <b-col sm="9">
          <button type="submit" class="btn btn-primary">Submit</button>
      </b-col>
    </b-row>
    </form>
  </b-container>

</template>

<script>
export default {
  data() {
    return {
      type_labels: [
        { type: "text", label: "title" },
        { type: "address", label: "address" },
        { type: "text-area", label: "anfahrt" },
        { type: "text", label: "additional note" },
        { type: "tel", label: "title" },
        { type: "date", label: "start" },
        { type: "time", label: "start" },
        { type: "date", label: "ende" },
        { type: "time", label: "ende" },
        { type: "text", label: "asp name" },
        { type: "email", label: "asp email" },
        { type: "tel", label: "phone nummer" },
        { type: "time", label: "ende" },
        { type: "time", label: "application start" },
        { type: "time", label: "application end" },
        { type: "number", label: "number of applicants" },
      ]
    };
  }
};
</script>
<style>
.b-container.fluid{
  margin:10px
}
</style>
