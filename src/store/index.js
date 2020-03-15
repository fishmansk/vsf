import Vue from 'vue'
import Vuex from 'vuex'
let uuid4 = require('uuid4');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
        state.socket_connecting.socket_end = socket;
        state.socket_connecting.connecting = false;
        if (socket.stream == "output") {
          let buf = state.socket_connecting.socket_start;
          state.socket_connecting.socket_start = state.socket_connecting.socket_end;
          state.socket_connecting.socket_end = buf;
        }
        window.onmousemove = state.socket_connecting.window_onmousemove_handler;
        if (state.socket_connecting.socket_start.stream != state.socket_connecting.socket_end.stream) {
          state.connections.push({
            id: uuid4(),
            start: state.socket_connecting.socket_start,
            end: state.socket_connecting.socket_end,
          });
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
    blocks_add(state, block) {
      block.id = uuid4();
      console.log(block);
      state.blocks.push(block);
      console.log(state.blocks);
    },
    blocks_delete(state, id) {
      for (let idx = 0; idx < state.blocks.length; idx++) {
        if (state.blocks[idx].id == id) {
          state.blocks.splice(idx, 1);
          break;
        }
      }
    },
    connections_socket_deleted(state, socket) {
      for (let idx = 0; idx < state.connections.length; idx++) {
        if ((state.connections[idx].start == socket) || (state.connections[idx].end == socket)) {
          state.connections.splice(idx, 1);
          idx--;
        }
      }

    },
    blocks_socket_change_type(state, {block_id, socket, type}) {
      console.log('blocks_socket_change_type');
      console.log(block_id, socket, type);
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
      socket.$parent.$forceUpdate();
      console.log('blocks, ', state.blocks);
    }
  },
  actions: {
  },
  modules: {
  }
})
