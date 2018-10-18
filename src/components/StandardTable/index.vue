<template>
  <div class="standard-table-container">
    <slot name="info-tip"></slot>
    <el-table
      v-bind="$attrs"
      :data="records" 
      v-loading="loading"
      class="standard-table"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      class="pagination"
      v-if="pages > 1"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="size < 10 ? [size ,10, 15 , 20, 25] : [10,15,20,25]"
      :page-size="size"
      layout="prev, pager, next, sizes, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  export default {
    name: 'StandardTable',
    props: {
      module: {
        type: String,
        default: 'user'
      },
      loading: {
        type: Boolean,
        default: false
      },
      params: {
        type: Object
      }
    },
    //['records', 'current', 'size', 'total', 'pages']
    computed: {
      ...mapState({
        records(state) { return state[this.module].records; },
        current(state) { return state[this.module].current; },
        size(state) { return state[this.module].size; },
        total(state) { return state[this.module].total; },
        pages(state ) { return state[this.module].pages; }
      })
    },
    watch: {
      current() {
        this.getPager();
      },
      size() {
        this.getPager();
      }
    },
    methods: {
      ...mapActions({
        getPager(dispatch) {
          const { current, size } = this;
          dispatch(`${this.module}/getPager`, { current, size, ...this.params })
        } 
      }),
      ...mapMutations({
        setParams(commit, payload) {
          commit(`${this.module}/SAVE_${this.module.toUpperCase()}_PAGE`, payload)
        }
      }),
      handleSizeChange(size) {
        this.setParams({size});
      },
      handleCurrentChange(current) {
        this.setParams({current});
      }
    }
    
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin: 16px 0;
    float: right;
  }
</style>
