<template>
  <el-row>
    <el-card v-for="comment in getComments" :key="comment.id">
      <el-row>
        <el-col :span="1">
          <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
        </el-col>
        <el-col :span="20" :offset="1">
          <el-row>
            <span class="userName">{{'scoop'}}</span>
            <time-ago
              class="title"
              :datetime="comment.created_at"
              refresh
              :locale="locale"
              :long="longString"
            ></time-ago>
          </el-row>
          <el-row>
            <span >{{comment.text}}</span>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </el-row>
</template>

<script>
import TimeAgo from "vue2-timeago";

export default {
  name: "CommentCard",
  components: {
    TimeAgo
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
      this.$store.getters.getComments
      return this.$store.getters.getComments.data;
    }
  }
};
</script>

<style>
.userName {
  margin-right: 4px;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.8rem;
}


</style>
