<template>
  <div class="sidebar">
    <header>
      <img src="../../assets/logo.svg" alt="">LoveGuitar
    </header>
    <section class="square">
      <p @click="$router.push('/bigworld')" class="item">大世界</p>
    </section>
    <section class="classify">
      <p class="title">我的乐谱</p>
      <ul>
        <li class="item" @click="changeType(item.id)" v-for="item in typelist" :key="item.id"><i class="iconfont icon-dian" :style="{color:$store.state.colors.filter(v => v.id == item.status)[0].color}"></i> {{item.name}}<em v-if="item.name != '默认'" @click="delClassify(item.id)" class="iconfont icon-error fr"></em></li>
      </ul>
      <div class="newGroup">
        <p class="item" @click="addTypeJudge = true"><i>+</i> 新建分组</p>
        <el-dialog title="添加分类" v-model="addTypeJudge">
          <el-form :model="newTypeForm">
            <el-form-item label="分组名称" label-width="120px">
              <el-input v-model="newTypeForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择颜色" label-width="120px">
              <ul class="clear color_picker">
                <li
                class="fl"
                v-for="item in colors"
                :key="item.id"
                :style="{backgroundColor:item.color}"
                :class="{active:newTypeForm.status == item.id}"
                @click="colorChange(item.id)">√</li>
              </ul>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addTypeJudge = false">取 消</el-button>
              <el-button type="primary" @click="typeSubmit">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </section>

    <section class="collect">
      <p @click="$emit('click-fav')" class="item">我的收藏</p>
    </section>


  </div>
</template>

<script>
export default {
  name:'leftMenu',
  data(){
    return {
      newGroupName:'',
      addTypeJudge:false,
      typelist:[],
      newTypeForm:{
        userId:localStorage.getItem('user_id'),
        name:'',
        status:''
      },
      color_active:-1,
      colors:[],
      statuses:[]
    }
  },
  beforeMount(){
    this.updateUserType();
  },
  mounted(){
  },
  methods:{
    typeSubmit(){
      this.axios.post('/user/addClassType', this.$store.state.stringify(this.newTypeForm)).then(res => {
        if (res.data.data == '添加成功!') {
          this.$message({
            message:'添加成功',
            type:'success'
          });
          this.addTypeJudge = false;
          this.updateUserType();
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          });
        }
      })
    },
    updateUserType(){
      // 获取用户所有类别
      this.axios.post('/user/getClassType', this.$store.state.stringify({username:localStorage.getItem('username')})).then(res => {
        this.typelist = res.data.filter(v => {
          if (v.name == '收藏') {
            localStorage.setItem('favId', v.id);
          }
          return v.name != '收藏'
        }).map(v => {
          if (v.name == '默认') {
            localStorage.setItem('user_id', v.user_id);
            this.$emit('change-classid', v.id);
          }
          return v;
        });
        localStorage.setItem('TypeList', this.typelist.map(v => JSON.stringify(v)).join('$'));
        this.statuses = this.typelist.map(v => {
          return v.status;
        })
        this.colors = this.$store.state.colors.filter((v) => {
          return this.statuses.indexOf(v.id) == -1;
        })
      })
    },
    colorChange(id){
      this.newTypeForm.status = id;
    },
    delClassify(classId){
      this.axios.post('/user/deleteClassType', this.$store.state.stringify({id:classId})).then(res => {
        if (res.data.data == '删除成功!') {
          this.$message({
            message:'删除成功！',
            type:'success'
          })
          this.updateUserType();
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          })
        }
      })
    },
    changeType(classId){
      this.$emit('change-classid', classId);
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar{
  width: 240px;
  height: 100vh;
  background-color: rgb(243,247,250);
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 20px;
  box-sizing: border-box;
  color: #25262b;
  font-size: 14px;
  header{
    font: 20px/30px '';
    text-align: center;
    font-weight: 600;
    padding: 25px 0;
    img{width: 30px;}
  }

  section{
    padding: 10px 0;
    border-bottom: 1px solid rgb(204, 204, 204);
    font: 400 12px/22px '';

    .title{
      color: rgb(102,102,102);
      padding: 4px 0 4px;
    }

    &:last-of-type{
      border: none;
    }
  }
  .item{
    font: 400 14px/22px '';
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    &:hover{
      background-color: rgb(234,238,241);
    }
  }
  li.item .iconfont{
    font-size: 12px;
  }
}
.color_picker{
  padding-top: 12px;
}
.color_picker li{
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
  box-sizing: border-box;
  color: #fff;
  font-size: 0;
  text-align: center;
  &.active{
    font: 12px/20px '';
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>