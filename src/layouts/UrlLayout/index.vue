<template>
  <div></div>
</template>

<script>
  import Exception from '@c/Exception';
  import { urlReg } from '@/utils/const';
  export default {
    components: { Exception },
    methods: {
      openOutLink() {
        window.open(this.$route.path.match(urlReg)[0]);
      }
    },
    activated() {
      this.openOutLink();
    }
  }
</script>

