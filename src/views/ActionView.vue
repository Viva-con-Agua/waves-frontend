<template>
  <div id="app">
    <div class="container emp-profile">
      <form method="post">
        
        <div class="row">
          <div class="col-md-3">
            <div class="profile-img">
              <img src alt>
            </div>
          </div>
          <div class="col-md-6">
            <div class="profile-head">
              <h1>
                <strong>{{actions[0].title}}</strong>
              </h1>
              <h3 class="proile-rating">{{actions[0].type}}</h3>
              <ul class="nav nav-tabs" id="myTab" role="tablist"></ul>
            </div>
          </div>
          <div class="col-md-2"></div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="tab-content profile-tab" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="row">
                  <div class="col-md-6">
                    <label>Time period</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{actions[0].start}} - {{actions[0].end}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Address</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{actions[0].location.address}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>City</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{actions[0].location.city}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Post code</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{actions[0].location.postCode}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Application deadline</label>
                  </div>
                  <div class="col-md-6">
                    <p>
                      {{actions[0].application_deadline.end}},
                      {{actions[0].application_deadline.day}}
                      {{actions[0].application_deadline.month}}
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>#supporter</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{actions[0].participants.limit}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <form>
              <div class="form-group">
                <label for="comment">message:</label>
                <textarea class="form-control" rows="5" id="comment"></textarea>
                <button class="btn btn-primary" style="margin:10px">apply</button>
              </div>
            </form>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import test_data from "../../testdata/data.json";
export default {
  name: "ActionView",
  props:[],

  data() {
    return test_data;
  },
  computed:{
    actions () {
      
    }
  }
};
</script>

<style>
</style>
