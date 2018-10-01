<template>
  <el-submenu v-if="menu.children.length > 0" :index="Date.now()+''">
    <template slot="title">
      <icon :type="menu.icon"/>
      <span>{{menu.label}}</span>
    </template>
    <item v-for="submenu in menu.children" :menu="submenu" :key="submenu.path"/>
  </el-submenu>
  <el-menu-item v-else :index="menu.path">
      <icon :type="menu.icon"/>
      <span slot="title">{{menu.label}}</span>
  </el-menu-item>
</template>

<script>
  import isUrl from '@/utils/isUrl';
  import Icon from '@c/Icon';
  export default {
    name: 'item',
    components: {
      Icon
    },
    props: {
      menu: {
        type: Object,
        default(){
          return [];
        }
      }
    },
    methods: {
      link(path) {
        if(isUrl(path)) {
          // window.open(path);
          return false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
