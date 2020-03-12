<template>
  <Editor></Editor>
</template>

<script>
import Editor from './components/Editor.vue'
import store from './store'
export default {
  name: 'App',
  store,
  components: {
    Editor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
html{
  height: 100%;
  font-family: Arial,Helvetica Neue,Helvetica,sans-serif; 
}
body{
  height: 100%;
  margin: 0px;
  overflow: hidden;
}
</style>
