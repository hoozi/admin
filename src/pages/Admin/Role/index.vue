<template>
<el-card shadow="never" :body-style="{padding: '32px'}">
  
  <el-row justify="space-between" class="row" type="flex">
    <el-col :span="8">
      <el-button size="small" type="primary" @click="handleAdd"><icon type="plus" size="small"/> 新建角色</el-button>
    </el-col>
    <el-col :span="8">
      <el-form ref="form" v-model="searchForm" label-width="70px" size="small" label-position="left" @submit.native.prevent="handleSearch">
        <el-input placeholder="请输入角色名称，并按回车搜索" v-model="searchForm.roleName" size="small">
          <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
        </el-input>
      </el-form>
    </el-col>
  </el-row>
  
  <standard-table
    size="medium"
    module="role"
    :params="searchForm"
    :loading="pagerFetching"
    border
    stripe
  >
    <el-table-column
      property="roleName"
      label="角色名称"
      sortable
    />
    <el-table-column
      property="roleCode"
      label="角色代码"
    />
    <el-table-column
      property="deptName"
      label="所属部门"
    >
      <template slot-scope="scope">
        <div class="role-tag-list">
          <el-tag size="small">{{scope.row.deptName}}</el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      property="roleDesc"
      label="角色描述"
    >
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
      label="修改时间"
      width="190"
    >
      <template slot-scope="scope">
        <span v-if="scope.row.updateTime" class="has-update">{{scope.row.updateTime | formatDate}}</span>
        <span v-else>{{scope.row.createTime | formatDate}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="270" fixed="right">
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
          <el-button 
            size="mini"
            type="success"
            icon="el-icon-erp-safetycertificate"
            @click="handleAuth(scope.row)">授 权</el-button>
      </template>
    </el-table-column>
  </standard-table>
  <el-dialog
    title="设置权限"
    width="550px"
    :visible.sync="visibleAuthDialog"
  >
    <el-tree
      ref="authTree"
      v-loading="authTreeFetching"
      :data="authTree"
      node-key="id"
      show-checkbox
      default-expand-all
      class="auth-tree"
      @check="handleAuthCheck"
    >
    </el-tree>
    <div slot="footer">
      <el-button 
          type="primary" 
          size="small" 
          @click="handleSetAuth" 
          :loading="authSubmitting">确 定</el-button>
        <el-button size="small" @click="visibleAuthDialog=false">取 消</el-button>
    </div>
  </el-dialog>
  <el-dialog 
    :title="isAdd ? '新建角色' : '编辑角色'"  
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
      @submit.native.prevent="handleSubmitRole"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input autocomplete="off" v-model="detail.roleName" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="角色代码" prop="roleCode">
        <el-input autocomplete="off" v-model="detail.roleCode" placeholder="请输入"></el-input>
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
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input autocomplete="off" v-model="detail.roleDesc" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label-width="0" style="text-align:center">
        <el-button 
          type="primary" 
          size="small" 
          native-type="submit"
          @submit.native.prevent="handleSubmitRole" 
          :loading="submitting">确 定</el-button>
        <el-button size="small" @click="handleResetDialog">取 消</el-button>
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
  import uniqWith from 'lodash/uniqWith';
  import flattenDeep from 'lodash/flattenDeep';
  export default {
    name: 'RolePage',
    components: {
      StandardTable,
      Icon
    },
    data() {
      return {
        params: {
          menuIds: [],
          roleId: ''
        },
        visibleTree: false,
        isAdd: true,
        visibleDialog: false,
        visibleAuthDialog: false,
        searchForm: {
          roleName: ''
          /* deptId: '',
          role: '',
          delFlag: '',
          createTime: [] */
        },
        rules: {
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' }
          ],
          roleCode: [
            { required: true, message: '请输入角色代码', trigger: 'blur' }
          ],
          deptName: [ 
            { required: true, message: '请选择部门', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.getPager();
    },
    computed: {
      ...getLoadings((loadings) => ({
        pagerFetching: loadings.action('role/getPager'),
        deleting: loadings.action('role/deleteRole'),
        detailFetching: loadings.action('role/getDetail'),
        deptTreeFetching: loadings.action('dept/getDeptTree'),
        submitting: loadings.action('role/addOrEditRole'),
        authTreeFetching: loadings.action(['auth/getAuth', 'role/getCurrentAuth']),
        authSubmitting: loadings.action('role/setAuth')
      })),
      ...mapState('role',['detail']),
      ...mapState('dept', ['tree']),
      ...mapState('role', ['role', 'currentAuth']),
      ...mapState('auth', {
        authTree: 'auth'
      })
    },
    methods: {
      ...mapActions('role', ['getPager',  'deleteRole', 'addOrEditRole', 'getDetail', 'getCurrentAuth', 'setAuth']),
      ...mapActions('dept', ['getDeptTree']),
      ...mapActions('auth', ['getAuth']),
      ...mapMutations('role', {
        resetDetail(commit) {
          commit('RESET_ROLE_DETAIL');
        },
        setCurrentAuth(commit, currentAuth) {
          commit('SAVE_AUTH_LIST', currentAuth);
        }
      }),
      getPageByForm() {
        this.getPager(this.searchForm);
      },
      getCheckedKeys(trees, authKeys) {
        return trees.map(tree => {
          if(tree.children && tree.children.length >0) {
            return this.getCheckedKeys(tree.children, authKeys)
          }
          return authKeys.filter(a => tree.id === a)
        })
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
          id: row.roleId,
          callback: () => {
            this.getDeptTree();
          }
        });
        this.openDialog(false);
      },
      resetStateWhenAdd() {
        this.resetDetail();
      },
      handleAdd() {
        this.resetStateWhenAdd();
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields();
        this.getDeptTree();
        this.openDialog(true);
      },
      handleDelete(row) {
        this.$confirm(`此操作将永久删除角色${row.roleName}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRole(row.roleId);
        }).catch(() => {});
      },
      handleSubmitRole() {
        const method = this.isAdd ? 'POST' : 'PUT';
        const params = this.detail
        this.$refs.dialogForm.validate(valid => {
          if(!valid) return;
          this.addOrEditRole({
            params, 
            method,
            callback: () => {
              this.visibleDialog = false;
            }
          })
        })
      },
      handleNodeClick(data, node) {
        const { data: {id:roleDeptId, name:deptName} } = node;
        this.visibleTree = false;
        Object.assign(this.detail, { deptName,roleDeptId });
        this.$refs.deptName.focus();
      },
      handleAuth(row) {
        this.visibleAuthDialog = true;
        const { roleCode: code } = row
        this.getAuth(() => {
          this.getCurrentAuth({
            code,
            callback: () => {
              const checkedKeys = this.getCheckedKeys(this.authTree, this.currentAuth);
              this.$refs.authTree.setCheckedKeys(flattenDeep(checkedKeys));
            }
          });
        });
        
        this.params.roleId = row.roleId;
      },
      handleAuthCheck(data, checked) {
        const { checkedKeys } = checked;
        this.setCurrentAuth(checkedKeys)
      },
      handleSetAuth() {
        const { params } = this;
        const menuIds = [...this.currentAuth, ...this.$refs.authTree.getHalfCheckedKeys()];
        //console.log(uniqWith(menuIds))
        params.menuIds = uniqWith(menuIds).join();
        
        this.setAuth({
          params,
          callback: () => {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.visibleAuthDialog = false;
          }
        })
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
