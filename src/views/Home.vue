<template>
  <div id="home-box">
    <div class="leftmenu fl">
      <left-menu @click-fav="clickFav()" @change-classid="classId = $event"></left-menu>
    </div>
    <div class="right fr">
      <header v-text="headerText"></header>

      <div v-if="headerText != '我的收藏'" class="content">
        <div class="option-box">
        </div>
        <el-dialog title="添加乐谱" v-model="addMusicJudge">
          <el-form :model="newMusicForm">
            <el-form-item label="曲谱封面" label-width="120px">
              <el-upload
                class="upload-demo"
                action="http://renjihong.zone/LGuitar/music/uploadGuitar"
                :on-success="response => {onUpload(response)}"
                :file-list="fileList"
                :on-exceed="() => {$message({message:'封面数量超限制', type:'warning'})}"
                limit="1"
                accept="image/*"
                list-type="picture">
                <el-button size="small" type="primary">选择封面</el-button>
                <!-- <template #tip>
                  <div class="el-upload__tip">
                    只能上传 jpg/png 文件，且不超过 500kb
                  </div>
                </template> -->
              </el-upload>
            </el-form-item>
            <el-form-item label="歌曲名" label-width="120px">
              <el-input type="text" v-model="newMusicForm.songname" placeholder="请输入歌曲名"></el-input>
            </el-form-item>
            <el-form-item label="歌手名" label-width="120px">
              <el-input type="text" v-model="newMusicForm.singername" placeholder="请输入歌手名"></el-input>
            </el-form-item>
            <el-form-item label="是否公开" label-width="120px">
              <el-switch v-model="newMusicForm.status_" active-text="公开" inactive-text="不公开"></el-switch>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="addMusicJudge = false">取 消</el-button>
              <el-button type="primary" @click="newMusicSubmit">确 定</el-button>
            </span>
          </template>
        </el-dialog>
        <ul class="music clear">
          <li 
          class="fl"
          v-for="item in musicList"
          :key="item.id"
          @click.stop="$router.push('/musicdetail/' + item.id)">
            <div class="opt"><i @click.stop="delMusic(item.id)" class="iconfont icon-error fr"></i></div>
            <div class="img-box">
              <img :src="`http://renjihong.zone/music${item.path}/${item.image}`" alt="">
            </div>
            <div class="desc">
              <p><span>歌名：</span>{{item.songname}}</p>
              <p><span>歌手：</span>{{item.singername}}</p>
              <p><span>是否公开：</span>{{item.status == 0 ? '公开' : '不公开'}}</p>
            </div>
          </li>
          <li class="add-btn fl" @click="addMusicJudge = true">+</li>
        </ul>
      </div>

      <div v-if="headerText == '我的收藏'" class="content">
        <el-table :data="musicList" stripe>
          <el-table-column prop="songname" label="歌曲名"></el-table-column>
          <el-table-column prop="singername" label="歌手名"></el-table-column>
          <el-table-column prop="nickname" label="所有者"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                size="mini"
                @click="$router.push('/lookmd/' + scope.row.id)">查看</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="delFav(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import leftMenu from "../components/home/leftMenu"
export default {
  name: 'Home',
  components:{
    leftMenu
  },
  data(){
    return {
      musicList:[],
      headerText:'默认',
      addMusicJudge:false,
      fileList:[],
      classId:'',
      newMusicForm:{
        songname:'',
        singername:'',
        status:'',
        userId:localStorage.getItem('user_id'),
        classId:'',
        image:'',
        path:'',
        status_:false,
      },
    }
  },
  watch:{
    classId:function (newval) {
      this.headerText = localStorage.getItem('TypeList').split('$').map(v => JSON.parse(v)).filter((v) => v.id == newval)[0].name;
      this.updateMusicList();
    }
  },
  beforeMount(){
    // 获取用户所有类别
    this.axios.post('/user/getClassType', this.$store.state.stringify({username:localStorage.getItem('username')})).then(res => {
      res.data.forEach(v => {
        if (v.name == '默认') {
          this.classId = v.id;
        }
        // 获取用户所有乐谱
        this.updateMusicList();
      });
    })
  },
  methods:{
    onUpload(response){
      this.newMusicForm.image = response.image;
      this.newMusicForm.path = response.path;
    },
    updateMusicList(){
      this.axios.post('/music/getGuitarList', this.$store.state.stringify({
        username:localStorage.getItem('username'),
        classId: this.classId
      })).then(res =>{
        this.musicList = res.data;
        console.log(this.musicList);
      })
    },
    newMusicSubmit(){
      this.newMusicForm.status = this.newMusicForm.status_ ? '0' : '1';
      this.newMusicForm.classId = this.classId;
      console.log(this.newMusicForm);
      this.axios.post('/music/addGuitar', this.$store.state.stringify(this.newMusicForm)).then(res => {
        if (res.data.data == '添加成功!') {
          this.$message({
            message:'添加成功！',
            type:'success'
          })
          this.addMusicJudge = false;
          this.updateMusicList();
        }
      })
    },
    delMusic(musicId){
      this.axios.post('/music/deleteGuitar', this.$store.state.stringify({id:musicId})).then(res => {
        if (res.data.data == '删除成功!') {
          this.$message({
            message:'删除成功！',
            type:'success'
          })
          this.updateMusicList();
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          })
        }
      })
    },
    clickFav(){
      this.axios.post('/leave/getCollList', this.$store.state.stringify({
        username:localStorage.getItem('username'),
      })).then(res =>{
        this.musicList = res.data;
        console.log(this.musicList);
      })
      this.headerText = '我的收藏';
    },
    delFav(favId){
      console.log(favId);
      this.axios.post('/leave/deleteColl', this.$store.state.stringify({id:favId})).then(res => {
        if (res.data.data == '取消成功!') {
          this.$message({
            message:'取消收藏成功!',
            type:'success'
          })
          this.clickFav();
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          })
        }
      })
    }
    
  }
}
</script>

<style lang="less" scoped>
/deep/.el-button{
  padding: 0 16px;
  border-radius: unset;
}
#home-box{
  width: 100vw;
  height: 100vh;

  .leftMenu{
    width: 240px;
    height: 100%;
  }

  .right{
    width: calc(100% - 240px);
    header{
      font: 18px/36px '';
      padding: 20px 24px 32px;
    }
  }
  .content{
    padding: 8px 16px;
  }
}
.option-box{
  padding: 0 16px;
  // border-bottom: 1px solid #999999;
}
.music li{
  padding:16px;
  background-color: rgb(243,247,250);
  border-radius: 8px;
  width: 200px;
  cursor: pointer;
  margin: 0 16px 16px 0;

  &:hover{
    background-color: rgb(234,238,241);

    .opt .icon-error{
      color: #333333;
    }
  }

  &.add-btn{
    width: 198px;
    height: 306px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: unset;
    color: #999999;
    font-size: 30px;
    border: 1px dashed #999999;

    &:hover{
      background-color: unset;
      color: #0085FF;
      border-color: #0085FF;
    }
  }

  .opt{
    height: 22px;
    padding-bottom: 4px;
    .icon-error{
      height: 22px;
      width: 22px;
      border-radius: 4px;
      font: 16px/22px '';
      text-align: center;
      color: rgb(243,247,250);
      // background-color: #f5f5f5;
    }
  }

  .img-box{
    width: 100%;
    height: 200px;
    overflow: hidden;
    text-align: center;
    margin-bottom: 16px;
    line-height: 200px;
    img{
      width: 80%;
      vertical-align: middle;
    }
  }
  .desc{
    padding-left: 8px;
    font: 14px/22px '';
    span{
      color:#666;
    }
  }
}
</style>
