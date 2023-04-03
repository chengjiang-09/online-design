<template>
  <div id="homeLeftSidebar">
    <div class="container">
      <h2 class="title">
        <img
          src="http://127.0.0.1:8001/online-design-title.png"
          alt="online-design"
        />
      </h2>
      <div class="list">
        <ul class="list-box">
          <li
            v-for="obj in routesGroup"
            :key="obj.id"
            :class="[{ action: obj.action }]"
            @click="selectThis(obj)"
          >
            <i :class="[obj.icon, 'icon']"></i>
            <h5 class="label">{{ obj.name }}</h5>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HomeLeftSidebar',
  computed: {
    ...mapState({
      routesGroup: (state) => state.routerStore.routesGroup,
    }),
  },
  methods: {
    ...mapActions({
      update_routesGroup_action: 'routerStore/update_routesGroup_action',
      set_routes: 'routerStore/set_routes',
    }),
    selectThis(route) {
      this.update_routesGroup_action({ id: route.id })
      this.set_routes({ id: route.id })
      this.$router.push({
        name: route.routes[0].name,
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homeLeftSidebar {
  height: 100%;
  width: 100%;
  box-shadow: 5px 0px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 5px 5px 5px 5px;
  transition: width;
  .container {
    width: 100%;
    height: 100%;

    .title {
      width: 100%;
      height: 50px;

      img {
        width: 100%;
        height: 50px;
      }
    }
    .list {
      width: 100%;
      height: 100%;
      margin-top: 20px;
      padding: 40px 8px;
      border-top: 1px solid #000000;

      &-box {
        li {
          margin-bottom: 5px;
          position: relative;
          height: 60px;
          background-color: #ffffff;
          transition: background-color 0.5s;
          cursor: pointer;
          border-radius: 5px;

          &:hover {
            background-color: #eeeeee;
          }

          .icon {
            position: absolute;
            left: 15%;
            top: 50%;
            font-size: 16px;
            transform: translate(0, -50%);
          }

          .label {
            position: absolute;
            left: 50%;
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
}
</style>
