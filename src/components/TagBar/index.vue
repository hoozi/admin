<template>
  <div class="tag-bar">
    <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
      
      <el-tab-pane v-for="item in $store.state.bookMarkList"
        :key="item.path"
        :label="item.label"/>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName2: 'home'
      };
    },
    methods: {
      handleClick(tab, event) {
        /* this.$router.push({
          path: tab.name
        }) */
        //console.log(tab.name, event);
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

