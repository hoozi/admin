<template>
  <div class="standard-table-container">
    <slot name="info-tip"></slot>
    <el-table
      v-bind="$attrs"
      :data="records" 
      class="standard-table"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
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
      },
      model: {
        type: String,
        default: 'user'
      }
    },
    computed: {
      ...mapState('user', ['records', 'current', 'size', 'total', 'pages'])
    }
  }
</script>

<style lang="scss" scoped>

</style>
