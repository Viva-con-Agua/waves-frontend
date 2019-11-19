 <template>
  <el-container style="height:60px;width:100%;background:#0a6b91">
    <el-col style="width:60%;margin:auto;" :span="24">
      <img
        style="float:left;margin-top:5px;"
        src="https://pool2.vivaconagua.org/dispenser/images/drop_small.png"
      />
      <img
        style="float:right;width:40px;margin-top:13px;"
        src="https://img.icons8.com/cotton/64/000000/gender-neutral-user--v1.png"
      />
      <NotificationBell style="float:right"></NotificationBell>
    </el-col>
  </el-container>
</template>

<script>
import NotificationBell from "./NotificationBell";
export default {
  name: "Navbar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  components: {
    NotificationBell
  }
};
</script>

<style>
</style>