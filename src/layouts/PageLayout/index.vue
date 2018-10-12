<template>
  <div class="layout-page">
<!--     <page-header
      :page-name="$route.name"
    /> -->
    
    <div class="layout-page-content">
      <router-view></router-view>
    </div>
    <global-footer>Copyright <icon type="copyright"/> 2018 All Rights Reservered</global-footer>
  </div>
</template>

<script>
  import GlobalFooter from '@c/GlobalFooter';
  import Icon from '@c/Icon';
  export default {
    name: 'PageLayout',
    components: {
      GlobalFooter,
      Icon
    }
    
  }
</script>

<style lang="scss" scoped>
  .layout-page-content {
    margin: 24px 24px 0;
  }
</style>

