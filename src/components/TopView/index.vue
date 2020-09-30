/**
* User: soalin
* Date: 2020/9/29
* Time: 07:12
* Desc:
*/
<template>
  <div class="top-view">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <total-sales/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-orders/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <today-users/>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <total-users/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TotalSales from '../TotalSales'
import TotalOrders from '../TotalOrders'
import TotalUsers from '../TotalUsers'
import TodayUsers from '../TodayUsers'

export default {
  name: 'index',
  components: {
    TotalSales,
    TotalOrders,
    TotalUsers,
    TodayUsers
  }
}
</script>

<style scoped>

</style>
