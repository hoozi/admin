<template>
  <div>
    <div class="global-header">
      <Icon :type="!collapsed ? 'outdent' : 'indent'" class="menu-toggle-button" @click="handleMenuToggle" />
      <breadcrumb/>
      <right-content/>
    </div>
    <tabs-bar/>
  </div>
</template>

<script>
  import RightContent from './RightContent';
  import Icon from '@c/Icon';
  import Breadcrumb from '@c/Breadcrumb';
  import TabsBar from '@c/TabsBar';
  export default {
    name: 'GlobalHeader',
    components: { RightContent, Icon, Breadcrumb, TabsBar },
    computed: {
      collapsed() {
        return this.$store.state.collapse;
      }
    },
    methods: {
      handleMenuToggle() {
        this.$store.commit('TOGGLE_MENU');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global-header {
    height: 50px;
    border-bottom: 1px solid #f6f6f6;
    .menu-toggle-button {
      cursor: pointer;
      font-size: 20px;
      height: 50px;
      padding: 16px;
      transition: all .3s,padding 0s;
      box-sizing: border-box;
      &:hover {
        background: #f9f9f9;
      }
    }
  }
</style>
