/**
* User: soalin
* Date: 2020/9/29
* Time: 07:14
* Desc:
*/
<template>
  <div class="map-view">
    <div class="left">
      <b-map-scatter/>
    </div>
  </div>
</template>

<script>
import BMapScatter from '../BMapScatter'

export default {
  name: 'MapView',
  components: {
    BMapScatter
  }
}
</script>

<style lang="scss" scoped>
.map-view {
  display: flex;
  margin-top: 20px;

  .left {
    flex: 0 0 80%;
    width: 80%;
    height: 600px;
  }
}
</style>
