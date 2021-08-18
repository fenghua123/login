<template>
  <div class="hello">
   <v-side></v-side>
   <Title></Title>
   <Content></Content>
   <login></login>
 
    
   
  </div>
</template>

<script>

import Leftside from "./a"
import Title from  "./b"
import Content from "./c"
export default {
  name: 'HelloWorld',
  components:{"v-side":Leftside,Title,Content},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello{
  display: flex;
}
.wrapper{
  width: 200px;
  height: 200px;
}

</style>
