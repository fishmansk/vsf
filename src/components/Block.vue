<template>
  <div class="block">
    <div class="block-title" style="padding: 5px;">
      {{title}}
    </div>
    <div style="display: flex; flex-direction: row;">
      <div class="block-inputs">
        <Socket
          v-for="socket in inputs" :key="socket.text"
          stream="input"
          :text="socket.text"    
          :type="socket.type"      
        ></Socket>
        
      </div>
      <div class="block-outputs">        
        <Socket
          v-for="socket in outputs" :key="socket.text"
          stream="output"
          :text="socket.text"          
          :type="socket.type"      
        ></Socket>
      </div>
    </div>

    <PopupMenu :component="this" :menu="menu"></PopupMenu>
  </div>
</template>

<script>
import DragableMixin from "./DragableMixin.vue";
import Socket from "./Socket.vue";
import PopupMenu from "./PopupMenu.vue";
export default {
  name: "Block",
  components: {
    Socket,
    PopupMenu
  },
  props: ["id", "stop", "sleft", "swidth", "sheight", "inputs", "outputs", "title"],

  data: function() {
    return {
      parent: {},
      menu: [       
        {
          text: "Удалить",
          handler: function(e) {
            this.$store.commit("blocks_delete", this.id);
          }.bind(this)
        }
      ]
    };
  },
  mixins: [DragableMixin],
  mounted() {
    this.left = this.sleft;
    this.top = this.stop;
    this.$el.style.left = `${this.left}px`;
    this.$el.style.top = `${this.top}px`;

    this.parent.onmousemove = this.onmousemove;
    this.onmousemove = this.onmousemove_overload.bind(this);
  },
  methods: {
    onmousemove_overload(e) {
      this.parent.onmousemove(e);
      this.$store.commit("connection_update");
    }
  }
};
</script>

<style scoped>
.block {
  position: absolute;
  background-color: #ffffffff;
  border: 1px dashed #999999ff;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  padding: 5px;
}
.block-inputs {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
}
.block-outputs {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;

}
.block-title{
  cursor: move;
}
</style>
