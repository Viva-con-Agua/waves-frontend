<template>
  <div id="app" class="app">
    <ul v-show-slide="featuresOpen" class="features">
      <li>Aliquam lorem</li>
      <li>Praesent porttitor nulla vitae posuere</li>
      <li>Suspendisse nisl elit rhoncus</li>
      <li>Donec mi odio faucibus</li>
      <li>Curabitur suscipit suscipit</li>
    </ul>
    <button @click="toggleFeatures" class="toggle-features">{{ featuresOpen ? 'Hide Features' : 'View Features' }}</button>
  </div>
</template>

<script>
import { Container, Row, Col } from "element-ui";
import axios from "axios";
import Badge from "../components/Badge";
export default {
  name: "BadgesView",
  components: {
  },
  data () {
    return {
      featuresOpen: false
    }
  },
  methods: {
    toggleFeatures () {
      this.featuresOpen = !this.featuresOpen
    }
  }
};
</script>

<style>
.el-container {
  width: 50%;
  margin: auto;
}
</style>