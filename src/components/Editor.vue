<template>
  <div class="editor-block">
     <Group></Group>
     <!-- <Block></Block> -->
  </div>
</template>

<script>
import Group from './Group.vue'
import Block from './Block.vue'

export default {
  name: 'Editor',
  components: {
      Group,
      Block
  },
  props: {
    msg: String
  }
}
</script>

<style scoped>
    .editor-block{
        background-color: #000000ff;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        
    };
    
</style>
