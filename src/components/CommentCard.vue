<template>
  <el-row>
    <el-card :body-style="{ padding: '20px' }" v-for="comment in getComments" :key="comment.id">
      <el-row>
        <el-col :span="2">
          <img
            style="border-radius: 50%;"
            class="profile-img"
            src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
          />
        </el-col>
        <el-col :span="21" :offset="1">
          <el-row>
            <span class="userName">{{comment.first_name}} {{comment.last_name}}</span>
            <time-ago
              style="float:right;
              color:grey;
              text-decoration:none;"
              class="title"
              :datetime="comment.created_at"
              refresh
              :locale="locale"
              :long="longString"
            ></time-ago>
          </el-row>
          <el-row style="margin-top:8px;">
            <span>{{comment.text}}</span>
          </el-row>
          <VoteForm :commentId="comment.id"></VoteForm>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
import TimeAgo from "vue2-timeago";
import VoteForm from "../components/VoteForm";
import { Row, Col } from "element-ui";

export default {
  name: "CommentCard",
  components: {
    TimeAgo,
    VoteForm,
    Row,
    Col
  },
  data() {
    return {
      value: new Date(),
      locale: "en",
      longString: false,
      tooltip: true
    };
  },
  computed: {
    getComments() {
      this.$store.getters.getComments;
      return this.$store.getters.getComments.data;
    }
  }
};
</script>

<style>
.userName {
  margin-right: 4px;
  margin-bottom: 10px;
  font-size: 1rem;
}

.profile-img {
  border-radius: 50%;
}
</style>
