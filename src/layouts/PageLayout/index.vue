<template>
  <div class="layout-page">
<!--     <page-header
      :page-name="$route.name"
    /> -->
    
    <div class="layout-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: 'PageLayout'
  }
</script>

<style lang="scss" scoped>
  .layout-page-content {
    margin: 24px 24px 0;
  }
</style>

