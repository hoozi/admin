<template>
<el-card shadow="never" :body-style="{padding: '32px'}">
  <el-form ref="form" v-model="searchForm" label-width="70px" size="small" label-position="left" @submit.native.prevent="handleSearch">
    <el-row :gutter="30">
      <el-col :md="8">
        <el-form-item label="用户名称">
          <el-input placeholder="请输入" v-model="searchForm.username"></el-input>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item label="所属部门">
          <el-input placeholder="请输入" v-model="searchForm.deptId"></el-input>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item label="用户角色">
          <el-input placeholder="请输入" v-model="searchForm.role"></el-input>
        </el-form-item>
      </el-col>
      <el-col :md="8">
        <el-form-item label="用户状态">
          <el-select style="width:100%" v-model="searchForm.delFlag">
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :md="8">
        <el-form-item label="创建时间">
          <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="searchForm.createTime"
          >
          </el-date-picker>
        </el-form-item>
      </el-col> -->
      <el-col :md="8">
        <el-button type="primary" size="small" native-type="submit" @submit.native.prevent="handleSearch">查 询</el-button>
        <el-button size="small" @click="handleReset">重 置</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-button size="small" type="primary" class="mt24 mb16"><icon type="adduser" size="small"/> 新建用户</el-button>
  <standard-table
    size="medium"
    model="user"
    border
    stripe
  >
    <el-table-column
      type="index"
    />
    <el-table-column
      property="userId"
      label="id"
      width="80"
    />
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
      width="180"
    >
      <template slot-scope="scope">
        <el-tag size="small" v-for="item in scope.row.roleList" :key="item.roleId">{{item.roleName}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      property="delFlag"
      label="状态"
      width="100"
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          icon="el-icon-erp-edit"
          @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-erp-deleteuser"
          @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
      </template>
    </el-table-column>
  </standard-table>
</el-card>
</template>

<script>
  import StandardTable from '@c/StandardTable';
  import Icon from '@c/Icon';
  import { mapActions } from 'vuex';
  
  export default {
    name: 'User',
    components: {
      StandardTable,
      Icon,
      status: {
        name: 'Status',
        props: ['status'],
        render(h) {
          const statusMap = ['有效', '无效', '锁定'];
          const statusType = ['success', 'danger', 'warning']
          return <el-tag type={statusType[this.status]} size="small">{statusMap[this.status]}</el-tag>
        }
      }
    },
    data() {
      return {
        searchForm: {
          username: '',
          deptId: '',
          role: '',
          delFlag: '',
          createTime: []
        },
        options: [
          {
            label: '全部',
            value: ''
          },
          {
            label:'有效',
            value: 0
          },
          {
            label:'无效',
            value: 1
          },
          {
            label:'锁定',
            value: 9
          }
        ]
      }
    },
    mounted() {
      this.getUserPage();
    },
    methods: {
      ...mapActions('user', ['getUserPage']),
      getPageByForm() {
        this.getUserPage(this.searchForm);
      },
      handleSearch() {
        this.getPageByForm();
      },
      handleReset() {
        for(let key in this.searchForm) {
          this.searchForm[key] = ''
        }
        this.getPageByForm();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
