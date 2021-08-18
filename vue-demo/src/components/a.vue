<template>
  <div class="wrapper">
      a组件
      <button @click="change">点击传值</button>
      
  </div>
</template>

<script>
import '../eventBus'
import eventBus from '../eventBus'
export default {
  components:{},
  props:{},
  data(){
    return {
        message:"我是组件a，传给兄弟"
    }
  },
  watch:{},
  computed:{},
  methods:{
      change(){
          // eventBus.$emit("number",this.message)
          this.$root.emit("number",this.message)
      }

  },
  created(){

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