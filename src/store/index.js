import Vue from 'vue'
import Vuex from 'vuex'
let uuid4 = require('uuid4');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cache: {
      blocks_by_id: {},
    },
    socket_connecting: {
      socket_start: null,
      socket_end: null,
      current_mouse_position: {
        x: null,
        y: null,
      },
      connecting: false,
      window_onmousemove_handler: null,
    },
    connections: [

    ],
    blocks: [
      // {
      //   left: 50,
      //   top: 50,
      //   width: 100,
      //   height: 40,
      // },
      // {
      //   left: 300,
      //   top: 100,
      //   width: 100,
      //   height: 40,
      // },

    ],
  },
  mutations: {
    
    socket_connection_start(state, socket) {
      state.socket_connecting.socket_start = socket;
      state.socket_connecting.connecting = true;
      state.socket_connecting.window_onmousemove_handler = window.onmousemove;
      window.onmousemove = state.socket_connecting.socket_start.onmousemove;
    },
    socket_connection_end(state, socket) {
      if (state.socket_connecting.connecting) {
        window.onmousemove = state.socket_connecting.window_onmousemove_handler;

        state.socket_connecting.socket_end = socket;
        state.socket_connecting.connecting = false;
        if (socket.stream == "output") {
          let buf = state.socket_connecting.socket_start;
          state.socket_connecting.socket_start = state.socket_connecting.socket_end;
          state.socket_connecting.socket_end = buf;
        }
        if (
          (state.socket_connecting.socket_start.stream != state.socket_connecting.socket_end.stream) &&
          (state.socket_connecting.socket_start.flow == state.socket_connecting.socket_end.flow) &&
          (state.socket_connecting.socket_start.$parent != state.socket_connecting.socket_end.$parent)
        ) {
          state.connections.push({
            id: uuid4(),
            start: state.socket_connecting.socket_start,
            end: state.socket_connecting.socket_end,
            flow: state.socket_connecting.socket_start.flow,
          });
          console.log('connections, ', state.connections);
        }
      }


    },
    assign_connection_component(state, { id, component }) {
      for (let idx = 0; idx < state.connections.length; idx++) {
        if (state.connections[idx].id == id) {
          state.connections[idx].component = component;
        }
      }
    },
    connection_update(state) {
      for (let connection of state.connections) {
        connection.component.$forceUpdate();
      }
    },
    connection_set(state, {id, connection}){
      for (let i = 0; i < state.connections.length; i++){
        if (state.connections[i].id == id){
          state.connections[i] = connection;
          break;
        }
      }
      console.log(state.connections)
    },
    block_update_coord(state, { block, left, top }) {
      let b = state.cache.blocks_by_id[block.id];
      b.left = left;
      b.top = top;
    },
    blocks_add(state, block) {
      block.id = uuid4();
      for (let i = 0; i < block.inputs.length; i++) {
        block.inputs[i].id = uuid4();
        if (block.inputs[i].type != "stream")
          block.inputs[i].value = "";
      }
      for (let i = 0; i < block.outputs.length; i++) {
        block.outputs[i].id = uuid4();
        if (block.outputs[i].type != "stream")
          block.outputs[i].value = "";
      }
      state.blocks.push(block);
      this.commit('cache_update_blocks_by_id');
    },

    blocks_delete(state, id) {
      
      for (let idx = 0; idx < state.blocks.length; idx++) {
        if (state.blocks[idx].id == id) {
          state.blocks.splice(idx, 1);
          break;
        }
      }
      this.commit('cache_update_blocks_by_id');
    },
    blocks_socket_value_change(state, { block_id, socket, value }) {
      for (let block of state.blocks) {
        if (block.id == block_id) {
          if (socket.stream == "input") {
            for (let i = 0; i < block.inputs.length; i++) {
              if (block.inputs[i].text == socket.text) {
                block.inputs[i].value = value;
              }
            }
          }
          else {
            for (let i = 0; i < block.outputs.length; i++) {
              if (block.outputs[i].text == socket.text) {
                block.outputs[i].value = value;
              }
            }
          }

        }
      }
      socket.$parent.$forceUpdate();
    },
    connections_socket_deleted(state, socket) {
      for (let idx = 0; idx < state.connections.length; idx++) {
        if ((state.connections[idx].start == socket) || (state.connections[idx].end == socket)) {
          state.connections.splice(idx, 1);
          idx--;
        }
      }

    },
    blocks_socket_change_type(state, { block_id, socket, type }) {
      for (let block of state.blocks) {
        if (block.id == block_id) {
          if (socket.stream == "input") {
            for (let i = 0; i < block.inputs.length; i++) {
              if (block.inputs[i].text == socket.text) {
                block.inputs[i].type = type;
              }
            }
          }
          else {
            for (let i = 0; i < block.outputs.length; i++) {
              if (block.outputs[i].text == socket.text) {
                block.outputs[i].type = type;
              }
            }
          }

        }
      }

      console.log('blocks, ', state.blocks);
      console.log('this, ', this);
      if (type != "stream") {

        socket.$nextTick(function () { this.commit('connection_update'); }.bind(this));

      }
      socket.$parent.$forceUpdate();
    },
    blocks_sockets_add(state, { block_id, stream, text }) {
      for (let block of state.blocks) {
        if (block.id == block_id) {
          let socket = {
            id: uuid4(),
            text,
            flow: "data",
          }
          if (stream == "input") {
            block.inputs.push(socket);
          }
          else {
            block.outputs.push(socket);
          }
        }
      }

    },
    blocks_socket_change_text(state, { block_id, socket, text }) {
      console.log(block_id, socket, text)
      for (let block of state.blocks) {
        if (block.id == block_id) {
          if (socket.stream == "input") {
            for (let i = 0; i < block.inputs.length; i++) {
              if (block.inputs[i].text == socket.text) {
                block.inputs[i].text = text;
                console.log('change text');

              }
            }
          }
          else {
            for (let i = 0; i < block.outputs.length; i++) {
              if (block.outputs[i].text == socket.text) {
                block.outputs[i].text = text;
                console.log('change text');

              }
            }
          }

        }
      }
      socket.$parent.$forceUpdate();

    },
    cache_update_blocks_by_id(state){
      for (let idx = 0; idx < state.blocks.length; idx++){
        state.cache.blocks_by_id[state.blocks[idx].id] = state.blocks[idx];
      }
    },
    import_blocks(state, script) {
      state.blocks = script.blocks;   
      this.commit('cache_update_blocks_by_id');

    },
    import_connections(state, script) {   
      console.log(script.connections);
      state.connections = script.connections;
    }
  },
  actions: {
  },
  modules: {
  }
})
