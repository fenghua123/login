<template>
  <div class="wrapper">
      b组件
      {{show}}
      
  </div>
</template>

<script>
import eventBus from '../eventBus'
export default {
  components:{},
  props:{},
  data(){
    return {
      show:""
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    // eventBus.$on("number",(message)=>{
    //   this.show=message
    // })
    this.$root.on("number",(message)=>{
      this.show=message
    })
  },
  mounted(){}
}
</script>
<style  scoped>
.wrapper{
  width: 200px;
  height: 200px;
}
</style>