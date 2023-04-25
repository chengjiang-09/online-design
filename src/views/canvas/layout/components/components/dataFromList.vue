<template>
  <div id="DataFromList">
    <div class="container">
      <ul class="configure-list">
        <li
          class="configure-list-box"
          v-for="obj in configureList"
          :key="obj.type"
        >
          <div class="radio-box">
            <el-radio class="radio" v-model="radio" :label="obj.type">{{
              obj.label
            }}</el-radio>
          </div>
        </li>
        <li class="configure-list-box" v-show="urlShow">
          <h4>动态url</h4>
          <el-input
            v-model="urlPath"
            @blur="blur"
            :max="5400"
            :min="0"
          ></el-input>
        </li>
        <li class="configure-list-box request-type" v-show="urlShow">
          <el-radio class="radio" v-model="methods" label="GET">GET</el-radio>
          <el-radio class="radio" v-model="methods" label="POST">POST</el-radio>
        </li>
        <li class="configure-list-box" v-show="urlShow">
          <h4>参数</h4>
          <el-button type="primary" @click="editParam"
            >编辑<i class="el-icon-setting el-icon--right"></i
          ></el-button>
        </li>
        <li class="configure-list-box">
          <h4>数据值</h4>
          <el-button type="primary" @click="editJsonData"
            ><span v-if="!urlShow">编辑</span>
            <span v-else>查看</span>
            <i class="el-icon-setting el-icon--right"></i
          ></el-button>
        </li>
      </ul>
    </div>
    <JsonEditView
      :jsonDataProp="editParamJson"
      title="请求参数"
      v-if="editParamData"
      @close="closeParamJson"
      @changeData="changeParamData"
    />
    <JsonEditView
      :jsonDataProp="jsonData"
      title="数据值"
      v-if="editData"
      @close="closeJsonEdit"
      @changeData="changeData"
    />
  </div>
</template>

<script>
//未开发完成数据源配置
import { mapActions, mapState } from 'vuex'
import goBackListType from '@/utils/goBackListType'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'DataFromList',
  props: {
    configure: {
      type: Object,
      default: () => {},
      require: true,
    },
  },
  watch: {
    configure: {
      handler: function () {
        this.update()
      },
      deep: true,
    },
    methods: {
      handler: function () {
        if (!this.initFlag) {
          this.dynamicDataFormUpdate(true)
        }
      },
      deep: true,
    },
    radio: {
      handler: function (newRadio, oldRadio) {
        if (
          newRadio &&
          newRadio !== oldRadio &&
          newRadio == 'dynamicDataUrl' &&
          !this.initFlag
        ) {
          this.dynamicDataFormUpdate(true)
        } else if (
          newRadio &&
          newRadio !== oldRadio &&
          newRadio == 'staticData' &&
          !this.initFlag
        ) {
          this.dynamicDataFormUpdate(false, 'dynamicDataUrl')
        }
      },
    },
  },
  computed: {
    ...mapState({
      dataFromAll: (state) => state.charts.dataFromAll,
    }),
    jsonData: {
      get() {
        let jsonData = {}
        let length = this.configureList.length
        for (let i = 0; i < length; i++) {
          if (
            this.configureList[i].type == this.radio &&
            this.radio == 'staticData'
          ) {
            jsonData = this.configureList[i].jsonData
            break
          } else if (this.configureList[i].type == this.radio) {
            jsonData = this.dataFromAll[this.configure.id]
              ? this.dataFromAll[this.configure.id]
              : {}
            break
          }
        }
        return jsonData
      },
      set(value) {
        return value
      },
    },
    urlShow: {
      get() {
        return this.radio !== 'staticData'
      },
    },
  },
  created() {
    this.update()

    this.$nextTick(() => {
      this.initFlag = false
    })
  },
  data: function () {
    return {
      initFlag: true, //防止组件初始化时，进行非必要的更新
      configureList: [], //目标组件的所有样式数组
      id: 0, //目标组件id，用于修改时递归找到渲染树对应的子节点
      type: '', //样式名称，例如修改opacity：1。type = opacity
      fatherId: '', //用于插入节点时，找到渲染树子节点的父节点
      radio: 'staticData', //单选初始值
      editData: false, //控制静态数据编辑的展开关闭
      editParamData: false, //控制动态数据请求参数编辑的展开关闭
      editParamJson: {}, //动态数据请求参数
      urlPath: '', //动态数据路由
      methods: 'GET', //动态数据请求类型
      originParam: {}, //动态数据请求参数
      originValue: '', //动态数据路由
      originMethods: 'GET', //动态数据请求类型
    }
  },
  methods: {
    ...mapActions({
      modify_canvasData: 'charts/modify_canvasData',
      modify_canvasDataChild: 'charts/modify_canvasDataChild',
      set_goBcakArray: 'charts/set_goBcakArray',
    }),
    editJsonData() {
      this.editData = true
    },
    editParam() {
      this.editParamData = true
    },
    closeJsonEdit(value) {
      this.editData = value
    },
    closeParamJson(value) {
      this.editParamData = value
    },
    update() {
      this.configureList = this.configure.list
      this.configure.list.forEach((obj) => {
        if (obj.type === 'dynamicDataUrl') {
          this.urlPath = obj.value ? obj.value : ''
          this.editParamJson =
            obj.jsonData && obj.jsonData.param ? obj.jsonData.param : {}
          this.methods =
            obj.jsonData && obj.jsonData.methods ? obj.jsonData.methods : 'GET'
          this.radio =
            obj.jsonData && obj.jsonData.select
              ? 'dynamicDataUrl'
              : 'staticData'
        }
      })
      this.id = this.configure.id
      this.type = this.configure.type
      this.fatherId = this.configure.fatherId

      this.originValue = this.urlPath
      this.originParam = deepCopy(this.editParamJson)
      this.originMethods = this.methods
    },
    changeData({ value, originValue }) {
      if (this.radio == 'staticData') {
        this.set_goBcakArray({
          fatherId: this.fatherId,
          id: this.id,
          data: [
            {
              key: this.radio,
              value: originValue,
            },
          ],
          defaultType: this.type,
          type: goBackListType.update,
        })
        this.modify_canvasDataChild({
          fatherId: this.fatherId,
          id: this.id,
          data: {
            key: this.radio,
            value,
          },
          type: this.type,
        })
      }
    },
    changeParamData({ value }) {
      this.editParamJson = value
      this.dynamicDataFormUpdate(true)
    },
    async blur() {
      if (this.urlPath) {
        this.dynamicDataFormUpdate(true)
      } else {
        this.dynamicDataFormUpdate(false)
      }
    },
    async dynamicDataFormUpdate(select, key) {
      await this.set_goBcakArray({
        fatherId: this.fatherId,
        id: this.id,
        data: [
          {
            key: key ? key : this.radio,
            value: {
              select,
              param: this.originParam,
              value: this.originValue,
              methods: this.originMethods,
            },
          },
        ],
        defaultType: this.type,
        type: goBackListType.update,
      })
      await this.modify_canvasDataChild({
        fatherId: this.fatherId,
        id: this.id,
        data: {
          key: key ? key : this.radio,
          value: {
            select,
            param: this.editParamJson,
            value: this.urlPath,
            methods: this.methods,
          },
        },
        type: this.type,
      })
    },
  },
}
</script>

<style lang="less" scoped>
#DataFromList {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    padding: 15px 10px;

    .configure-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      &-box {
        width: 100%;
        display: flex;
        margin: 5px 0;

        .radio-box {
          width: 100%;
          height: 40px;
        }

        h4 {
          padding-left: 20px;
          width: 30%;
          height: 40px;
          font-size: 14px;
          line-height: 40px;
        }
      }
      .request-type {
        padding-left: 20px;
      }
    }
  }
}
</style>
