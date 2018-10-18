<template>
  <el-container class="full">
    <app-sider-bar/>
    <el-container direction="vertical" class="layout">
      <app-header class="layout-header"/>
      <app-content class="layout-content"/>
    </el-container>
  </el-container>
</template>

<script>
  import AppHeader from './Header';
  import AppFooter from './Footer';
  import AppContent from './Content';
  import AppSiderBar from './SiderBar';
  export default {
    components: {
      AppHeader,
      AppContent,
      AppSiderBar,
      AppFooter
    },
    name: 'BasicLayout',
    created() {
      //this.$store.dispatch('user/getUserMenu');
    }
  }
</script>

<style lang="scss" scoped>
  .full {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .layout {
    background: #f0f2f5;
    #{&}-header {
      background: #fff;
      height: 50px;
      padding: 0;
      position: relative;
    }
    #{&}-content {
      height: 100%;
      //overflow: hidden;
    }
    #{&}-footer {
      
    }
  }
</style>

