<template>
  <div class="tabs-bar">
    <el-tabs 
      v-model="active" 
      type="card" 
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane 
        :key="item.path"
        v-for="item in tabs"
        :label="item.label"
        :name="item.path"
        :closable="item.closable"
      >
        <icon v-if="item.icon" :type="item.icon" slot="label"/>
      </el-tab-pane>
    </el-tabs>
    <div class="tabs-bar-control">
      <el-dropdown szie="medium" @command="handleTabCommand">
        <i class="el-icon-arrow-down menu-drop-button"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="handleCloseCurrent">关闭当前</el-dropdown-item>
          <el-dropdown-item command="handleCloseOther">关闭其他</el-dropdown-item>
          <el-dropdown-item divided command="handleCloseAll">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Icon from '@c/Icon';
  import findIndex from 'lodash/findIndex';
  import remove from 'lodash/remove';
  export default {
    name: 'TabsBar',
    data() {
      return {
        active: this.$route.path
      };
    },
    components: { Icon },
    watch:{
      $route() {
        this.active = this.$route.path;
      }
    },
    computed: {
      ...mapState(['tabs'])
    },
    methods: {
      ...mapMutations(['refreshTab']),
      handleTabClick(tab) {
        const { name } = tab;
        this.$router.push({
          path: name
        })
      },

      handleTabRemove(name) {
        const removeIndex = findIndex(this.tabs, item=>item.path == name);
        const currentIndex = removeIndex - 1;
        this.tabs.splice(removeIndex, 1);
        this.$router.push({
          path: this.tabs[currentIndex].path
        });
      },
      handleCloseCurrent() {
        if(this.$route.path!==this.tabs[0].path) {
          this.handleTabRemove(this.$route.path);
        }
      },
      handleCloseOther() {
        this.refreshTab(this.tabs.filter((tab, index)=>{
          return tab.path===this.$route.path || index===0
        }))
      },
      handleCloseAll() {
        if(this.tabs.length > 1) {
          this.tabs.splice(1, this.tabs.length-1);
          this.$router.push({
            path: this.tabs[0].path
          });
        }
      },
      handleTabCommand(command) {
        this[command]();
      }
    }
  };
</script>


