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

Vue.use(VueQuill);

export default {
  name: "app",
  components: {
    WidgetTopNavigation,
    WidgetBottomNavigation
  }
};
</script>

<style lang="less">
    @import "assets/less/form";
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: min-content;
    }
    #content {
        flex-grow: 1;
        display: flex;
        overflow: auto;
    }
</style>
