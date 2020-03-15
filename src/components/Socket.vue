<template>
  <div :class="`${classes}`">
    <div v-if="(type=='stream')||(stream=='output')" class="socket" ref="socket"></div>
    <div style="display: flex; flex-direction: column;">
      <div>{{this.text}}</div>
      <input v-if="type=='string'" />
    </div>
    <PopupMenu :component="this" :menu="menu"></PopupMenu>
  </div>
</template>

<script>
import PopupMenu from "./PopupMenu.vue";
export default {
  name: "Socket",
  props: {
    stream: {
      type: String
    },
    text: {
      type: String
    },
    type: {
      type: String,
      default: "stream"
      //types: stream, string
    },
    flow: {
      type: String,
      default: "data"
    }
  },
  components: {
    PopupMenu
  },
  data: function() {
    return {
      menu: [
        {
          text: "Изменить тип",
          handler: function(e) {}.bind(this),
          submenu: [
            {
              text: "Stream",
              handler: function(e) {
                this.$store.commit("blocks_socket_change_type", {
                  block_id: this.$parent.id,
                  socket: this,
                  type: "stream"
                });
              }.bind(this)
            },
            {
              text: "String",
              handler: function(e) {
                this.$store.commit("blocks_socket_change_type", {
                  block_id: this.$parent.id,
                  socket: this,
                  type: "string"
                });
              }.bind(this)
            }
          ]
        },
        {
          text: "Удалить связи",
          handler: function(e) {
            this.$store.commit('connections_socket_deleted', this);

          }.bind(this),
        }
      ]
    };
  },
  computed: {
    classes() {
      let class_list = [];
      if (this.stream == "input") {
        class_list.push("socket-input");
      } else {
        class_list.push("socket-output");
      }
      if (this.flow == "control") {
        class_list.push("socket-flow-control");
      }
      return class_list.join(" ");
    }
  },

  mounted() {
    //binds
    this.onmousedown = this.onmousedown.bind(this);
    this.onmouseup = this.onmouseup.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    //other
    this.$el.onmousedown = this.onmousedown;
    this.$el.onmouseup = this.onmouseup;
    //   this.$el.onmouseup = this.onmouseup.bind(this);
  },
  beforeDestroy() {
    this.$store.commit("connections_socket_deleted", this);
  },
  methods: {
    onmousedown(e) {
      if (e.which == 1) {
        this.$store.commit("socket_connection_start", this);
        e.stopPropagation();
      }
    },
    onmousemove(e) {
      console.log("connecting");
    },
    onmouseup(e) {
      if (e.which == 1) {
        this.$store.commit("socket_connection_end", this);
        e.stopPropagation();
      }
    }
  }
};
</script>

<style scoped>
.socket {
  width: 15px;
  height: 15px;
  border: 1px solid #777777ff;
  background-color: rgb(219, 219, 219);
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 50%;
}

.socket:hover {
  background-color: rgb(248, 248, 248);
}

.socket-input {
  margin-top: 2px;
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.socket-output {
  margin-top: 2px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
  align-items: center;
}

.socket-flow-control {
  /* background-color: #ddffddff; */
}
.socket-flow-control > div:nth-child(1) {
  border-color: #00ff00ff;
}
</style>
