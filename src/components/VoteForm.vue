<template>
  <Row style="padding:0;margin:0;">
    
    <el-col :span="1">
      <img
        class="like-button"
        style="height:20px;margin-top:14px"
        @click="postVote"
        alt="vote-button"
        :src="heartImg" 
        @mouseover="heartImg=filledImg"
        @mouseleave="heartImg=emptyImg"
      />
    </el-col>
    <el-col style="padding:0" :span="1">
      <p style="text-align:center">{{votes.length}}</p>
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
      votes: [],
      emptyImg:"https://cdn2.iconfinder.com/data/icons/music-media-player-outline-basic/32/1-icon-music-09-512.png",
      filledImg: "https://cdn0.iconfinder.com/data/icons/twitter-24/512/166_Heart_Love_Like_Twitter-512.png",
      heartImg: "https://cdn2.iconfinder.com/data/icons/music-media-player-outline-basic/32/1-icon-music-09-512.png"
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
      this.$store.dispatch("POST_VOTE", {
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