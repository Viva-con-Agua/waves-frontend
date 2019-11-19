<template>
  <el-dropdown style="margin:20px;"  trigger="click">
    <span class="el-dropdown-link">
      <el-badge  :value="notifications.length" type="danger" :hidden="notifications.length>0" >
        <img @click="fetchNotification" src="https://img.icons8.com/officel/30/000000/appointment-reminders.png" alt="scoop" />
      </el-badge>
    </span>
    <el-dropdown-menu style="padding:0;width:400px" slot="dropdown">
      <el-row>
        <el-col style="padding:5px;" :span="24">Notifications</el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <a href="/#">
            <el-card
              style="padding-top:0px;padding-bottom:15px"
              v-for="notification in allNotification"
              :key="notification.id"
              shadow="never"
            >
              <el-col :span="22">{{formatNotification(notification)}}</el-col>
              <el-col :span="2">
                <time-ago
                  style="float:right;color:grey;text-decoration:none;"
                  class="title"
                  :datetime="notification.created_at"
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
/**
 * <el-dropdown-item v-for="notification in notifications" :key="notification.id">
        {{formatNotification(notification)}}
        <time-ago
          class="title"
          :datetime="notification.created_at"
          refresh
          locale="en"
          :long="false"
        ></time-ago>
      </el-dropdown-item>
      <el-dropdown-item>See All</el-dropdown-item>
 */
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
      allNotification:[]
    };
  },
  async mounted() {
    const { data } = await Axios.get("/waves/api/v1/notification/user/1/new");
    this.notifications = data.data;
  },
  methods: {
    formatNotification(notification) {
      switch (notification.type) {
        case "PE_NEW":
          return `new event added named: ${notification.name}`;
      }
    },
    async fetchNotification (){
      const { data } = await Axios.get("/waves/api/v1/notification/1");
    this.allNotification = data.data;
    }
  }
};
</script>

<style>
</style>