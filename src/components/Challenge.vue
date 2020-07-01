<template>
  <el-row style="margin-top:20px">
    <el-progress :percentage="(score / points) * 100" />
  </el-row>
</template>

<script>
export default {
  name: "Challenge",
  data() {
    return {
      score: 0,
      points: 0,
      type: "",
      completed: "",
      item: ""
    };
  },
  props: ["challenge"],
  mounted() {
    this.item = this.challenge;
    const { score, points, type, completed } = this.item;
    this.score = score;
    this.points = points;
    this.type = type;
    this.completed = completed;
  }
};
</script>

<style></style>
