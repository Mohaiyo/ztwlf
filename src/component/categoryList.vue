<template>
<div class="page-index" id="categoryList" data-log="商品分类详情列表">
  <div class="category-list">
      <div class="category-list-wrap">
          <mt-header title="分类列表">
            <p @click = "goBack()" slot="left">
              <mt-button icon="back">返回</mt-button>
            </p>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
          </mt-header>
      </div>
  </div>
  <div class="section">
    <ul class="itmes-list flex3"
      v-if="classList.length >0">
        <li class="itmes" v-for="(item,index) in classList" :key = "index">
          <router-link :to="{name: 'detail', params: { proId: item.proId }}">
            <img :src="item.filePath" alt="" v-if = "item.filePath">
             <img src="../assets/noimage.png" alt="暂无图片" v-if = " !item.filePath ">
            <div class="proInfo">
              <p class="proName">{{item.proName}}</p>
              <p class="proBrief">{{item.descr ? item.descr : '暂无描述' | postFilter}}</p>
              <p class="proPrice">{{item.proPrice}}</p>
            </div>
          </router-link>
        </li>
    </ul>
  </div>
  <div class="section" v-show = "classList.length > 0">
    <div class="divider_line" style="width:100%;height:0.08rem; border-bottom: 0.08rem solid #0383ca"></div>
  </div>
</div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
  name:'categoryList',
  data () {
    return {
      classList:[]
    }
  },
  created(){
    this.queryClassList();
  },
  methods:{
    queryClassList(pageNo,pageSize){
      let params = {
        pclassId:this.$route.params.pclassId,
        proStatus:'0'
      }
      this._ajaxSubmit('prodetails.do','queryProdetails',params,(data)=>{
          if ( data.proList.length == 0) {
              MessageBox('提示', '暂无分类信息！')
          }
          this.classList = data.proList
      })
    },
    goBack(){
      this.$router.go("-1")
    }
  }
}
</script>