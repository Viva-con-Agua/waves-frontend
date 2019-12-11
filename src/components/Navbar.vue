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
      width:80px;
      padding:8px;
      margin-top:17px;"
        type="primary"
      >
        <strong>CREATE</strong>
      </el-button>
      <ProfileDropdown :logout="logout" style="float:right"></ProfileDropdown>
      <NotificationBell style="float:right"></NotificationBell>
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