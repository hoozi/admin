<template functional>
  <div class="global-footer">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GlobalFooter'
  }
</script>

<style lang="scss" scoped>
.global-footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;
  color: rgba(0,0,0,.45);
  font-size: 14px;
}
</style>
