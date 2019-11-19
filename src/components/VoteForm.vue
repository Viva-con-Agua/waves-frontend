<template>
  <Row style="padding:0;margin:0;">
    <el-col style="padding:0" :span="2">
      <p>{{votes.length}}</p>
    </el-col>
    <el-col :span="2">
      <vue-clap-button icon="love" :getClaps="postVote" />
    </el-col>
  </Row>
</template>

<script>
import { Container, Form, Button, Row, Col } from "element-ui";
import axios from "axios";
export default {
  name: "VoteForm",
  data() {
    return {
      votes: []
    };
  },
  props: ["commentId"],
  components: {
    Container,
    Form,
    Button,
    Row,
    Col
  },
  methods: {
    postVote() {
      console.log("scoop");
      this.$store.dispatch("POST_VOTE", {
        user_id: 1,
        comment_id: this.commentId
      });
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get(`/waves/api/v1/vote/${this.commentId}`);
      this.votes = data.data;
    } catch (error) {
      throw error.message;
    }
  }
};
</script>

<style>
</style>