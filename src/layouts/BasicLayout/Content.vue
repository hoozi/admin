<template>
  <el-main>
    <el-scrollbar class="main-scrollbar" v-if="!isError">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </el-scrollbar>
    <template v-else>
      <router-view :key="key"/>
    </template>
  </el-main>
</template>

<script>
  const errorMap = {
    '/404': true,
    '/403': true,
    '/500': true
  }
  export default {
    name: 'AppContent',
    computed: {
      key() {
        return this.$route.fullPath
      },
      isError() {
        const { fullPath } = this.$route;
        return errorMap[fullPath]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-scrollbar {
    height: 100%;
  }
</style>
