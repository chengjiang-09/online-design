<template>
  <div class="empty-card">
    <div class="container">
      <div class="coverage-empty">
        <h5 class="text">空</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@keyframes empty {
  0% {
    background-color: #d3d3d3;
    color: #ffffff;
  }
  50% {
    background-color: #a5a5a5;
    color: #ffffff;
  }
  100% {
    background-color: #d3d3d3;
    color: #ffffff;
  }
}
.empty-card {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .coverage-empty {
      width: 100%;
      height: 100%;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      .text {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50px;
        background-color: #d3d3d3;
        color: #ffffff;
        animation: empty 2s linear 0s infinite;
      }
    }
  }
}
</style>
