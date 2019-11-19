<template>
  <el-card>
    <el-form :model="comment">
      <el-row>
        <el-col :span="2" :offset="0">
          <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png" />
        </el-col>
        <el-col :span="21" :offset="1">
          <el-row>
            <span class="user-name">username</span>
          </el-row>
          <el-row style="margin:0px;padding:0px;">
            <el-input
              style="margin:0px;padding:0px;"
              type="textarea"
              placeholder="input comment"
              v-model="comment.text"
              :maxLength="240"
            ></el-input>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="19">
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
        text: "",
        user_id: 1,
        poolevent_id: this.$route.params.id
      },
      id: this.$route.params.id
    };
  },
  methods: {
    submit() {
      if (!this.comment.text) {
        alert("comment sction empty");
      } else {
        this.$store.dispatch("SUBMIT_COMMENT", {
          data: this.comment
        });
      }
    }
  }
};
</script>

<style>
</style>
