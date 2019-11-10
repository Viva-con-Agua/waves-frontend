<template>
  <Container>
    <el-row  >
      <el-col :span="24" :v-if="badges.length>0" v-for="badge in badges" :key="badge.id">
        <Badge :badge="badge"></Badge>
      </el-col>
    </el-row>
  </Container>
</template>

<script>
import { Container, Row, Col } from "element-ui";
import axios from "axios";
import Badge from "../components/Badge";
export default {
  name: "BadgesView",
  components: {
    Container,
    Row,
    Badge,
    Col
  },
  data() {
    return {
      badges: "",
      a: "asda"
    };
  },
  methods: {
    async setAllBadges() {
      const { data } = await axios.get("/waves/api/v1/badge");
      this.badges = data.data;
    }
  },
  async mounted() {
    this.setAllBadges();
  }
};
</script>

<style>
.el-container {
  width: 50%;
  margin: auto;
}
</style>