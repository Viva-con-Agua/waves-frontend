 <template>
  <el-container style="height:60px;width:100%;background:#0a6b91">
    <el-col style="width:60%;margin:auto;" :span="24">
      <a href="/waves">
        <img
          style="float:left;margin-top:5px;"
          src="https://pool2.vivaconagua.org/dispenser/images/drop_small.png"
        />
      </a>
      <h2
        style="float:left;
        margin-top:5px;
        color:white;
        margin-top:20px;
        margin-left:10px;"
      >Viva Con Agua</h2>
      <el-button
        @click="pushCreatePoolevent"
        style="float:right;
      width:90px;
      padding:8px;
      margin-top:17px;"
        type="primary"
      >
        <strong><i class="el-icon-circle-plus-outline"></i> CREATE</strong>
      </el-button>
      <ProfileDropdown :logout="logout" style="margin-left:5px;margin-right:10px;margin-top:15px;float:right"></ProfileDropdown>
      <NotificationBell style="margin-top:13px;float:right"></NotificationBell>
    </el-col>
  </el-container>
</template>

<script>
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";

export default {
  name: "Navbar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  props: ["logout"],
  components: {
    NotificationBell,
    ProfileDropdown
  },
  methods: {
    pushCreatePoolevent() {
      this.$router.push("/waves/create");
    }
  }
};
</script>

<style>
</style>