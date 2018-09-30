<template>
  <el-row :gutter="16">
    <el-col :span="15">
      <el-input type="text" placeholder="验证码" autocomplete="off" class="login-line-input" @input="handleInputCode">
        <i slot="prefix" class="el-icon-erp-safetycertificate"></i>
      </el-input>
    </el-col>
    <el-col :span="9">
      <img :src="codeUrl" alt="验证码" @click="handleCodeChange" class="code-img">
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'CodeImg',
    data: () => {
      return {
        randomStr: Date.now()
      }
    },
    computed: {
      codeUrl() {
        return `/code?randomStr=${this.randomStr}`;
      }
    },
    methods: {
      handleCodeChange() {
        this.randomStr = Date.now();
      },
      handleInputCode(value) {
        this.$emit('update:code', value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .code-img {
    cursor: pointer;
    height: 40px;
    width: 100%;
    display: block;
  }
</style>
