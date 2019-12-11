<template>
  <div style="margin:auto;width:50%"> 
    <el-row>
      <el-col>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum harum quidem quae minima esse blanditiis omnis itaque aliquid nihil, praesentium quibusdam ducimus possimus ab ea in quis quam rem optio ut voluptate? Placeat tempora deserunt consequatur dignissimos necessitatibus? Debitis sunt iure laudantium amet modi sit, veritatis at, consectetur fuga quia voluptate quidem laborum. Sed nam recusandae quos sequi rerum tempora, culpa odio pariatur. Perspiciatis natus dolore quibusdam optio repellat. Doloribus deserunt velit consequatur mollitia cupiditate, beatae tempore rerum voluptas maiores est explicabo aliquid soluta molestias quod eaque! Cumque officia impedit earum quidem molestias maxime! Ipsum quasi temporibus atque distinctio.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "InformationView",
  data() {
    return {
      information: ""
    };
  },
  async mounted() {
    const { data } = await Axios.get("/waves/api/v1/info", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("access_token")}`
      }
    });
  }
};
</script>

<style>
</style>