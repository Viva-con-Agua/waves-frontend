<template>
  <div id="app">
    <Navbar :logout="logout"></Navbar>
    <router-view />
  </div>
</template>
<script>
import VueQuill from "vue-quill";
import Vue from "vue";
import feather from "vue-icon";
import io from "socket.io-client";
import { Button, Select } from "element-ui";
import Navbar from "./components/Navbar";
import vueCookies from "vue-cookies";

Vue.component(Select.name, Select);
Vue.component(Button.name, Button);

Vue.use(feather, "v-icon");
Vue.use(VueQuill);
Vue.use(vueCookies);

export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {
      socket: io("localhost:5000"),
      errors: []
    };
  },
  created() {
    this.socket.on("NEW_POOLEVENT", pooleventId => {
      this.$notify({
        title: `Event with id: ${pooleventId} was added`,
        message: "click ",
        type: "success"
      });
    });
    this.socket.on("NEW_BADGE", data => {
      this.$notify({
        title: "New Badge",
        message: "click ",
        type: "success"
      });
    });
  },
  methods: {
    logout() {
      try {
        this.$cookies.remove("full_name");
        this.$cookies.remove("role");
        this.$cookies.remove("access_token");
      } catch (error) {
        throw error;
      }
    }
  },
  mounted() {
    if (this.$cookies.get("access_token")) {
      this.$store.dispatch("SET_ACCESS_TOKEN", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("access_token")}`
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "assets/less/form";
#app {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0%;
}
#content {
  flex-grow: 1;
  display: flex;
  overflow: auto;
}
body {
  margin: 0;
  font-family: "lucida grande", tahoma, verdana, arial, sans-serif;
  font-size: 14px;
}
</style>
