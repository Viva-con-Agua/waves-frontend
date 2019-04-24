<template>
  <el-card>
    <el-form :model="comment">
      <el-row>
        <el-col :span="1" :offset="0">
          <img src="https://img.icons8.com/dotty/80/000000/login-as-user.png">
        </el-col>
        <el-col :span="21" :offset="1">
          <el-row>
            <span class="user-name">username</span>
          </el-row>
          <el-row>
            <el-input type="textarea" placeholder="input comment" v-model="comment.text" :maxLength="240"></el-input>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="20">
          <el-button v-if="comment.text" class="vca-button-primary" @click.prevent="submit">comment</el-button>
          <el-button v-else class="vca-button-primary" @click.prevent="submit" disabled>comment</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "CommentForm",
  data() {
    return {
      comment: {
        userName: 'John Doe',
        text: '',
        likes: 0,
        createdAt: ''
      },
      id: this.$route.params.id
    };
  },
  methods: {
    submit() {  
      this.comment.createdAt = new Date();
      if (!this.comment.text) {
        alert("comment sction empty");
      } else {
        this.$store.dispatch("SUBMIT_COMMENT", {
          data: this.comment,
          id: this.$route.params.id
        });
      }
    }
  }
};
</script>

<style>
</style>
