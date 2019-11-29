<template>
  <el-dropdown style="margin:20px;" trigger="click">
    <span class="el-dropdown-link">
      <el-badge :value="notifications.length" type="danger" :hidden="notifications.length==0 || setSeen">
        <img
          @click="fetchNotification"
          src="https://img.icons8.com/officel/30/000000/appointment-reminders.png"
          alt="scoop"
        />
      </el-badge>
    </span>
    <el-dropdown-menu style="padding:0;width:400px" slot="dropdown">
      <el-row>
        <el-col style="padding:5px;" :span="24">Notifications</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <a
            v-for="noti in allNotification"
            :key="noti.notification.id"
            :href="`/waves/poolevent/${noti.notification.source_id}`"
          >
            <el-card style="padding-top:0px;padding-bottom:15px" shadow="never">
              <el-col :span="2"><i class="el-icon-date"></i></el-col>
              <el-col :span="18">{{formatNotification(noti)}}</el-col>
              <el-col :span="4">
                <time-ago
                  style="float:right;color:grey;text-decoration:none;"
                  class="title"
                  :datetime="noti.notification.created_at"
                  refresh
                  locale="en"
                  :long="false"
                ></time-ago>
              </el-col>
            </el-card>
          </a>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding:5px;margin-left:43%;" :span="24">
          <a href="/waves/notifications">see all</a>
        </el-col>
      </el-row>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Axios from "axios";
import TimeAgo from "vue2-timeago";

export default {
  name: "NotificationBell",
  components: {
    TimeAgo
  },
  data() {
    return {
      notifications: [],
      allNotification: [],
      setSeen : false
    };
  },
  async mounted() {
    const { data } = await Axios.get("/waves/api/v1/notification/user/1/new");
    this.notifications = data.data;
  },
  methods: {
    formatNotification({notification, source}) {
      switch (notification.type) {
        case "poolevents":
          return `john doe added a ${(source.type).toLowerCase()} ${source.name}`;
        case "badges":
          return `you unlocked a new badge: ${source.name}`;
      }
    },
    async fetchNotification() {
      const { data } = await Axios.get("/waves/api/v1/notification/1");
      this.allNotification = data.data;
      this.setSeen = true;
    }
  }
};
</script>

<style>
</style>