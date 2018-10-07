<template>
  <div class="tag-bar">
    <el-tabs v-model="active"
               type="card"
               >
        <el-tab-pane :key="item.path"
                     v-for="item in $store.state.bookMarkList"
                     :label="item.label"
                     :name="item.path">
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: ''
      };
    },
    watch:{
      $route() {
        this.active = this.$route.path;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tag-bar {
    height: 40px;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
  }
</style>

