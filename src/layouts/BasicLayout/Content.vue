<template>
  <el-main>
    <tag-bar/>
    <keep-alive>
      <router-view :key="key"/>
    </keep-alive>
  </el-main>
</template>

<script>
  import TagBar from '@c/TagBar';
  export default {
    name: 'AppContent',
    components: {
      TagBar
    },
    computed: {
      key() {
        return this.$route.fullPath
      }
    }
  }
</script>