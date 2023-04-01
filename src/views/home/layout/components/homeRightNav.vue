<template>
  <div id="homeRightNav">
    <div class="container">
      <ul class="nav-body">
        <li
          v-for="route in routes"
          :key="route.name"
          :class="[{ action: route.action }]"
          @click="selectThis(route)"
        >
          <i :class="[route.icon, 'icon']"></i>
          <h5 class="label">{{ route.label }}</h5>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HomeRightNav',
  computed: {
    ...mapState({
      routes: (state) => state.routerStore.routes,
    }),
  },
  methods: {
    ...mapActions({
      update_routes: 'routerStore/update_routes',
    }),
    selectThis(route) {
      this.update_routes({ name: route.name })
      this.$router.push({
        name: route.name,
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homeRightNav {
  width: 100%;
  height: 80px;
  .container {
    width: 100%;
    height: 100%;
    .nav-body {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 8px;
      box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.5);

      li {
        position: relative;
        width: 120px;
        height: 100%;
        background-color: #ffffff;
        transition: background-color 0.5s;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background-color: #eeeeee;
        }

        .icon {
          position: absolute;
          left: 8%;
          top: 50%;
          font-size: 16px;
          transform: translate(0, -50%);
        }

        .label {
          position: absolute;
          left: 60%;
          top: 50%;
          font-size: 16px;
          transform: translate(-50%, -50%);
        }
      }
      .action {
        background-color: #eeeeee;
      }
    }
  }
}
</style>
