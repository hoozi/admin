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
      <el-col :md="8">
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
      </el-col>
      <el-col :md="8">
        <el-button type="primary" size="small" native-type="submit" @submit.native.prevent="handleSearch">查询</el-button>
        <el-button size="small">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
  <el-button size="small" type="primary" class="mt24 mb16"><icon type="plus" size="small"/> 新建</el-button>
  <standard-table
    :columns="columns"
    size="medium"
    :data="data"
    border
    stripe
  />
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
      Icon
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
        ],
        columns: [
          {
            label: '用户名',
            prop: 'username'
          },
          {
            label: '年龄',
            prop: 'age'
          }
        ],
        data: [
          {
            username: '张三',
            age: '23'
          },
          {
            username: '李四',
            age: '25'
          }
        ]
      }
    },
    methods: {
      ...mapActions('user', ['getUserPage']),
      handleSearch() {
        this.getUserPage();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
