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
      state.socket_connecting.socket_end = socket;
      state.socket_connecting.connecting = false;
      if (socket.type == "output"){
        let buf = state.socket_connecting.socket_start;
        state.socket_connecting.socket_start = state.socket_connecting.socket_end;
        state.socket_connecting.socket_end = buf;        
      }
      window.onmousemove = state.socket_connecting.window_onmousemove_handler;
      if (state.socket_connecting.socket_start.type != state.socket_connecting.socket_end.type) {
        state.connections.push({
          id: uuid4(),
          start: state.socket_connecting.socket_start,
          end: state.socket_connecting.socket_end,
        });
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
  },
  actions: {
  },
  modules: {
  }
})
