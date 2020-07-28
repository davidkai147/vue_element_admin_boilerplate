import Vue from 'vue'
import { configure, extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import i18n from '../index'

// with typescript
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  })
}
extend('url', {
  validate: value => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(value)
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

configure({
  defaultMessage: (field, values) => {
    const text = field.toLowerCase()
    // override the field name.
    values._field_ = i18n.t(`${text}`)

    return i18n.t(`validation.${values._rule_}`, values)
  }
})
