<template>
  <div class="paginate-component">
    <el-pagination
      class="paginate"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      background
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PaginateComponent',
  props: {
    total: {
      type: Number,
      default: 10,
    },
    pageSize: {
      type: Number,
      default: 9,
    },
  },
  data: function () {
    return {
      currentPage: 1,
    }
  },
  methods: {
    handleCurrentChange(num) {
      this.$emit('handleCurrentChange', num)
    },
  },
}
</script>

<style lang="less" scoped>
.paginate-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
