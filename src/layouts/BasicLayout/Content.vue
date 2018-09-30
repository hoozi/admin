<template>
  <el-main>
    <keep-alive>
      <router-view :key="key"/>
    </keep-alive>
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