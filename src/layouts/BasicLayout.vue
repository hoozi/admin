<template>
  <el-container class="full">
    <SiderMenu/>
    <el-container direction="vertical">
      <Header/>
      <el-main>Main</el-main>
      <Footer/>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header';
import Footer from './Footer';
import SiderMenu from '@c/SiderMenu';
export default {
  components: {
    Header,
    SiderMenu,
    Footer
  },
  name: 'BasicLayout'
}
</script>

<style>
  .full {
    width: 100%;
    height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

