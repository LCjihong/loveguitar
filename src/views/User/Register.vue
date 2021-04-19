<template>
  <div id="register-page">
    <div class="content">
      <header class="clear"><p class="fl">LoveGuitar账号注册</p><p class="fr">已有账号，<router-link tag="span" to="/login">马上登录</router-link></p></header>
      <div class="regbox">
        <h1>LoveGuitar账号注册</h1>
        <section>
          <el-form class="clear" ref="form" :model="form">
            <el-form-item class="fl" style="width:50%" label="昵称："><el-input v-model="form.nick"></el-input></el-form-item>
            <el-form-item class="fl" style="width:50%" label="手机号："><el-input v-model="form.phone"></el-input></el-form-item>
            <el-form-item class="fl" style="width:50%" label="密码："><el-input v-model="form.password"></el-input></el-form-item>
            <el-form-item class="fl" style="width:50%" label="确认密码："><el-input v-model="form.repassword"></el-input></el-form-item>
            <el-form-item class="fl"><el-checkbox v-model="form.rule">我已阅读并接受《LoveGuitar吉他资源共享平台服务协议》</el-checkbox></el-form-item>
            <div class="btn-box fl" style="width:100%"><button>注册</button></div>
          </el-form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Register',
  data(){
    return{
      form:{
        nick:'',
        phone:'',
        password:'',
        repassword:'',
        rule:false
      }
    }
  }
}
</script>

<style lang="less" scoped>
@base-color: #f4f4f4;
@main-color: #00B1A0;

#register-page{
  width: 100%;
  height: 100vh;
  background-color: @base-color;
  box-sizing: border-box;
  padding-top: 160px;
  min-width: 1200px;
}
.content{
  width: 1200px;
  margin: 0 auto;
  header{
    height: 40px;
    line-height: 40px;
    margin-bottom: 40px;
    .fl{font-size: 22px;}
    .fr{font-size: 14px;a{color: @main-color;&:hover{text-decoration: underline;}}}
  }
  .regbox{
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h1{height:77px;font-size: 25px;line-height: 77px;color: #ffffff;background-color: @main-color;text-align: center;letter-spacing: 1px;}
    section{padding: 50px 150px;
      /deep/.el-form-item__label{float: none;}
      /deep/.el-input{width: 90%;}
      /deep/.el-input__inner{background-color: @base-color;}
      .btn-box{text-align: center;
        button{width: 300px;line-height: 44px;color: #b2b2b2;background-color: #eeeeee;border-radius: 5px;cursor: pointer;
          &:hover{background-color: @main-color;color: #fff;}
        }
      }
    }
  }
}
</style>