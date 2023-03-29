<template>
  <div id="homeLeftBox">
    <div class="container">
      <h2 class="title">
        <img
          src="../../../../assets/online-design-title.png"
          alt="online-design"
        />
      </h2>
      <div class="list">
        <ul>
          <li v-for="obj in routes" :key="obj.name">{{ obj.label }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeLeftBox',
  computed: {
    ...mapState({
      routes: (state) => state.routerStore.routes,
    }),
  },
}
</script>

<style lang="less" scoped>
#homeLeftBox {
  height: 100%;
  width: 100%;
  box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 5px 5px 5px 5px;
  .container {
    width: 100%;
    height: 100%;

    .title {
      width: 100%;
      height: 80px;

      img {
        width: 100%;
        height: 80px;
      }
    }
    .list {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
