<template>
  <VcAFrame title="Create Achievement" hasContainer="true">
    <ChallengePreview :dialogTableVisible="dialogTableVisible"></ChallengePreview>
    <el-form :model="achievement" ref="achievement" class="columns-container">
      <VcAColumn>
        <VcABox :expand="true" :first="true" title="Badge">
          <el-form-item label="name" prop="name">
            <el-input v-model="achievement.badge.name" placeholder="input badge name..."></el-input>
          </el-form-item>

          <el-form-item label="type" prop="type">
            <el-select
              v-model="achievement.badge.type"
              :placeholder="$t('poolEventForm.input.type.placeholder')"
            >
              <el-option label="poolevent" value="poolevents"></el-option>
              <el-option label="comment" value="comments"></el-option>
              <el-option label="vote" value="votes"></el-option>
              <el-option label="profile" value="profiles"></el-option>
              <el-option label="connection" value="connections"></el-option>
              <el-option label="info" value="info"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="description" prop="desc">
            <el-input
              type="textarea"
              v-model="achievement.badge.desc"
              placeholder="input badge description..."
            ></el-input>
          </el-form-item>
          <el-form-item label="image url" prop="imge_url">
            <el-input v-model="achievement.badge.img_url" placeholder="image url..."></el-input>
          </el-form-item>
        </VcABox>
      </VcAColumn>
      <VcAColumn>
        <VcABox :expand="true" :first="true" title="Challenge">
          <el-form-item label="name" prop="name">
            <el-input v-model="achievement.challenge.name" placeholder="input badge name..."></el-input>
          </el-form-item>
          <el-form-item label="points" prop="desc">
            <el-input-number v-model="achievement.challenge.points" :min="0" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="description" prop="desc">
            <el-input
              type="textarea"
              v-model="achievement.challenge.desc"
              placeholder="input badge description..."
            ></el-input>
          </el-form-item>
        </VcABox>
        <Card>
          <Button
            @click="submitAchievement"
            style="padding:7px;margin-left:0;margin-right:0;"
            type="primary"
          >CREATE</Button>
          <Button
            @click="dialogTableVisible = true"
            style="padding:7px;margin-left:0;margin-right:0;"
            type="warning"
          >PREVIEW</Button>
        </Card>
      </VcAColumn>
    </el-form>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox, VcAInfoBox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form, Button, Card } from "element-ui";
import "vca-widget-user/dist/vca-widget-user.css";
import ChallengePreview from "../components/ChallengePreview";
import Axios from "axios";
export default {
  name: "CreateChallengeView",
  components: {
    Card,
    VcAFrame,
    VcAColumn,
    VcABox,
    VcAInfoBox,
    Input,
    Form,
    Button,
    ChallengePreview
  },
  data() {
    return {
      error: [],
      achievement: {
        badge: {
          name: "",
          type: "",
          desc: "",
          img_url: ""
        },
        challenge: {
          name: "",
          points: "",
          desc: ""
        }
      },
      dialogTableVisible: false
    };
  },
  methods: {
    async submitAchievement() {
      try {
        const achievement = this.achievement;
        achievement.challenge.type = achievement.badge.type;
        console.log(achievement);
        const response = await Axios.post("/waves/api/v1/achievement", {
          achievement
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};
</script>

<style>
</style>