<template>
  <div class="popup-backgound">
    <div class="popup-menu" ref="menu" @mouseleave="closesubmenu()">
      <div style="display: flex; flex-direction: row;">
        <div>
          <div
            v-for="item in menu"
            :key="item.text"
            class="popup-menu-item"
            @click="item.handler(event)"
            @mouseenter="opensubmenu(item)"
          >
          {{item.text}}
          <span v-if="item.submenu!=undefined">&#9656;</span>
          </div>
        </div>
        <div>
          <div
            v-for="item in submenu"
            :key="item.text"
            class="popup-menu-item"
            @click="item.handler(event)"
          >{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopupMenu",
  props: ["visible", "left", "top", "component", "menu"],
  components: {},
  data: function() {
    return {
      display: "none",
      handlers: {
        window_onmousedown: null,
        window_oncontextmenu: null
      },
      event: null,
      submenu: []
    };
  },
  mounted() {
    if (this.visible) {
      let menu = this.$refs.menu;
      menu.style.top = `${this.top}px`;
      menu.style.left = `${this.left}px`;
      menu.style.display = "flex";
      this.$el.style.display = "block";
      this.handlers.window_onmousedown = window.onmousedown;
      this.handlers.window_oncontextmenu = window.oncontextmenu;
      this.$el.onclick = this.close_menu.bind(this);
      this.$el.onmousedown = function(e) {
        e.stopPropagation();
        return false;
      };
      this.$el.oncontextmenu = this.close_menu.bind(this);
    }
    this.component.$el.oncontextmenu = this.oncontextmenu.bind(this);
  },
  methods: {
    oncontextmenu(e) {
      this.event = e;
      let menu = this.$refs.menu;
      menu.style.top = `${e.y}px`;
      menu.style.left = `${e.x}px`;
      menu.style.display = "flex";
      this.$el.style.display = "block";
      this.autoCorrectPosition(e.x, e.y);
      this.handlers.window_onmousedown = window.onmousedown;
      this.handlers.window_oncontextmenu = window.oncontextmenu;
      this.$el.onclick = this.close_menu.bind(this);
      this.$el.onmousedown = function(e) {
        e.stopPropagation();
        return false;
      };
      this.$el.oncontextmenu = this.close_menu.bind(this);
      e.stopPropagation();
      return false;
    },
    close_menu(e) {
      let menu = this.$refs.menu;
      if (menu === undefined) return;
      menu.style.display = "none";
      this.$el.style.display = "none";
      e.stopPropagation();
      this.submenu = [];
      return false;
    },
    opensubmenu(item) {
      if (item.submenu != undefined) {
        this.submenu = item.submenu;
      }
      else{
        this.submenu = [];
      }
    },
    closesubmenu() {
      if (this.submenu != undefined) {
        this.submenu = [];
      }
    },
    autoCorrectPosition(wantLeft, wantTop){
      let left = wantLeft;
      let top = wantTop;
      let menu = this.$refs.menu;
      let width = window.innerWidth;
      let height = window.innerHeight;
      let elWidth = menu.offsetWidth;
      let elHeight = menu.offsetHeight;
      if (wantLeft + elWidth > width){
        left = width - elWidth - 5;
      }
      if (wantTop + elHeight > height){
        top = height - elHeight - 5;
      }
      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
      console.log(wantLeft, wantTop, elWidth, elHeight, width, height);
    },
  }
};
</script>

<style scoped>
.popup-backgound {
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: none;
  z-index: 999;
}
.popup-menu {
  position: fixed;
  top: 0px;
  left: 0px;
  display: none;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  background-color: rgb(233, 233, 233);
  border: 1px solid rgb(192, 192, 192);
  padding-top: 10px;
  padding-bottom: 10px;
}
.popup-menu-item {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
}
.popup-menu-item:hover {
  background-color: rgb(185, 185, 185);
  cursor: pointer;
}
</style>
