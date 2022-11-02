//  引入Vue
import Vue from 'vue';
//  引入vee-valadiate插件
import VeeValidate,{ Validator } from 'vee-validate'
//  Vue.use(VeeValidate);
Validator.locale = 'zh_CN'
// 引入进来的是vee-valadiate提供信息提示【中文的】
import zh_CN from 'vee-validate/dist/locale/zh_CN'

import { attributesCh } from './validatorRule'

const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fieldBags',
  // delay: 10000,
  locale: 'en',
  strict: true,
  enableAutoClasses: true,
  events: 'input|blur',
  inject: true
}
//使用插件
Vue.use(VeeValidate,config)

// 添加中文检验规则设置
Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages, //提示语
        is: (field) => `${field}必须与密码相同` // 修改内置规则的message让确认密码和密码相同
    },
    attributes: attributesCh
})

Validator.extend('agree', {
  validate: (value) => {
    return value
  },
  getMessage:(field) => field + '必须同意'
})
