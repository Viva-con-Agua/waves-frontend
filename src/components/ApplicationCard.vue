<template>
  <div>
    <el-card
      :body-style="{ padding: '0px' }"
      style="padding:20px;margin:0;"
    >
      <el-col :span="1">
        <el-checkbox
          v-model="selected"
          @change="()=> applicationHandler(application.application_id)"
        ></el-checkbox>
      </el-col>
      <el-col :span="23">
        
        <span style="margin-left:10px;">{{`${application.first_name} ${application.last_name}`}}</span>
        <el-tag
                style="float:right;padding:0;"
                :type="application.state=='WAITING'?'warning'
              :application.state=='ACCEPTED'?'success':'danger'"
                size="mini"
              >{{application.state}}</el-tag>
        <el-row style="background:#eee;padding:10px;border-radius:5px;margin-top:10px">
          <span>{{application.text}}</span>
        </el-row>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ApplicationCard",
  props: ["application", "list", "selected"],
  methods: {
    applicationHandler(id) {
        this.selected=true;
      if (this.selected) {
        this.list.push(id);
      } else {  
        this.list.splice(this.list.indexOf(id),1)
      }
    }
  }
};
</script>

<style>
</style>