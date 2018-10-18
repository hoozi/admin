<template>
  <el-main>
    
    
      <page-layout>
        <keep-alive>
          <router-view :key="key"/>
        </keep-alive>
      </page-layout>
    
      
  </el-main>
</template>

<script>
  import PageLayout from '@/layouts/PageLayout';
  export default {
    name: 'AppContent',
    components: {
      PageLayout
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-scrollbar {
    height: 100%;
    overflow-y:auto;
  }
  .layout-page-content {
    margin: 24px 24px 0;
  }
</style>
