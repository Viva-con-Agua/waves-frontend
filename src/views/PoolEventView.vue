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
                <strong>{{poolEvent.title}}</strong>
              </h1>
              <h3 class="proile-rating">{{poolEvent.type}}</h3>
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
                    <p>{{poolEvent.start}} - {{poolEvent.end}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Address</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{poolEvent.address}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>website</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{poolEvent.website}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>asp of event</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{poolEvent.aspOfEvent}}</p>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <label>Application start</label>
                  </div>
                  <div class="col-md-6">
                    <p>
                      {{poolEvent.applicationStart}}
                    </p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>Application end</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{poolEvent.applicationEnd}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>Supporter limit</label>
                  </div>
                  <div class="col-md-6">
                    <p>{{poolEvent.supporterLimit}}</p>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <label>description:</label>
                  </div>
                  <div class="col-md-6">
                      {{poolEvent.message}}
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
                <label for="comment">Apply:</label>
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

export default {
  name: "PoolEventView",
  data(){
    return {
      id : this.$route.params.id
    }
  },
  computed:{
    poolEvent(){
      return this.$store.getters.getPoolEvent
    }
  },
  mounted(){
    this.$store.dispatch('GET_POOLEVENT_BY_ID' , this.id);
  }
}
</script>
<style>
</style>
