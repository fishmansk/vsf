<template>
  <div class="group">
    <!-- <Block :sleft="50" :stop="50" :swidth="100" :sheight="40"></Block> -->
    <!-- <Block :sleft="300" :stop="100" :swidth="100" :sheight="40"></Block> -->
    <Block
      v-for="block in blocks"
      :key="block.id"
      :id="block.id"
      :sleft="block.left"
      :stop="block.top"
      :swidth="block.width"
      :sheight="block.height"
      :title="block.title"
      :inputs="block.inputs"
      :outputs="block.outputs"
    ></Block>
    <Connection
      v-for="connection of connections"
      :key="connection.id"
      :id="connection.id"
      :start="connection.start"
      :end="connection.end"
    ></Connection>
    <PopupMenu :component="this" :menu="menu"></PopupMenu>
  </div>
</template>

<script>
import DragableMixin from "./DragableMixin.vue";
import Block from "./Block.vue";
import Connection from "./Connection.vue";
import PopupMenu from "./PopupMenu.vue";
import blocks from "./blocks.js";
let lodash = require('lodash');

export default {
  name: "Group",
  mixins: [DragableMixin],
  components: {
    Block,
    Connection,
    PopupMenu
  },
  props: [],
  data: function() {
    return {
      menu: [
        {
          text: "Добавить блок ",
          handler: function(e) {}.bind(this),
          submenu: [
            {
              text: "Сумма",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.sum;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "Вывод",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.console_print;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            }
          ]
        }
      ]
    };
  },
  computed: {
    connections() {
      return this.$store.state.connections;
    },
    blocks() {
      return this.$store.state.blocks;
    }
  },
  mounted() {
    this.left = 0;
    this.top = 0;
    this.width = 2000;
    this.height = 1000;
    
  },
  methods: {}
};
</script>

<style scoped>
.group {
  background-color: #ffffffff;
  position: relative;
  display: flex;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, #99999922 1px, transparent 1px),
    linear-gradient(to bottom, #99999922 1px, transparent 1px);
}
</style>
