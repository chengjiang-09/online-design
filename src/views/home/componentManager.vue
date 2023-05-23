<template>
  <div id="ComponentManager">
    <div class="container" v-loading="loading">
      <div class="classify">
        <h2 class="title">请选择组件分类信息</h2>
        <el-select v-model="componentList" filterable placeholder="请选择">
          <el-option
            v-for="item in template"
            :key="item.id"
            :label="`${item.label}`"
            :value="item.items"
            @click.native="
              selectClassify(
                item.label,
                item.icon,
                item.component,
                item.type,
                item.id,
              )
            "
          >
          </el-option>
        </el-select>
        <el-button type="info" round @click.native="addNewTemplate"
          >添加新分类</el-button
        >
        <el-button type="primary" round @click.native="uploadEdit"
          >上传修改</el-button
        >
      </div>
      <div class="classify-data" v-if="templateData.component">
        <h2 class="title">分类信息</h2>
        <el-form
          class="form"
          :model="templateData"
          :rules="templateDataRules"
          label-position="left"
          label-width="150px"
          ref="templateData"
        >
          <el-form-item label="label(名称)" prop="label">
            <el-input
              v-model="templateData.label"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="type(标识类别)" prop="type">
            <el-input v-model="templateData.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="icon(展示图标)" prop="icon">
            <el-input v-model="templateData.icon" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="component(组件)" prop="component">
            <el-input
              v-model="templateData.component"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round @click="saveEdit('template')"
              >保存修改</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="config">
        <div class="config-component">
          <div class="component" v-if="componentList || isCreateClassify">
            <h2 class="title">请选择组件信息</h2>
            <el-select v-model="defaultList" filterable placeholder="请选择">
              <el-option
                v-for="item in componentList"
                :key="item.id"
                :label="item.label"
                :value="item.default"
                @click.native="
                  selectComponent(
                    item.label,
                    item.component,
                    item.type,
                    item.icon,
                    item.imgPath,
                    item.id,
                    item.template_id,
                    item,
                  )
                "
              >
              </el-option>
            </el-select>
            <el-button type="info" round @click.native="addNewComponent"
              >添加新组件</el-button
            >
          </div>
          <div class="component-data" v-if="componentData.component">
            <h2 class="title">组件信息</h2>
            <el-form
              :model="componentData"
              :rules="componentDataRules"
              label-position="left"
              label-width="150px"
              ref="componentData"
            >
              <el-form-item label="label(名称)" prop="label">
                <el-input
                  v-model="componentData.label"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="type(标识类别)" prop="type">
                <el-input
                  v-model="componentData.type"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="component(组件)" prop="component">
                <el-input
                  v-model="componentData.component"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="展示图片url" prop="imgPath">
                <el-input
                  v-model="componentData.imgPath"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="icon(展示图标)" prop="icon">
                <el-input
                  v-model="componentData.icon"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="saveEdit('component')"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="config-default">
          <div class="default" v-if="defaultList || isCreateComponent">
            <h2 class="title">请选择配置信息</h2>
            <el-select v-model="configureList" filterable placeholder="请选择">
              <el-option
                v-for="item in defaultList"
                :key="item.id"
                :label="item.label"
                :value="item.configure"
                @click.native="
                  selectDefault(
                    item.label,
                    item.icon,
                    item.component,
                    item.type,
                    item.id,
                    item.components_id,
                    item.configure,
                  )
                "
              >
              </el-option>
            </el-select>
            <el-button type="info" round @click.native="addNewDefault"
              >添加新配置</el-button
            >
          </div>
          <div class="default-data" v-if="defaultData.component">
            <h2 class="title">配置信息</h2>
            <el-form
              :model="defaultData"
              :rules="defaultDataRules"
              label-position="left"
              label-width="150px"
              ref="defaultData"
            >
              <el-form-item label="label(名称)" prop="label">
                <el-input
                  v-model="defaultData.label"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="type(标识类别)" prop="type">
                <el-input
                  v-model="defaultData.type"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="component(组件)" prop="component">
                <el-input
                  v-model="defaultData.component"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="icon(展示图标)" prop="icon">
                <el-input
                  v-model="defaultData.icon"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="saveEdit('default')"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="config-configure">
          <div class="configure" v-if="configureList || isCreateDefault">
            <h2 class="title">请选择属性配置</h2>
            <el-select
              v-model="configureDataNo"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in configureList"
                :key="item.id"
                :label="item.label"
                :value="item.label"
                @click.native="
                  selectConfigure(
                    item.component,
                    item.label,
                    item.type,
                    item.value,
                    item.disabled,
                    item.jsonData,
                    item.values,
                    item.default,
                    item.id,
                    item.defaults_id,
                  )
                "
              >
              </el-option>
            </el-select>
            <el-button type="info" round @click.native="addNewConfigure"
              >添加新配置</el-button
            >
          </div>
          <div class="configure-data" v-if="configureData.type">
            <h2 class="title">配置信息</h2>
            <el-form
              class="configure-data-body"
              :model="configureData"
              :rules="configureDataRules"
              label-position="left"
              label-width="150px"
              ref="configureData"
            >
              <el-form-item class="item" label="label(名称)" prop="label">
                <el-input
                  v-model="configureData.label"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item class="item" label="type(标识类别)" prop="type">
                <el-input
                  v-model="configureData.type"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="item"
                label="component(组件)"
                prop="component"
              >
                <el-input
                  v-model="configureData.component"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="item"
                label="value(属性基本配置)"
                prop="component"
              >
                <el-input
                  v-model="configureData.value"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="item"
                label="disabled(是否可修改)"
                prop="component"
              >
                <el-input
                  v-model="configureData.disabled"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item
                class="item"
                label="jsonData(一些额外的配置信息)'"
                prop="component"
              >
                <el-button type="primary" round @click="edit('jsonData')"
                  >编辑</el-button
                >
              </el-form-item>
              <el-form-item
                class="item"
                label="values(echarts额外配置信息)"
                prop="component"
              >
                <el-button type="primary" round @click="edit('values')"
                  >编辑</el-button
                >
              </el-form-item>
              <el-form-item
                class="item"
                label="default(layout组件额外配置信息)"
                prop="component"
              >
                <el-button type="primary" round @click="edit('default')"
                  >编辑</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button type="primary" round @click="saveEdit('configure')"
                  >保存修改</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div id="chart" v-if="component">
        <div class="chart-container">
          <component :is="component" :props="chart" :manager="true"></component>
        </div>
      </div>
    </div>
    <DecorationClock class="decoration-clock" v-if="!templateData.component" />
    <DesignDialog
      v-if="visible"
      :dataList="dataList"
      :rules="rules"
      :title="title"
      :visible="visible"
      :type="type"
      :titleFlagId="titleFlagId"
      @visibleControl="visible = false"
      @putForm="putForm"
    />
    <JsonEditView
      class="edit"
      v-if="editShow"
      :title="editTitle"
      :jsonDataProp="jsonDataProp"
      @close="close"
      @changeData="changeData"
    />
  </div>
</template>

<script>
import { getTemplateClassification } from '@/apis/chartsApi'
import DesignDialog from './components/designDialog.vue'
import { mapActions } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { updateSystemTemplate } from '@/apis/systemApi'
const templateClassifyData = {
  rules: {
    label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    type: [{ required: true, message: '请输入标识类别', trigger: 'blur' }],
    icon: [{ required: true, message: '请输入图标Icon', trigger: 'blur' }],
    component: [],
  },
  dataList: [
    {
      label: 'label(名称)',
      key: 'label',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'type(标识类别)',
      key: 'type',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'icon(展示图标)',
      key: 'icon',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'component(组件)',
      key: 'component',
      disabled: true,
      defaultValue: 'chartList',
      type: 'input',
    },
  ],
  title: '新建组件分类',
  type: 'templateClassify',
}

const componentClassifyData = {
  rules: {
    label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    type: [{ required: true, message: '请输入标识类别', trigger: 'blur' }],
    component: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
    icon: [],
    imgPath: [],
  },
  dataList: [
    {
      label: 'label(名称)',
      key: 'label',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'type(标识类别)',
      key: 'type',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'component(组件)',
      key: 'component',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: '展示图片url',
      key: 'imgPath',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'icon(展示图标)',
      key: 'icon',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
  ],
  title: '新建组件',
  type: 'component',
}

const defaultClassifyData = {
  rules: {
    label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    type: [{ required: true, message: '请输入标识类别', trigger: 'blur' }],
    icon: [],
    component: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
  },
  dataList: [
    {
      label: 'label(名称)',
      key: 'label',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'type(标识类别)',
      key: 'type',
      disabled: false,
      defaultValue: '',
      type: 'autocomplete',
      query: [
        { address: 'dataFrom(数据源)', value: 'dataFrom' },
        { address: 'configure(样式配置)', value: 'configure' },
        { address: 'position(定位配置)', value: 'position' },
      ],
    },
    {
      label: 'icon(展示图标)',
      key: 'icon',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'component(组件)',
      key: 'component',
      disabled: true,
      defaultValue: '',
      type: 'autocomplete',
      query: [
        {
          value: 'configureList',
          address: '这是普通样式选择的组件，定位和样式',
        },
        {
          value: 'dataFromPanelList',
          address: '这是panel选择的数据源展示组件',
        },
        { value: 'dataFromList', address: '这是普通组件选择的数据源展示组件' },
      ],
    },
  ],
  title: '新建组件配置',
  type: 'default',
}

const configureClassifyData = {
  rules: {
    label: [{ required: true, message: '请输入名称', trigger: 'blur' }],
    type: [{ required: true, message: '请输入标识类别', trigger: 'blur' }],
    component: [],
    disabled: [{ required: true, message: '请选择', trigger: 'blur' }],
  },
  dataList: [
    {
      label: 'label(名称)',
      key: 'label',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'type(标识类别)',
      key: 'type',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'component(组件)',
      key: 'component',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'value(属性基本配置)',
      key: 'value',
      disabled: false,
      defaultValue: '',
      type: 'input',
    },
    {
      label: 'disabled(是否可修改)',
      key: 'disabled',
      disabled: false,
      defaultValue: '',
      type: 'select',
      query: [
        {
          value: '1',
          label: '不可修改',
        },
        {
          value: '0',
          label: '可修改',
        },
      ],
    },
    // {
    //   label: 'jsonData(一些额外的配置信息)',
    //   key: 'jsonData',
    //   disabled: false,
    //   defaultValue: [],
    //   type: 'json',
    // },
    // {
    //   label: 'values(echarts额外配置信息)',
    //   key: 'values',
    //   disabled: false,
    //   defaultValue: [],
    //   type: 'json',
    // },
    // {
    //   label: 'default(layout组件额外配置信息)',
    //   key: 'default',
    //   disabled: false,
    //   defaultValue: [],
    //   type: 'json',
    // },
  ],
  title: '新建属性',
  type: 'configure',
}

export default {
  name: 'ComponentManager',
  components: {
    DesignDialog,
  },
  async created() {
    this.getTemplate()
  },
  beforeDestroy() {
    this.set_actualReading(false)
  },
  data: function () {
    return {
      loading: false,
      template: [],
      componentList: null,
      defaultList: null,
      configureList: null,
      templateData: {
        icon: '',
        component: '',
        label: '',
        type: '',
        id: '',
        items: [],
      },
      componentData: {
        component: '',
        label: '',
        type: '',
        imgPath: '',
        icon: '',
        id: '',
        template_id: '',
        default: [],
      },
      defaultData: {
        icon: '',
        component: '',
        label: '',
        type: '',
        id: '',
        components_id: '',
        configure: [],
      },
      configureData: {
        component: '',
        label: '',
        type: '',
        value: '',
        disabled: '',
        jsonData: {},
        values: [],
        default: [],
        id: '',
      },
      configureDataNo: '',
      templateDataRules: templateClassifyData.rules,
      componentDataRules: componentClassifyData.rules,
      defaultDataRules: defaultClassifyData.rules,
      configureDataRules: configureClassifyData.rules,
      dataList: [],
      title: '',
      rules: {},
      visible: false,
      type: '',
      titleFlagId: '',
      isCreateClassify: false,
      isCreateComponent: false,
      isCreateDefault: false,
      editShow: false,
      editTitle: '',
      editKey: '',
      jsonDataProp: {},
      component: null,
      chart: null,
      editData: {
        template: [],
        component: [],
        default: [],
        configure: [],
      },
    }
  },
  methods: {
    ...mapActions({
      set_actualReading: 'other/set_actualReading',
    }),
    async getTemplate() {
      //获取所有的模版
      this.set_actualReading(true)

      const { code, msg, data } = await getTemplateClassification()
      if (code === 1) {
        this.template = data

        this.$message({
          message: msg,
          type: 'success',
        })
      } else {
        console.log(msg)
      }
    },
    selectClassify(label, icon, component, type, id) {
      this.templateData.component = component
      this.templateData.icon = icon
      this.templateData.label = label
      this.templateData.type = type
      this.templateData.id = id

      this.isCreateClassify = false
      this.isCreateComponent = false
      this.isCreateDefault = false

      this.component = null
      this.chart = null

      //清空可能存在的上次数据
      this.componentData = {
        component: '',
        label: '',
        type: '',
        imgPath: '',
        icon: '',
        id: '',
        template_id: '',
        default: [],
      }
      this.defaultData = {
        icon: '',
        component: '',
        label: '',
        type: '',
        id: '',
        configure: [],
      }

      this.configureData = {
        component: '',
        label: '',
        type: '',
        value: '',
        disabled: '',
        jsonData: {},
        values: [],
        default: [],
        id: '',
        defaults_id: '',
      }

      this.defaultList = null
      this.configureList = null

      this.componentData.template_id = id
    },
    selectComponent(
      label,
      component,
      type,
      icon,
      imgPath,
      id,
      templateId,
      item,
    ) {
      this.componentData.component = component
      this.componentData.label = label
      this.componentData.type = type
      this.componentData.id = id
      this.componentData.imgPath = imgPath
      this.componentData.icon = icon
      this.componentData.template_id = templateId

      this.component = component
      this.chart = deepCopy(item)

      this.isCreateComponent = false
      this.isCreateDefault = false

      this.defaultData = {
        icon: '',
        component: '',
        label: '',
        type: '',
        id: '',
        configure: [],
      }
      this.configureData = {
        component: '',
        label: '',
        type: '',
        value: '',
        disabled: '',
        jsonData: {},
        values: [],
        default: [],
        id: '',
      }

      this.configureList = null

      this.defaultData.components_id = id
    },
    selectDefault(label, icon, component, type, id, componentsId, configure) {
      this.defaultData.component = component
      this.defaultData.icon = icon
      this.defaultData.label = label
      this.defaultData.type = type
      this.defaultData.id = id
      this.defaultData.components_id = componentsId
      this.defaultData.configure = configure

      this.isCreateDefault = false

      this.configureData = {
        component: '',
        label: '',
        type: '',
        value: '',
        disabled: '',
        jsonData: {},
        values: [],
        default: [],
        id: '',
      }

      this.configureData.defaults_id = id
    },
    selectConfigure(
      component,
      label,
      type,
      value,
      disabled,
      jsonData,
      values,
      defaultdata,
      id,
      defaultsId,
    ) {
      this.configureData = {
        component,
        label,
        type,
        value,
        disabled,
        jsonData,
        values,
        default: defaultdata,
        id,
        defaults_id: defaultsId,
      }
    },
    addNewTemplate() {
      this.dataList = templateClassifyData.dataList
      this.title = templateClassifyData.title
      this.rules = templateClassifyData.rules
      this.type = templateClassifyData.type
      this.titleFlagId = ''
      this.visible = true
    },
    addNewComponent() {
      this.dataList = componentClassifyData.dataList
      this.title = componentClassifyData.title
      this.rules = componentClassifyData.rules
      this.type = componentClassifyData.type
      this.titleFlagId = ''
      this.visible = true
    },
    addNewDefault() {
      this.dataList = defaultClassifyData.dataList
      this.title = defaultClassifyData.title
      this.rules = defaultClassifyData.rules
      this.type = defaultClassifyData.type
      this.titleFlagId = ''
      this.visible = true
    },
    addNewConfigure() {
      this.dataList = configureClassifyData.dataList
      this.title = configureClassifyData.title
      this.rules = configureClassifyData.rules
      this.type = configureClassifyData.type
      this.titleFlagId = this.configureData.id
      this.visible = true
    },
    async uploadEdit() {
      if (
        this.editData.template.length > 0 ||
        this.editData.component.length > 0 ||
        this.editData.configure.length > 0 ||
        this.editData.default.length > 0
      ) {
        this.loading = true
        const { code, msg } = await updateSystemTemplate(this.editData)
        if (code == 1) {
          this.$message({
            message: msg,
            type: 'success',
          })
          this.editData = {
            template: [],
            component: [],
            default: [],
            configure: [],
          }
          this.$ls.set('ALL_CHARTS', null)

          this.getTemplate()
        } else {
          this.$message({
            message: `${msg},数据可能存在格式错误`,
            type: 'warning',
          })
          this.editData = {
            template: [],
            component: [],
            default: [],
            configure: [],
          }
        }
        this.loading = false
      }
    },
    saveEdit(key) {
      switch (key) {
        case 'template':
          try {
            let templateDataCopy = deepCopy(this.templateData)
            this.editData.template.push(templateDataCopy)

            if (!templateDataCopy.id) {
              templateDataCopy.id = Date.now()
              this.template.push(templateDataCopy)
            } else {
              this.template.forEach((template, index) => {
                if (template.id === templateDataCopy.id) {
                  this.template[index] = {
                    ...template,
                    ...templateDataCopy,
                  }
                  throw new Error()
                }
              })
            }
            // eslint-disable-next-line no-empty
          } catch (e) {}
          break
        case 'component':
          try {
            let componentDataCopy = deepCopy(this.componentData)
            this.editData.component.push(componentDataCopy)
            this.template.forEach((template, templateIndex) => {
              if (template.id === this.templateData.id) {
                if (!componentDataCopy.id) {
                  componentDataCopy.id = Date.now()
                  this.template[templateIndex].items.push(componentDataCopy)
                } else {
                  template.items.forEach((component, index) => {
                    if (component.id === componentDataCopy.id) {
                      this.template[templateIndex].items[index] = {
                        ...component,
                        ...componentDataCopy,
                      }
                      throw new Error()
                    }
                  })
                }
              }
            })
            // eslint-disable-next-line no-empty
          } catch (e) {}
          break
        case 'default':
          try {
            let now = Date.now()

            if (
              this.defaultData.type === 'position' &&
              this.defaultData.configure.length === 0
            ) {
              this.defaultData.configure = [
                {
                  label: '宽度(px)',
                  type: 'width',
                  component: 'configureInput',
                  value: '500',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: '高度(px)',
                  type: 'height',
                  component: 'configureInput',
                  value: '450',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: 'top(px)',
                  type: 'top',
                  component: 'configureInput',
                  value: '0',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: 'left(px)',
                  type: 'left',
                  component: 'configureInput',
                  value: '0',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
              ]

              this.editData.configure.push(
                {
                  label: '宽度(px)',
                  type: 'width',
                  component: 'configureInput',
                  value: '500',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: '高度(px)',
                  type: 'height',
                  component: 'configureInput',
                  value: '450',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: 'top(px)',
                  type: 'top',
                  component: 'configureInput',
                  value: '0',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
                {
                  label: 'left(px)',
                  type: 'left',
                  component: 'configureInput',
                  value: '0',
                  disabled: '0',
                  jsonData: null,
                  defaults_id: now,
                  values: [],
                  default: [],
                },
              )
            }
            let defaultDataCopy = deepCopy(this.defaultData)
            this.editData.default.push(defaultDataCopy)
            this.template.forEach((template, templateIndex) => {
              if (template.id === this.templateData.id) {
                template.items.forEach((component, componentIndex) => {
                  if (component.id === this.componentData.id) {
                    if (!defaultDataCopy.id) {
                      defaultDataCopy.id = now
                      this.template[templateIndex].items[
                        componentIndex
                      ].default.push(defaultDataCopy)
                      throw new Error()
                    } else {
                      component.default.forEach((defaultdata, index) => {
                        if (defaultdata.id === defaultDataCopy.id) {
                          this.template[templateIndex].items[
                            componentIndex
                          ].default[index] = {
                            ...defaultdata,
                            ...defaultDataCopy,
                          }
                          throw new Error()
                        }
                      })
                    }
                  }
                })
              }
            })
            // eslint-disable-next-line no-empty
          } catch (e) {}
          break
        case 'configure':
          try {
            let configureDataCopy = deepCopy(this.configureData, true)
            this.editData.configure.push(configureDataCopy)
            this.template.forEach((template, templateIndex) => {
              if (template.id === this.templateData.id) {
                template.items.forEach((component, componentIndex) => {
                  if (component.id === this.componentData.id) {
                    component.default.forEach(
                      (defaultData, defaultDataIndex) => {
                        if (defaultData.id === this.defaultData.id) {
                          if (!configureDataCopy.id) {
                            configureDataCopy.id = Date.now()
                            this.template[templateIndex].items[
                              componentIndex
                            ].default[defaultDataIndex].configure.push(
                              configureDataCopy,
                            )
                            this.chart = deepCopy(
                              this.template[templateIndex].items[
                                componentIndex
                              ],
                            )

                            throw new Error()
                          } else {
                            defaultData.configure.forEach(
                              (configure, index) => {
                                if (configure.id === configureDataCopy.id) {
                                  this.template[templateIndex].items[
                                    componentIndex
                                  ].default[defaultDataIndex].configure[index] =
                                    {
                                      ...configure,
                                      ...configureDataCopy,
                                    }

                                  this.chart = deepCopy(
                                    this.template[templateIndex].items[
                                      componentIndex
                                    ],
                                  )
                                  throw new Error()
                                }
                              },
                            )
                          }
                        }
                      },
                    )
                  }
                })
              }
            })
            // eslint-disable-next-line no-empty
          } catch (e) {}
          break
        default:
          break
      }
      this.$message({
        message: '保存成功',
        type: 'success',
      })
    },
    putForm({ type, form }) {
      switch (type) {
        case 'templateClassify':
          this.templateData = form

          //清空可能存在的上次数据
          this.componentData = {
            component: '',
            label: '',
            type: '',
            imgPath: '',
            icon: '',
            id: '',
            template_id: '',
            default: [],
          }
          this.defaultData = {
            icon: '',
            component: '',
            label: '',
            type: '',
            id: '',
            configure: [],
          }

          this.configureData = {
            component: '',
            label: '',
            type: '',
            value: '',
            disabled: '',
            jsonData: {},
            values: [],
            default: [],
            id: '',
            defaults_id: '',
          }
          this.component = null
          this.chart = null

          this.componentList = []
          this.defaultList = null
          this.configureList = null

          this.isCreateClassify = true
          this.isCreateDefault = false
          this.isCreateComponent = false
          console.log(this.templateData)
          break
        case 'component':
          this.componentData.default = []
          this.componentData = {
            ...this.componentData,
            ...form,
            id: null,
          }

          this.isCreateComponent = true
          this.isCreateDefault = false

          this.component = null
          this.chart = null

          this.defaultData = {
            icon: '',
            component: '',
            label: '',
            type: '',
            id: '',
            configure: [],
          }
          this.configureData = {
            component: '',
            label: '',
            type: '',
            value: '',
            disabled: '',
            jsonData: {},
            values: [],
            default: [],
            id: '',
          }

          this.defaultList = []
          this.configureList = null
          console.log(this.componentData)
          break
        case 'default':
          this.defaultData.configure = []
          this.defaultData = {
            ...this.defaultData,
            ...form,
            id: null,
          }

          this.isCreateDefault = true

          this.configureData = {
            component: '',
            label: '',
            type: '',
            value: '',
            disabled: '',
            jsonData: {},
            values: [],
            default: [],
            id: '',
          }

          this.configureList = []

          console.log(this.defaultData)
          break
        case 'configure':
          this.configureData.values = []
          this.configureData.default = []
          this.configureData.jsonData = []
          this.configureData = {
            ...this.configureData,
            ...form,
            id: null,
          }
          console.log(this.configureData)
          break
        default:
          break
      }

      this.visible = false
    },
    close(close) {
      this.editShow = close
    },
    changeData({ value }) {
      this.configureData[this.editKey] = value
    },
    edit(key) {
      this.editKey = key
      this.editTitle = this.configureData.id
        ? `${key}(${this.configureData.id})`
        : key
      this.jsonDataProp = this.configureData[key]
      this.editShow = true
    },
  },
}
</script>

<style lang="less" scoped>
#ComponentManager {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  position: relative;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    .form {
      display: flex;
      justify-content: space-between;
    }

    .classify {
      position: relative;
    }

    .config {
      width: 100%;
      height: 100%;
      display: flex;
      &-component {
        width: 30%;
      }

      &-default {
        width: 30%;
        margin: 0 20px;
      }

      &-configure {
        width: 40%;
        .configure-data-body {
          display: flex;
          flex-wrap: wrap;

          .item {
            width: 50%;
          }
        }
      }
    }

    #chart {
      position: absolute;
      left: 30%;
      top: 60%;
      .chart-container {
        width: 200px;
        height: 200px;
        position: relative;
      }
    }
  }
  .edit {
    left: unset;
    right: 50%;
  }

  .decoration-clock {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
