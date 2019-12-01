<template>
  <el-card>
    <el-form :model="comment">
      <el-row>
        <el-col :span="2" :offset="0">
          <img src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png" />
        </el-col>
        <el-col :span="21" :offset="1">
          <el-row>
            <span class="user-name">{{this.$cookies.get('full_name')}}</span>
          </el-row>
          <el-row style="margin:0px;padding:0px;">
            <input
              class="comment-text-area"
              style="margin:0px;padding:0px;"
              type="textarea"
              placeholder="comment..."
              v-model="comment.text"
              :maxLength="240"
            />
          </el-row>
        </el-col>
      </el-row>
      <el-row style="padding:0">
        <el-col style="padding:0" :span="4" :offset="19">
          <el-button style="margin-right:0" v-if="comment.text" class="vca-button-primary" @click.prevent="submit">comment</el-button>
          <el-button style="margin-right:0" v-else class="vca-button-primary" @click.prevent="submit" disabled>comment</el-button>
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
.comment-text-area{
  border: 0ch;
  border-bottom: 1px solid;
  color:gray;
  padding:10px;
  border-radius: 0
}
</style>
