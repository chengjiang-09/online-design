<template>
  <div class="decoration-clock">
    <div class="clock">
      <div class="hour">
        <div class="hr" id="hr"></div>
      </div>
      <div class="min">
        <div class="mn" id="mn"></div>
      </div>
      <div class="sec">
        <div class="sc" id="sc"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DecorationClock',
  mounted() {
    const deg = 6
    const hr = document.querySelector('#hr')
    const mn = document.querySelector('#mn')
    const sc = document.querySelector('#sc')
    // 设置定时器，每秒执行一次
    this.timer = setInterval(() => {
      let day = new Date()
      // 求一小时，一分钟，一秒的角度，一共360度
      let h = day.getHours() * 30 // 一小时等于30度
      let m = day.getMinutes() * deg // 一分钟等于6度
      let s = day.getSeconds() * deg // 一秒等于6度
      hr.style.transform = `rotateZ(${h + m / 12}deg)`
      mn.style.transform = `rotateZ(${m}deg)`
      sc.style.transform = `rotateZ(${s}deg)`
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  data: function () {
    return {
      timer: null,
    }
  },
}
</script>

<style lang="less" scoped>
.decoration-clock {
  .clock {
    width: 550px;
    height: 550px;
    /* 利用flex布局，将时针，分针，秒针定位到钟的水平垂直居中的位置 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: rgba(250, 250, 250, 0.9);
    /* 添加阴影效果 */
    box-shadow: 0 -1em 1em rgba(0, 0, 0, 0.3) inset,
      0 0.5em 1em rgba(255, 255, 255, 0.1) inset,
      0 -0.5em 1em rgba(255, 255, 255, 0.2), 0 1em 1em rgba(0, 0, 0, 0.3);

    &:before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      z-index: 100;
      background-color: #ffffff;
      box-shadow: 0 0.1em 0.1em rgba(255, 255, 255, 0.3) inset,
        0 -0.1em 0.1em rgba(0, 0, 0, 0.3) inset,
        0 0.2em 0.2em rgba(0, 0, 0, 0.3);
    }

    &:after {
      content: '';
      display: block;
      border-radius: 50%;
      position: absolute;
      box-shadow: 0 0 1em 0.5em rgb(0, 0, 0) inset,
        0 -0.5em 1em 0.5em rgba(0, 0, 0, 0.8);
      width: 450px;
      height: 450px;
      background-color: rgb(226, 214, 214);
      z-index: -99;
    }

    .hour,
    .min,
    .sec {
      position: absolute;
    }

    .hour,
    .hr {
      width: 260px;
      height: 240px;
    }

    .min,
    .mn {
      width: 290px;
      height: 290px;
    }

    .sec,
    .sc {
      width: 330px;
      height: 330px;
    }

    .hr,
    .mn,
    .sc {
      display: flex;
      justify-content: center;
      position: absolute;
    }

    .hr:before,
    .mn:before,
    .sc:before {
      box-shadow: 2px -0.6px 2px rgba(255, 255, 255, 0.1) inset,
        2px 0.5px 2px rgba(0, 0, 0, 0.2) inset,
        -3px 10px 10px rgba(0, 0, 0, 0.3);
    }

    .hr:before {
      content: '';
      z-index: 10;
      border-radius: 6px 6px 0 0;
      background: var(--primary1);
      border-radius: 0.5em;
      width: 18px;
      height: 100px;
    }

    .mn:before {
      content: '';
      z-index: 11;
      border-radius: 6px 6px 0 0;
      background: var(--primary2);
      border-radius: 0.4em;
      width: 13px;
      height: 130px;
    }

    .sc:before {
      content: '';
      z-index: 12;
      background: var(--fg);
      border-radius: 0.3em;
      width: 10px;
      height: 150px;
    }
  }
}
</style>
