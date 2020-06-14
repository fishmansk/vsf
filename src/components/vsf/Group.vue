<template>
  <div class="group">
    <!-- <Block :sleft="50" :stop="50" :swidth="100" :sheight="40"></Block> -->
    <!-- <Block :sleft="300" :stop="100" :swidth="100" :sheight="40"></Block> -->
    <Block
      v-for="block in blocks"
      :key="block.id"
      :id="block.id"
      :type="block.type"
      :sleft="block.left"
      :stop="block.top"
      :swidth="block.width"
      :sheight="block.height"
      :title="block.title"
      :inputs="block.inputs"
      :outputs="block.outputs"
      ref="block"
      @stopdrag="update_coordinates(block, $event)"
    ></Block>
    <Connection
      v-for="connection of connections"
      :key="connection.id"
      :id="connection.id"
      :start="connection.start"
      :end="connection.end"
      :flow="connection.flow"
    ></Connection>
    <PopupMenu :component="this" :menu="menu"></PopupMenu>
  </div>
</template>

<script>
import DragableMixin from "./DragableMixin.vue";
import Block from "./Block.vue";
import Connection from "./Connection.vue";
import PopupMenu from "../utils/PopupMenu.vue";
import blocks from "./blocks.js";
let lodash = require("lodash");
let uuid4 = require("uuid4");

function downloadString(text, fileType, fileName) {
  var blob = new Blob([text], { type: fileType });

  var a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = [fileType, a.download, a.href].join(":");
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 1500);
}

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
              text: "std: Sum",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.sum;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "std: print",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.console_print;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "std:event: Start",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.event_start;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "std:data: String",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.data_string;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "std:data: Number",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.data_number;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "std:data: Json",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.std_data_json;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "flask:actions: Create",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.flask_actions_create;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "flask:actions: Add text rule",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.flask_actions_add_text_rule;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "flask:actions: Add json rule",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.flask_actions_add_json_rule;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            },
            {
              text: "flask:actions: Run",
              handler: function(e) {
                console.log("Добавление", e);
                let block = blocks.flask_actions_app_run;
                block.left = e.layerX;
                block.top = e.layerY;
                this.$store.commit("blocks_add", lodash.cloneDeep(block));
              }.bind(this)
            }
          ]
        },
        {
          text: "Export",
          handler: function(e) {
            console.log("Export: ");
            let data = this.export();
            // navigator.clipboard.writeText(JSON.stringify(data));
            downloadString(JSON.stringify(data), "text/vsf", "program.vsf");
            // console.log(JSON.stringify(data));
          }.bind(this)
        },
        {
          text: "Export (Copy)",
          handler: function(e) {
            console.log("Export: ");
            let data = this.export();
            navigator.clipboard.writeText(JSON.stringify(data));
          }.bind(this)
        },
        {
          text: "Import",
          handler: function(e) {
            navigator.clipboard.readText().then(
              function(text) {
                try {
                  const script = JSON.parse(text);
                  this.import(script);
                } catch (err) {
                  console.log("Ошибка импорта", err);
                }
              }.bind(this)
            );
          }.bind(this)
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
    this.left = -10000;
    this.top = -10000;
    this.width = 20000;
    this.height = 20000;
  },
  methods: {
    update_coordinates(block, event) {
      this.$store.commit("block_update_coord", {
        block,
        left: event.left,
        top: event.top
      });
      this.$forceUpdate();
    },
    export() {
      let app = {
        blocks: [],
        connections: []
      };

      for (let block of this.$store.state.blocks) {
        let block_data = {
          id: block.id,
          left: block.left,
          top: block.top,
          title: block.title,
          slug: block.slug,
          type: block.type
        };
        let inputs = [];
        for (let socket of block.inputs) {
          let socket_data = {
            id: socket.id,
            text: socket.text,
            type: socket.type,
            default: socket.default,
            flow: socket.flow,
            value: socket.value
          };
          inputs.push(socket_data);
          // inputs.push(socket);
        }
        block_data.inputs = inputs;
        let outputs = [];
        for (let socket of block.outputs) {
          let socket_data = {
            id: socket.id,
            text: socket.text,
            type: socket.type,
            default: socket.default,
            flow: socket.flow,
            value: socket.value
          };
          outputs.push(socket_data);
          // outputs.push(socket);
        }
        block_data.outputs = outputs;
        app.blocks.push(block_data);
      }
      for (let connection of this.$store.state.connections) {
        app.connections.push({
          id: connection.id,
          start: connection.start.id,
          end: connection.end.id,
          flow: connection.flow
        });
      }
      return app;
    },
    import(script) {
      this.$store.commit("import_blocks", script);
      // this.$forceUpdate();
      this.$nextTick(
        function() {
          for (let i = 0; i < script.connections.length; i++) {
            for (let block of this.$refs.block) {
              if ("input_socket" in block.$refs) {
                for (let socket of block.$refs.input_socket) {
                  if (socket.id == script.connections[i].end){
                    script.connections[i].end = socket;
                  }
                }
              }
              if ("output_socket" in block.$refs) {
                for (let socket of block.$refs.output_socket) {
                  if (socket.id == script.connections[i].start){
                    script.connections[i].start = socket;
                  }
                }
              }
            }
          }
          this.$store.commit("import_connections", script);
        }.bind(this)
      );

      
    }
  }
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
