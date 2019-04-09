<template>
  <VcAFrame>
    <VcAColumn size="60%">
      <VcABox>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="Check-Box" width="180">
            <template>
              <el-checkbox v-model="checked"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="Date" width="120">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Name" width="120">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>Name: {{ scope.row.name }}</p>
                <p>Addr: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="Age" width="50">
            <template slot-scope="scope">
              <p>12</p>
            </template>
          </el-table-column>
          <el-table-column label="Message">
            <template slot-scope="scope" width="100">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, dolorem enim alias sequi aliquid ut unde quasi totam explicabo? Excepturi ut velit nesciunt delectus, sint distinctio obcaecati placeat tenetur facere.</p>
            </template>
          </el-table-column>
          <el-table-column label="Operations">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleDelete(scope.$index, scope.row)"
              >accept</el-button>
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">waiting list</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >reject</el-button>
            </template>
          </el-table-column>
        </el-table>
      </VcABox>
    </VcAColumn>
    <VcAColumn size="20%">
      <VcABox>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDelete(scope.$index, scope.row)"
          >accept</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">waiting list</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">reject</el-button>
        </template>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>


<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import { timeout } from "q";
import { setTimeout } from "timers";

export default {
  name: "ApplicationsHandler",
  components: { VcAFrame, VcAColumn, VcABox },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles"
        }
      ]
    };
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
</style>
