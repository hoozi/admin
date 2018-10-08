<template>
  <el-main>
    <el-scrollbar style="height: 100%">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </el-scrollbar>
  </el-main>
</template>

<script>
  
  export default {
    name: 'AppContent',
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>