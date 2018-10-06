<template>
  <div class="layout-page-header">
    <!-- <breadcrumb/> -->
    <h1 class="layout-page-title">{{pageName}}</h1>
    <slot></slot>
  </div>
</template>

<script>
  //import Breadcrumb from './Breadcrumb';
  export default {
    name: 'PageHeader',
    props: {
      pageName: {
        type: String
      }
    }/* ,
    components: {
      Breadcrumb
    } */
  }
</script>

<style lang="scss" scoped>
  .layout-page-header {
    background: #fff;
    padding: 16px 32px 0;
    border-bottom: 1px solid #e8e8e8;
    .layout-page-title {
      margin-bottom: 16px;
      font-size: 20px;
      font-weight: 500;
      color: rgba(0,0,0,.85);
    }
  }
</style>

