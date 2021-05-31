<template>
  <div id="MusicDetails">
    <div class="option-box clear">
      <el-button class="fl" @click="addPageJudge = true" type="primary">添加曲谱页</el-button>
      <el-input-number class="number fl" v-model="scrollTime" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
      <el-button @click="beginAutoPlay" type="success" class="fl">开始</el-button>
      <el-button @click="endAutoPlay" class="fl">停止</el-button>
    </div>
    <el-dialog title="添加曲谱页" v-model="addPageJudge">
      <el-form :model="newMusicPage">
        <el-form-item label="选择曲谱页" label-width="120px">
          <el-upload
            class="upload-demo"
            action="http://renjihong.zone/LGuitar/music/uploadGuitar"
            :on-success="response => {onUpload(response)}"
            :file-list="fileList"
            :on-exceed="() => {$message({message:'单次添加数量限制为1', type:'warning'})}"
            limit="1"
            accept="image/*"
            list-type="picture">
            <el-button size="small" type="primary">选择图片</el-button>
            <!-- <template #tip>
              <div class="el-upload__tip">
                只能上传 jpg/png 文件，且不超过 500kb
              </div>
            </template> -->
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addPageJudge = false">取 消</el-button>
          <el-button type="primary" @click="newPageSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-carousel ref="carousel" v-if="musicImages.length > 0" height="850px" :autoplay="false" :loop="true">
      <el-carousel-item v-for="item in musicImages" :key="item">
        <div class="img-box">
          <img :src="`http://renjihong.zone/music${item.path}/${item.images}`" alt="">
          <i @click="delPage(item.id)" class="iconfont icon-error"></i>
        </div>
      </el-carousel-item>
    </el-carousel>
    <p v-if="musicImages.length == 0" class="warning" style="text-align:center;font: 20px/42px ''">这里空空如也，快去添加曲谱吧</p>
  </div>
</template>

<script>
export default {
  name:'MusicDetails',
  data(){
    return {
      musicImages:[],
      newPageForm:{
        guitarchordId:this.$route.params.musicId,
        images:'',
        path:''
      },
      addPageJudge:false,
      scrollTime:10,
      timer:0
    }
  },
  beforeMount(){
    this.getMusicImages(this.$route.params.musicId);
  },
  methods:{
    getMusicImages(musicId){
      this.axios.post('/music/getMusicList', this.$store.state.stringify({guitarchordId:musicId})).then(res => {
        console.log(res.data);
        this.musicImages = res.data;
      })
    },
    onUpload(response){
      this.newPageForm.images = response.image;
      this.newPageForm.path = response.path;
    },
    newPageSubmit(){
      this.axios.post('/music/addMusic', this.$store.state.stringify(this.newPageForm)).then(res => {
        if (res.data.data == '添加成功!') {
          this.$message({
            message:'添加成功！',
            type:'success'
          })
          this.getMusicImages(this.$route.params.musicId);
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          })
        }
      })
    },
    delPage(pageId){
      this.axios.post('/music/deleteMusic', this.$store.state.stringify({id:pageId})).then(res => {
        if (res.data.data == '添加成功!') {
          this.$message({
            message:'添加成功！',
            type:'success'
          })
          this.getMusicImages(this.$route.params.musicId);
        }else{
          this.$message({
            message:res.data.data,
            type:'error'
          })
        }
      })
    },
    beginAutoPlay(){
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.$refs.carousel.next();
      }, this.scrollTime * 1000);
    },
    endAutoPlay(){
      clearInterval(this.timer);
    }
  }
}
</script>

<style lang="less" scoped>
#MusicDetails{
  width: 1232px;
  margin: 0 auto;
  .option-box{
    display: flex;
    justify-content: center;
    margin: 20px 0 40px;
    .number{
      margin: 0 32px;
    }
  }
  .img-box{
    width: 100%;
    height: 850px;
    text-align: center;
    position: relative;
    img{
      height: 850px;
    }
    .icon-error{
      position: absolute;
      overflow: hidden;
      width: 0;
      height: 0;
      font: 22px/30px '';
      border-radius: 4px;
      background-color: rgba(0,0,0,0.05);
      cursor: pointer;
      right: 100px;
      top: 30px;
    }
    &:hover .icon-error{
      width: 30px;
      height: 30px;
    }
  }
}
</style>