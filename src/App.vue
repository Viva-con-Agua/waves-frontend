<template>
  <div id="app">
    <Navbar :logout="logout"></Navbar>
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import io from "socket.io-client";
import { Button, Select } from "element-ui";
import Navbar from "./components/Navbar";
import vueCookies from "vue-cookies";
import { mapGetters, actions, mapActions } from "vuex";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/third_party/embedly.min";
import "froala-editor/js/third_party/font_awesome.min";
import "froala-editor/js/third_party/spell_checker.min";
import "froala-editor/js/third_party/image_tui.min";
import "froala-editor/css/froala_editor.pkgd.min.css";

import VueFroala from "vue-froala-wysiwyg";
Vue.use(VueFroala);
Vue.config.productionTip = false;

Vue.component(Select.name, Select);
Vue.component(Button.name, Button);

Vue.use(vueCookies);

export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {
      isDev: process.env.ENV === "dev",
      socket: undefined
    };
  },
  computed: {
    ...mapGetters([
      "getErrors",
      "getSuccessMessage",
      "isLogedIn",
      "crew",
      "getAccessToken"
    ])
  },
  updated() {
    if (this.getErrors.length > 0) {
      this.$notify.error({
        title: `Error: ${this.getErrors[this.getErrors.length - 1]}`,
        type: "danger"
      });
      this.resetErrors();
    }
  },
  created() {
    if (this.socket) {
      this.socket.on("NEW_POOLEVENT", pooleventId => {
        this.$notify({
          title: `Event with id: ${pooleventId} was added`,
          message: "click ",
          type: "success"
        });
      });
      this.socket.on("NEW_BADGE", data => {
        this.$notify({
          title: `New badge unlocked: ${data.name}`,
          dangerouslyUseHTMLString: true,
          message: `
        <div>
          <el-row>
            <el-col :span="6">
              <img style="border-radius:50%" src="${data.img_url}" alt=""/>
            </el-col>
          </el-row>
        </div>
        `,
          type: "success",
          duration: 1000
        });
      });
    }
  },
  methods: {
    ...mapActions({
      logedIn: "IS_LOGED_IN",
      setCrewRoleCity: "SET_CREW_ROLE_CITY",
      setAccessToken: "SET_ACCESS_TOKEN",
      resetErrors: "RESET_ERRORS"
    }),
    logout() {
      try {
        this.$cookies.remove("full_name");
        this.$cookies.remove("roles");
        this.$cookies.remove("full_name");
        this.$cookies.remove("first_name");
        this.$cookies.remove("CREW_CITY");
        this.$cookies.remove("CREW_ROLE");
        this.$cookies.remove("WAVES_JWT");
        this.$cookies.remove("last_name");
        this.$cookies.remove("user_id");
        this.$cookies.remove("access_token");
      } catch (error) {
        throw error;
      }
    },
    setRoles() {
      if (this.$cookies.get("roles")) {
        this.$store.dispatch("SET_ROLES", this.$cookies.get("roles"));
      }
    }
  },
  mounted() {
    this.logedIn(this.$cookies.get("access_token") !== null);
    if (this.$cookies.get("access_token")) {
      this.setAccessToken({
        headers: {
          Authorization: `Bearer ${this.$cookies.get("access_token")}`
        }
      });
    }
    this.setRoles();

    this.getSuccessMessage.map(message => {
      this.$notify({
        title: `success`,
        message: "click ",
        type: "success"
      });
    });
    this.setCrewRoleCity({
      crewRole: this.$cookies.get("CREW_ROLE"),
      crewCity: this.$cookies.get("CREW_CITY")
    });
    this.socket = io("localhost:5000");
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
  background-color: #e9ebee;
}
</style>
