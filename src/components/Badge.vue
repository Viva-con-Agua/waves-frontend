<template>

<Card>
    <el-col
      :span="4"
    >
          <img src="http://via.placeholder.com/100" class="badge-img">
    </el-Col>
    <el-col
      :span="20"
   > 
   <ul class="badge-info-list">
       <li>
           {{badge.name}}
       </li>
       <li>
           <el-progress :text-inside="true" :stroke-width="26" :percentage="70"/>
       </li>
   </ul>
   </el-col>
  </Card>

  
</template>

<script>
import { Container, Card, Col, Image, Progress } from "element-ui";
export default {
  name: "badge",
  props: ["badge"],
  components: { Card, 
                Col, 
                Container, 
                Image,
                Progress 
                }
};
</script>

<style>
.el-row {
  width: 100%;
}

.el-card {
  width: 100%;
  padding: 0;
}

.el-col{
    padding:0px;
}

.badge-img{
    margin: 5px;
    border-radius: 50%;
    margin-bottom: 20px
}

.badge-info-list{
    list-style-type: none
}

.badge-info-list li{
    margin:10px
}
</style>