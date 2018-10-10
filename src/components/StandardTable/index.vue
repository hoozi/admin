<template>
  <el-table
    v-bind="$attrs"
    :data="data" 
    class="standard-table"
  >
    <el-table-column
      v-for="col in columns"
      :key="col.prop"
      :label="col.label"
      v-bind="col"
    ></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'StandardTable',
    props: {
      columns: {
        type: Array,
        default() {
          return [];
        }
      },
      data: {
        type: Array,
        default() {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
