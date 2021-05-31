<template>
  <div id="MusicDetails">
    <div class="option-box clear">
      <el-input-number class="number fl" v-model="scrollTime" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
      <el-button @click="beginAutoPlay" type="primary" class="fl">开始</el-button>
      <el-button @click="endAutoPlay" class="fl">停止</el-button>
    </div>
    <el-carousel ref="carousel" v-if="musicImages.length > 0" height="850px" :autoplay="false" :loop="true">
      <el-carousel-item v-for="item in musicImages" :key="item">
        <div class="img-box">
          <img :src="`http://renjihong.zone/music${item.path}/${item.images}`" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
    <p v-if="musicImages.length == 0" class="warning" style="text-align:center;font: 20px/42px ''">这里空空如也</p>
  </div>
</template>

<script>
export default {
  name:'MusicDetails',
  data(){
    return {
      musicImages:[],
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