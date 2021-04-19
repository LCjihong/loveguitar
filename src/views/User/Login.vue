<template>
  <div class="login-bg">
    <h1><img src="../../assets/logo.svg" alt="Loveguitar"> LoveGuitar吉他资源共享平台</h1>
    <div class="main-box clear">
      <div class="left fl"><img src="../../assets/Login/login.png" alt="LoveGuitar"></div>
      <div class="right fr">
        <div class="login-cell">
          <h3 class="cell-title">登录</h3>
          <div class="input-box"><el-input v-model="form.user" placeholder="用户名/账号"></el-input></div>
          <div class="input-box"><el-input v-model="form.password" placeholder="密码"></el-input></div>
          <div class="input-box"><el-button class="submit" @click="submit" :disabled="subPermit">账号密码登录</el-button></div>
          <div class="remeber clear">
            <div class="left fl">
              <el-checkbox v-model="remeber">5天记住登录</el-checkbox>
            </div>
            <div class="right fr">
              <el-link href="/register">注册</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link href="">忘记密码</el-link>
            </div>
          </div>
          <div class="other">
            <p>第三方账号登录</p>
            <div class="icon-box clear">
              <img class="fl" src="../../assets/Login/weixin.png" alt="微信">
              <img class="fr" src="../../assets/Login/qq.png" alt="QQ">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'User',
  data(){
    return {
      form:{
        user:'',
        password:''
      },
      remeber:''
    }
  },
  computed:{
    subPermit(){
      return !(this.form.user != '' && this.form.password != '');
    }
  },
  methods:{
    submit(){
      // this.$router.push('home')
      
    }
  }
}
</script>

<style lang="less" scoped>
.login-bg{
  min-width: 1700px;
  width: 100%;
  height: 100vh;
  background-color: #eee;
  background: center center url('../../assets/Login/bg.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}

h1{
  font-size: 40px;
  line-height: 34px;
  color: white;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 158px 0 0 360px;
  font-size: 23px;
  img{
    width: 40px;
  }
}
.main-box{
  padding: 0 250px;
}
.login-cell{
  width: 400px;
  height: 500px;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 30px;

  /deep/.el-input__inner{
    background-color: #f4f4f4;
  }

  .cell-title{
    font: 500 18px / 56px '';
    border-bottom: 1px solid #cccccc;
    margin-bottom: 45px;
  }
  .input-box{
    margin-bottom: 20px;
  }
  .other{
    padding: 55px 113px;
  }
  .other p{
    color: #666666;
    text-align: center;
  }
  .other .icon-box{
    margin-top: 20px;
  }
  .submit{
    width: 100%;
  }
}
</style>