<template>
  <i :class="iconName" v-on="$listeners" v-bind="$props"></i>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      type: {
        type: String
      }
    },
    computed: {
      iconName() {
        return `el-icon-erp-${this.type}`;
      }
    }
  }
</script>
