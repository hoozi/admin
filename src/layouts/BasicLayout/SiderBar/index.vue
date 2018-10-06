<template>
  <el-aside :width="width+'px'" class="sider-bar">
    <div class="sider-bar-top">
      <img class="logo" :src="$store.state.logo">
      <h1>{{$store.state.sysName}}</h1>
    </div>
    <el-scrollbar class="scroll-bar">
      <app-sider-menu/>
    </el-scrollbar>
  </el-aside>
</template>

<script>
  import AppSiderMenu from './SiderMenu'
  export default {
    inheritAttrs: false,
    name: 'AppSiderBar',
    props: ['sysName','logo'],
    components: { AppSiderMenu },
    computed: {
      width() {
        return this.$store.state.collapse ? 64 : 256;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sider-bar-top {
    background: #002140;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding-left: 20px;
    position: relative;
    transition: all .2s;
    &>.logo {
      display: inline-block;
      margin-top: 8px;
      vertical-align: middle;
    }
    &>h1 {
      color: #fff;
      display: inline-block;
      vertical-align: middle;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: Myriad Pro,Helvetica Neue,Arial,Helvetica,sans-serif;
      font-weight: 600;
    }
  }
  .scroll-bar {
    min-height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>

