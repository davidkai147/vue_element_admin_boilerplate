<template>
  <ValidationProvider v-slot="{ errors }" :vid="vid" :name="$attrs.name" :rules="rules">
    <el-form-item :prop="$attrs.name" :error="errors[0]" :label="$attrs.label">
      <span v-if="icon" class="svg-container">
        <svg-icon :icon-class="icon" />
      </span>
      <el-input v-model="innerValue" :type="$attrs.type" :placeholder="$attrs.placeholder" :tabindex="$attrs.tabindex" />
    </el-form-item>
  </ValidationProvider>
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
    }
  },
  data: () => ({
    innerValue: ''
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
  }
}
</script>
<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
</style>
