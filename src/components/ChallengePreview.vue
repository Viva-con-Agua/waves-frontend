 <template>
  <el-dialog title="Shipping address" :visible.sync="dialogTableVisible">
      <Badge></Badge>
  </el-dialog>
</template>
 
 <script>
 import Badge from './Badge'
export default {
  name: "ChallengePreview",
  props: ["dialogTableVisible"],
  components : {
      Badge
  }
};
</script>
 
 <style>
</style>