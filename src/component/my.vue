<template>
<div class="person-centered">
    <mt-header title="联系我们">
      <p @click="goBack()" slot="left">
        <mt-button icon="back">返回</mt-button>
      </p>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <div class="link">
      <span v-html="link"></span>
    </div>
</div>
</template>
<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
export default{
  data(){
    return{
      link:''
    }
  },
  created(){
    this.queryLink()
  },
  methods:{
    queryLink(){
      let params = {
        paraNo:'lxfs'
      }
      this._ajaxSubmit('param.do','queryParam',params,(data)=>{
          this.link = data.paraList[0].paraDescr.replace(/(\r\n)|(\n)/g,'<br>')
      })
    },
    goBack(){
      this.$router.go("-1")
    }
  }
}
</script>
<style type="text/css" scope>
    .link{
      padding: .5rem;
    }
</style>