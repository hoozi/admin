<template>
<el-card shadow="never" :body-style="{padding: '32px'}">
  
  <el-row justify="space-between" class="row" type="flex">
    <el-col :span="8">
      <el-button size="small" type="primary" @click="handleAdd"><icon type="adduser" size="small"/> 新建用户</el-button>
      
    </el-col>
    <el-col :span="8">
      <el-form ref="form" v-model="searchForm" label-width="70px" size="small" label-position="left" @submit.native.prevent="handleSearch">
        <el-input placeholder="请输入用户名，并按回车搜索" v-model="searchForm.username" size="small">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
        </el-input>
      </el-form>
    </el-col>
  </el-row>
  
  <standard-table
    size="medium"
    module="user"
    :params="searchForm"
    :loading="pagerFetching"
    border
    stripe
  >
    <el-table-column
      property="username"
      label="用户名"
    />
    <el-table-column
      property="deptName"
      label="所属部门"
    />
    <el-table-column
      label="角色"
    >
      <template slot-scope="scope">
        <el-tag size="small" v-for="item in scope.row.roleList" :key="item.roleId">{{item.roleName}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      property="delFlag"
      label="状态"
    >
      <template slot-scope="scope">
        <status :status="scope.row.delFlag" />
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
    >
      <template slot-scope="scope">
        {{scope.row.createTime | formatDate}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-erp-edit"
          @click="handleEdit(scope.row)">编 辑</el-button>
          <el-button 
            size="mini"
            type="danger"
            icon="el-icon-erp-deleteuser"
            :loading="deleting"
            @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </standard-table>
  <el-dialog :title="isAdd ? '新增用户' : '编辑用户'"  :visible.sync="userDialog" width="500px">
    <el-form size="small" label-width="70px" label-position="right" v-loading="!isAdd && detailFetching">
      <el-form-item label="用户名" required>
        <el-input autocomplete="off" v-model="detail.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-select autocomplete="off"></el-select>
      </el-form-item>
      
    </el-form>
    
    <div slot="footer" class="dialog-footer">
      <el-button @click="userDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="userDialog = false" size="small">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
  import StandardTable from '@c/StandardTable';
  import Icon from '@c/Icon';
  import { mapActions, mapState } from 'vuex';
  import { getLoadings } from '@tw666/vuex-loading';
  export default {
    name: 'UserPage',
    components: {
      StandardTable,
      Icon,
      status: {
        name: 'Status',
        props: ['status'],
        // eslint-disable-next-line
        render(h) {
          const statusMap = ['有效', '无效', '锁定'];
          const statusType = ['success', 'danger', 'warning']
          return <el-tag type={statusType[this.status]} size="small">{statusMap[this.status]}</el-tag>
        }
      }
    },
    data() {
      return {
        isAdd: true,
        deleteVisible: false,
        userDialog: false,
        searchForm: {
          username: ''
          /* deptId: '',
          role: '',
          delFlag: '',
          createTime: [] */
        }
      }
    },
    mounted() {
      this.getPager();
    },
    computed: {
      ...getLoadings((loadings) => ({
        pagerFetching: loadings.action('user/getPager'),
        deleting: loadings.action('user/deleteUser'),
        detailFetching: loadings.action('user/getDetail')
      })),
      ...mapState('user',['detail'])
    },
    methods: {
      ...mapActions('user', ['getPager', 'deleteUser', 'getDetail']),
      
      getPageByForm() {
        this.getPager(this.searchForm);
      },
      openDialog(isAdd) {
        this.isAdd = isAdd;
        this.userDialog = true;
      },
      handleSearch() {
        this.getPageByForm();
      },
      // eslint-disable-next-line
      handleEdit(row) {
        this.getDetail(row.userId);
        this.openDialog(false);
      },
      handleAdd() {
        this.$store.state.user.detail = {};
        this.openDialog(true);
      },
      handleDelete(row) {
        this.$confirm(`此操作将永久删除用户${row.username}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(row.userId);
        }).catch(() => {});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row {
    margin-bottom: 16px;
    .el-col {
      width: 240px;
      .el-icon-search {
        cursor: pointer;
        &:hover {
          color: #999;
        }
      }
    }
  }
</style>
