<template>
<el-card shadow="never" :body-style="{padding: '32px'}">
  
  <el-row justify="space-between" class="row" type="flex">
    <el-col :span="8">
      <el-button size="small" type="primary" @click="handleAdd"><icon type="plus" size="small"/> 新建用户</el-button>
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
      sortable
    />
    <el-table-column
      property="deptName"
      label="所属部门"
    />
    <el-table-column
      label="角色"
    >
      <template slot-scope="scope">
        <div class="role-tag-list">
          <el-tag size="small" v-for="item in scope.row.roleList" :key="item.roleId">{{item.roleName}}</el-tag>
        </div>
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
      width="190"
    >
      <template slot-scope="scope">
        {{scope.row.createTime | formatDate}}
      </template>
    </el-table-column>
    <el-table-column
      label="更新时间"
      width="190"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.updateTime" class="has-update">{{scope.row.updateTime | formatDate}}</span>
        <span v-else>{{scope.row.createTime | formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220" fixed="right">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-erp-edit"
          @click="handleEdit(scope.row)">编 辑</el-button>
          <el-button 
            size="mini"
            type="danger"
            icon="el-icon-erp-delete"
            :loading="deleting"
            @click="handleDelete(scope.row)">删 除</el-button>
      </template>
    </el-table-column>
  </standard-table>
  <el-dialog 
    :title="isAdd ? '新建用户' : '编辑用户'"  
    :visible.sync="visibleDialog" 
    width="550px"
    @close="$refs.dialogForm.resetFields()"
  >
    <el-form 
      ref="dialogForm"
      size="medium" 
      label-width="85px" 
      label-position="right" 
      v-loading="!isAdd && detailFetching" 
      :model="detail"
      status-icon
      :rules="rules"
      @submit.native.prevent="handleSubmitUser"
    >
      <el-form-item label="用户名" prop="username">
        <el-input autocomplete="off" v-model="detail.username" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="密码" :required="isAdd"  prop="password">
        <el-input autocomplete="off" type="password" v-model="detail.password" :placeholder="isAdd ? '请输入' : '留空则不修改'"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="deptName"> 
        <el-popover
          width="400"
          trigger="click"
          v-model="visibleTree">
          <el-scrollbar style="height: 300px;">
            <el-tree
              :data="tree"
              default-expand-all
              ref="tree"
              v-loading="deptTreeFetching"
              node-key="id"
              @node-click="handleNodeClick"
              :props="{children: 'children', label: 'name'}">
            </el-tree>
          </el-scrollbar>
          <el-input slot="reference" autocomplete="off" ref="deptName" readonly v-model="detail.deptName" placeholder="请选择"></el-input>
        </el-popover>
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-select 
          class="full-select" 
          :loading="roleByIdFetching" 
          multiple 
          v-model="detail.role"
          placeholder="请先选择部门"
        >
          <el-option
            v-for="item in role"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-select class="full-select" v-model="detail.delFlag" >
          <el-option 
            v-for="option in statusOptions" 
            :key="option.value"
            :label="option.label" 
            :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label-width="0" style="text-align:center">
        <el-button size="small" @click="handleResetDialog">取 消</el-button>
        <el-button 
          type="primary" 
          size="small" 
          native-type="submit"
          @submit.native.prevent="handleSubmitUser" 
          :loading="submitting">确 定</el-button>
      </el-form-item>

    </el-form>
  </el-dialog>
</el-card>
</template>

<script>
  import StandardTable from '@c/StandardTable';
  import Icon from '@c/Icon';
  import { mapActions, mapState, mapMutations } from 'vuex';
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
      const validatorPassword = (rule, value, callback) => {
        if(this.isAdd) {
          if(!value) {
            callback('请输入密码');
          } else if(value.length < 6) {
            callback('至少6个字符');
          }
        } else {
          if(value && value.length < 6) {
            callback('至少6个字符');
          }
        }
        callback();
      }
      return {
        visibleTree: false,
        isAdd: true,
        deleteVisible: false,
        visibleDialog: false,
        expandedKeys: -1,
        searchForm: {
          username: ''
          /* deptId: '',
          role: '',
          delFlag: '',
          createTime: [] */
        },
        statusOptions: [
          {
            label: '有效',
            value: '0'
          },
          {
            label: '无效',
            value: '1'
          },
          {
            label: '锁定',
            value: '2'
          }
        ],
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { validator: validatorPassword, trigger:'blur' }
          ],
          deptName: [ 
            { required: true, message: '请选择部门', trigger: 'blur' }
          ],
          role: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ]
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
        detailFetching: loadings.action('user/getDetail'),
        deptTreeFetching: loadings.action('dept/getDeptTree'),
        roleByIdFetching: loadings.action('role/getRoleByDeptId'),
        submitting: loadings.action('user/addOrEditUser')
      })),
      ...mapState('user',['detail']),
      ...mapState('dept', ['tree']),
      ...mapState('role', ['role'])
    },
    methods: {
      ...mapActions('user', ['getPager', 'deleteUser', 'getDetail', 'addOrEditUser']),
      ...mapActions('dept', ['getDeptTree']),
      ...mapActions('role', ['getRoleByDeptId']),
      ...mapMutations('user', {
        resetDetail(commit) {
          commit('RESET_USER_DETAIL');
        }
      }),
      ...mapMutations('role', {
        resetRole(commit) {
          commit('RESET_ROLE');
        }
      }),
      getPageByForm() {
        this.getPager(this.searchForm);
      },
      openDialog(isAdd) {
        this.isAdd = isAdd;
        this.visibleDialog = true;
      },
      handleResetDialog() {
        this.visibleDialog = false;
      },
      handleSearch() {
        this.getPageByForm();
      },
      // eslint-disable-next-line
      handleEdit(row) {
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
        this.getDetail({
          id: row.userId,
          callback: () => {
            this.getDeptTree();
            this.getRoleByDeptId(row.deptId);
          }
        });
        this.openDialog(false);
      },
      resetStateWhenAdd() {
        this.resetRole();
        this.resetDetail();
      },
      handleAdd() {
        this.resetStateWhenAdd();
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
        this.getDeptTree();
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
      },
      handleSubmitUser() {
        const method = this.isAdd ? 'POST' : 'PUT';
        const params = this.detail
        this.$refs.dialogForm.validate(valid => {
          if(!valid) return;
          this.addOrEditUser({
            params, 
            method,
            callback: () => {
              this.visibleDialog = false;
            }
          })
        })
      },
      handleNodeClick(data, node) {
        const { data: {id:deptId, name:deptName} } = node;
        this.visibleTree = false;
        Object.assign(this.detail, { deptName,deptId });
        this.getRoleByDeptId(deptId);
        this.$refs.deptName.focus();
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
  .full-select {
    width: 100%;
  }
  .role-tag-list {
    .el-tag {
      margin: 0 8px 8px 0;
      &:last-child {
        margin: 0;
      }
    }
  }
  .has-update {
    //color: #4a89dc;
  }
</style>
