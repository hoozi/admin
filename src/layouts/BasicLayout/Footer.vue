<template>
  <el-footer height="auto">
    <global-footer>Copyright <icon type="copyright"/> 2018 All Rights Reservered</global-footer>
  </el-footer>
</template>

<script>
  import GlobalFooter from '@c/GlobalFooter';
  import Icon from '@c/Icon';
  export default {
    name: 'AppFooter',
    components: {
      GlobalFooter,
      Icon
    }
  }
</script>