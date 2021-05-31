<template>
  <div id="BigWorld">
    <header>大世界</header>
    <el-input @input="search" v-model="keyword" placeholder="请输入歌曲名"></el-input>
    <ul>
      <li @click.stop="$router.push('/lookmd/' + item.id)" v-for="item in musiclist" :key="item.id">
        <p class="song"><span>歌名：</span>{{item.songname}}</p>
        <p class="singer"><span>歌手：</span>{{item.singername}}</p>
        <p class="user"><span>用户昵称：</span>{{item.nickname}}<em @click.stop="addFav(item)" class="fr">收藏</em></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'BigWorld',
  data(){
    return{
      musiclist:[],
      keyword:''
    }
  },
  beforeMount(){
    this.axios.post('/music/getGuitarListByName').then(res => {
      console.log(res.data);
      this.musiclist = res.data
    })
  },
  methods:{
    search(){
      this.axios.post('/music/getGuitarListByName', this.$store.state.stringify({songname:this.keyword})).then(res => {
        this.musiclist = res.data;
      })
    },
    addFav(item){
      console.log({
        guitarchordId:item.id,
        images:item.image,
        path:item.path
      });
      this.axios.post('/leave/addColl', this.$store.state.stringify({
        guitarchordId:item.id,
        username:localStorage.getItem('username')
        // images:item.image,
        // path:item.path
      })).then(res => {
        if (res.data.data == '收藏成功!') {
          this.$message({
            message:'乐谱已成功收藏！',
            type:'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#BigWorld{
  width: 1232px;
  margin: 0 auto;
  header{
    font: 30px/80px '';
    text-align: center;
    letter-spacing: 15px;
  }
  .el-input{
    margin-bottom: 16px;
  }
  li{
    padding: 16px;
    // border-bottom: 1px solid rgb(212, 212, 212);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.05);
    font: 14px/22px '';
    cursor: pointer;
    margin-bottom: 8px;
    border-radius: 4px;
    
    &:hover{
      background-color: rgb(233, 230, 230);
    }

    span{
      color: #999;
    }

    em{
      color: #0085FF;
      position: relative;
      z-index: 1;
    }
  }
}
</style>