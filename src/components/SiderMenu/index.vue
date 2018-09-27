<template>
  <el-aside width="256px" class="sider-menu">
    <div class="sider-menu-top"></div>
    <el-menu
      class="menu-dark"
      background-color="#001529"
      text-color="#fff"
     >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'SiderMenu'
}
</script>

<style lang="scss" scoped>
.sider-menu {
  min-height: 100%;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  background: #001529; 
}
.menu-dark {
  border-right: 0;
  background: #001529;
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    margin-bottom: 8px;
  }
  .el-submenu__title {
    color: red
  }
}

.sider-menu-top {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>
