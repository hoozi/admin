<template>
  <i :class="iconName" v-on="$listeners" v-bind="$props" :style="iconSize"></i>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      type: {
        type: String
      },
      size: {
        type: String,
        default: ''
      }
    },
    computed: {
      iconName() {
        return `el-icon-erp-${this.type}`;
      },
      iconSize() {
        if(this.size === 'small') {
          return 'font-size:12px'
        }
        return ''
      }
    }
  }
</script>
