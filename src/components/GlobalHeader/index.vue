<template>
  <div class="global-header">
    <Icon :type="!collapsed ? 'outdent' : 'indent'" class="menu-toggle-button" @click="handleMenuToggle" />
    <header-breadcrumb/>
    <right-content/>
  </div>
</template>

<script>
  import RightContent from './RightContent';
  import HeaderBreadcrumb from './Breadcrumb';
  import Icon from '@c/Icon';
  export default {
    name: 'GlobalHeader',
    components: { RightContent, Icon, HeaderBreadcrumb },
    computed: {
      collapsed() {
        return this.$store.state.collapse;
      }
    },
    methods: {
      handleMenuToggle() {
        this.$store.commit('toggleMenu');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global-header {
    .menu-toggle-button {
      cursor: pointer;
      font-size: 20px;
      height: 64px;
      padding: 22px 24px;
      transition: all .3s,padding 0s;
      box-sizing: border-box;
      &:hover {
        background: #f9f9f9;
      }
    }
  }
</style>
