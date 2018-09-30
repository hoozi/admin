<template>
<el-breadcrumb separator="/" class="header-breadcrumb">
  <el-breadcrumb-item v-for="item in breadcrumbLevel" :key="item.path" :to="{ path: item.path }" v-if="item.meta.title"><span v-html="getTitle(item.meta)"></span></el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
  export default {
    name: 'HeaderBreadcrumb',
    data: () => {
      return {
        breadcrumbLevel: [],
        hasRoute: false
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb();
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getTitle(meta) {
        return meta.icon ? `<i class="el-icon-erp-home-fill" style="font-size:14px;"></i> ${meta.title}` : meta.title;
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name.trim().toLocaleLowerCase() !== 'home'.toLocaleLowerCase()) {
          matched = [{ path: '/home', meta: { title: '首页', icon: 'home' }}].concat(matched)
        }
        this.breadcrumbLevel = matched;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header-breadcrumb {
    display: inline-block;
  }
</style>

