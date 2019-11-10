<template>
  <div id="app">
    <WidgetTopNavigation/>
    <router-view/>
    <WidgetBottomNavigation/>
  </div>
</template>
<script>

import VueQuill from "vue-quill";
import Vue from "vue";
import {WidgetTopNavigation,WidgetBottomNavigation} from "vca-widget-navigation";
import feather from 'vue-icon'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import io from "socket.io-client";

Vue.use(VueMaterial)
Vue.use(feather, 'v-icon')
Vue.use(VueQuill);

export default {
  name: "app",
  components: {
    WidgetTopNavigation,
    WidgetBottomNavigation
  },
  data(){
    return{
      socket : io('localhost:5000/waves')
    }
  },
  mounted(){
    this.socket.emit("scoop");
  }
};
</script>

<style lang="less">
    @import "assets/less/form";
    #app {
       
    }
    #content {
        flex-grow: 1;
        display: flex;
        overflow: auto;
    }
    
</style>
