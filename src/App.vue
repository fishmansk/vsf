<template>
  <div>
    <div v-if="auth">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">VSF</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Сценарии</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="signout()">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div style="display: flex; flex-direction: row;">
        <div
          style="width: 20vw; max-width: 300px; min-width: 200px; border-right: 1px solid #99999955; display: flex; flex-direction: column;"
        >
          <div
            v-for="block in blocks"
            :key="block.title"
            class=" btn btn-secondary m-1"
            style="cursor: move"
            draggable="true"
            @dragstart="$store.commit('drag_block', block)"
            @dragend="$store.commit('drop_block')"
          >{{block.title}}</div>
        </div>
        <div style="width: 80vw">
          <Editor></Editor>
        </div>
      </div>
    </div>
    <div v-else>
      <SignIn @signin="auth=true;"></SignIn>
    </div>
  </div>
</template>

<script>
import Editor from "./components/vsf/Editor.vue";
import Block from "./components/vsf/Block.vue";
import SignIn from "./components/auth/SignIn.vue";
import store from "./store";
let lodash = require("lodash");
import blocks from "./components/vsf/blocks.js";
export default {
  name: "App",
  store,
  components: {
    Editor,
    SignIn,
    Block
  },
  data: function() {
    return {
      auth: false,
      blocks
    };
  },
  mounted() {
    let token = localStorage.getItem("auth.token");
    this.auth = token != null;
  },
  methods: {
    signout() {
      localStorage.removeItem("auth.token");
      this.auth = false;
    },
    add_block(block) {
      // console.log(block);
      this.$store.commit("blocks_add", lodash.cloneDeep(block));
    }
  }
};
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
html {
  height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
}
body {
  height: 100%;
  margin: 0px;
  overflow: hidden;
}

.block-drag {
  user-select: none;
  cursor: move;
}
</style>
