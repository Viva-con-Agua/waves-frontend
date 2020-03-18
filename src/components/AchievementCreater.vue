<template>
  <div >
    <ChallengePreview :dialogTableVisible="dialogTableVisible"></ChallengePreview>
    <el-form :model="achievement" ref="achievement" class="columns-container">
      <el-col :span="12">
        <el-card  style="width:90%" title="Badge">
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
              <el-option label="application" value="applications"></el-option>
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
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="width:90%">
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
        </el-card>
        <el-card style="width:90%">
          <el-button
            @click="submitAchievement"
            style="padding:7px;margin-left:0;margin-right:0;"
            type="primary"
          >CREATE</el-button>
          <el-button
            @click="dialogTableVisible = true"
            style="padding:7px;margin-left:0;margin-right:0;margin-top:5px"
            type="warning"
          >PREVIEW</el-button>
        </el-card>
      </el-col>
    </el-form>
    <div style="width:40%;margin:auto">
      <el-input
        style="margin:30px;margin-left:10px;"
        type="textarea"
        v-model="data"
        id="myTextArea"
      ></el-input>
      <el-button @click="createBadges">los</el-button>
    </div>
  </div>
</template>

<script>
import ChallengePreview from "../components/ChallengePreview";
import Axios from "axios";
export default {
  name: "CreateChallengeView",
  components: {
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
      data: "",
      dialogTableVisible: false
    };
  },
  methods: {
    createBadges() {
      let { badges } = JSON.parse(this.data);
      badges.map(async badge => {
        await Axios.post("/waves/api/v1/achievement", {
          achievement: {
            badge: {
              name: badge.name,
              type: badge.type,
              desc: badge.challenge,
              img_url: badge.img
            },
            challenge: {
              name: badge.name,
              points: badge.point,
              desc: badge.challenge || "",
              type: badge.type
            }
          }
        });
      });
    },
    async submitAchievement() {
      try {
        const achievement = this.achievement;
        achievement.challenge.type = achievement.badge.type;
        await Axios.post("/waves/api/v1/achievement", {
          achievement
        });
      } catch (error) {
        throw error.message
      }
    }
  }
};
</script>

<style>
</style>