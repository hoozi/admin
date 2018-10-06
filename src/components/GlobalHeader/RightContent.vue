<template>
  <div class="header-right-content">
    <div class="header-action">
      <span class="header-action-item">
        <el-badge :value="3">
          <Icon type="bell" />
        </el-badge>
      </span>
      <el-dropdown size="medium" @command="handleMenuCommand">
        <span class="header-action-item">
          <span class="user-avatar">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar">
          </span>
          <span class="user-username">{{username}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="toUserInfo"><Icon type="setting" class="mr8"/>修改密码</el-dropdown-item>
          <el-dropdown-item divided command="logout"><Icon type="logout" class="mr8"/>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import Icon from '@c/Icon';
  import { mapGetters } from 'vuex';
  export default {
    name: 'HeaderRightContent',
    components: {
      Icon
    },
    created() {
      this.$store.dispatch('user/getCurrentUser');
    },
    computed: {
      ...mapGetters('user', ['username'])
    },
    methods: {
      handleLogOut() {
        this.$store.dispatch('user/logout');
      },
      handleMenuCommand(command) {
        if(command == 'logout') {
          this.handleLogOut();
        } else {
          this.$router.push('/user-info')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $color: rgba(0,0,0,.65);
  .el-dropdown {
    color: $color;
  }
  .header-right-content {
    float: right;
    height: 100%;
    .header-action {
      //line-height: 64px;
      height: 100%;
      @at-root #{&}-item {
        .mr8 {
          margin-right: 8px;
        }
        height: 100%;
        display: inline-block;
        padding:13px 12px;
        //line-height: 64px;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          background-color:#f9f9f9;
        }
        .user-avatar {
          width: 24px;
          height: 24px;
          line-height: 24px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
          color: #1890ff;
          box-sizing: border-box;
          vertical-align: middle;
          &>img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
      }
    }
    
  }
</style>

