<template>
  <div class="login-container">
    <div class="login-area">
      <div class="login-header">
        <h1>优质服务，追求卓越</h1>
        <p>Quality service, The pursuit of excellence</p>
      </div>
      <el-form status-icon :rules="rules" :model="loginForm" ref="loginForm" @submit.native.prevent="handleLogin">
        <el-form-item :prop="item.vmodel" v-for="item in map" :key="item.vmodel">
          <el-input 
            :type="item.type" 
            :placeholder="item.placeholder" 
            v-model="loginForm[`${item.vmodel}`]" 
            autocomplete="off" 
          >
            <i slot="prefix" :class="[`el-icon-erp-${icon(item.vmodel)}`,'prefix']"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <code-img :code.sync="loginForm.code"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitting" native-type="submit" @submit.native.prevent="handleLogin" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import map from './map';
  import CodeImg from './CodeImg';
  import { getLoadings } from '@tw666/vuex-loading';
  export default {
    name: 'PageLogin',
    components: { CodeImg },
    data: () => {
      return {
        map,
        loginForm: {
          username: 'admin',
          password: '123456',
          code: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '验证码为4位', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...getLoadings((loadings) => ({
        submitting: loadings.action('user/login')
      }))
    },
    methods: {
      icon(vmodel) {
        return vmodel === 'username' ? 'user' : 'lock';
      },
      handleLogin() {
        //this.$store.user.dispatch('login');
        this.$refs.loginForm.validate((valid) => {
          if(!valid) return;
          const loginForm = {
            ...this.loginForm,
            password: 'iXB7te2ViIqBT8IbW3y4fA==',
            randomStr: Date.now(),
            grant_type: 'password',
            scope: 'server'
          }
          this.$store.dispatch('user/login', loginForm);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background-image: url('../../assets/bg.jpg');
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .login-area {
    width: 360px;
  }
  .login-header {
    margin-bottom: 32px;
    text-align: center;
    h1, p {
      color: #fff;
    }
  }
  .login-button {
    width: 100%;
  }
</style>

