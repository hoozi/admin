<template>
  <el-header height="auto">
    <global-header/>
  </el-header>
</template>

<script>
  import GlobalHeader from '@c/GlobalHeader';
  export default {
    name: 'AppHeader',
    components: {
      GlobalHeader
    }
  }
</script>
