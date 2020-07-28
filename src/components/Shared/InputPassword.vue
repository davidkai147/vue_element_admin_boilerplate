<template>
  <el-tooltip v-model="capsTooltip" content="Caps lock is On" manual placement="right">
    <ValidationProvider v-slot="{ errors }" :vid="vid" :name="$attrs.name" :rules="rules">
      <el-form-item :prop="$attrs.name" :error="errors[0]" :label="$attrs.label">
        <span v-if="icon" class="svg-container">
          <svg-icon :icon-class="icon" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="innerValue"
          :placeholder="$attrs.placeholder"
          :type="passwordType"
          autocomplete="on"
          name="password"
          :tabindex="$attrs.tabindex"
          @blur="capsTooltip = false"
          @keyup.enter.native="$attrs.functions"
          @keyup.native="checkCapslock"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
    </ValidationProvider>
  </el-tooltip>
</template>

<script>

export default {
  props: {
    vid: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null
    },
    icon: {
      type: String
    },
    functions: {
      type: Function
    }
  },
  data: () => ({
    innerValue: '',
    capsTooltip: false,
    passwordType: 'password'
  }),
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
</style>
