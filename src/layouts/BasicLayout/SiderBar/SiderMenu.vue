<template>
  <el-menu  
    background-color="#001529"
    text-color="#a7aaae"
    active-text-color="#409EFF" 
    router 
    :collapse-transition="false" 
    :collapse="collapsed"
    :default-active="$route.path"
    unique-opened
    class="sider-menu"
  >
    <sider-menu-item 
      v-for="menu in menus" 
      :menu="menu"
      :key="menu.path"
    />
  </el-menu>
</template>

<script>
  import SiderMenuItem from './SiderMenuItem';
  import { mapGetters } from 'vuex';
  export default {
    name: 'AppSiderMenu',
    components: { SiderMenuItem },
    computed: {
      collapsed() {
        return this.$store.state.collapse;
      },
      ...mapGetters('user', ['menus'])
    }
  }
</script>

<style lang="scss" scoped>

</style>
