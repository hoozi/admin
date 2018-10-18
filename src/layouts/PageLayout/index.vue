<template>
  <div class="layout-page">
    <div class="layout-page-content">
      <slot></slot>
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
  .layout-page {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    #{&}-content {
      margin: 24px 24px 0;
      flex: auto;
      p {
        height: 100px;
      }
    }
  }
 
</style>

