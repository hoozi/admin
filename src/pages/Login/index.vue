<template>
  <el-row class="row-hfull">
    <el-col :span="15" class="bg">
      <div class="mask">
        <div class="mask-text">
          <h1>优质服务，追求卓越</h1>
          <p>Amazing Stuff is Lorem Here.ICE Team</p>
        </div>
      </div>
    </el-col>
    <el-col :span="9" class="login-area">
      <div class="login-box">
        <h2 class="login-title">登录</h2>
        <el-form status-icon :rules="rules" :model="loginForm" ref="loginForm" @submit.native.prevent="handleLogin">
          <el-form-item :prop="item.vmodel" v-for="item in map" :key="item.vmodel">
            <el-input 
              :type="item.type" 
              :placeholder="item.placeholder" 
              v-model="loginForm[`${item.vmodel}`]" 
              autocomplete="off" 
              class="login-line-input"
            >
              <i slot="prefix" :class="[`el-icon-erp-${icon(item.vmodel)}`]"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="code">
            <code-img :code.sync="loginForm.code"/>
          </el-form-item>
          <el-form-item prop="">
            <el-button type="primary" native-type="submit" @submit.native.prevent="handleLogin" class="login-button">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import map from './map';
  import CodeImg from './CodeImg';
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
  .bg, 
  .login-area,
  .row-hfull {
    height: 100%;
  }
  .bg {
    background-image: url('../../assets/bg.jpg');
    background-size: cover;
    .mask {
      background-color: rgba(0,0,0,.6);
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .mask-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        h1 {
          margin-top: 60px;
          font-weight: 500;
          font-size: 38px;
          line-height: 1.5;
          text-align: center;
          color: rgb(255, 255, 255);
        }
        p {
          margin-top: 30px;
          font-size: 16px;
          color: rgb(255, 255, 255);
        }
      }
    }
  }
  .login-area {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .login-box {
      width: 360px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .login-title {
        margin-bottom: 40px;
        font-weight: 500;
        font-size: 32px;
        text-align: center;
        letter-spacing: 4px;
      }
      .login-button {
        width: 100%;
        margin-top: 24px;
      }
      .el-form {
        width: 100%;
      }
    }
  }
</style>

