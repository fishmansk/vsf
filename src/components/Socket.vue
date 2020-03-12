<template>
  <div :class="`${classes}`">
    <div class="socket" ref="socket"></div>
    <div>{{this.text}}</div>
  </div>
  
</template>

<script>
export default {
  name: "Socket",
  props: ["type", "text"],
  computed: {
    classes(){
      let class_list = [];
      if (this.type == "input"){
        class_list.push("socket-input");
      }
      else{
        class_list.push("socket-output");
      }
      return class_list.join(" ")
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
  border: 1px solid #ddddddff;
  background-color: rgb(219, 219, 219);
  margin-left: 2px;
  margin-right: 2px;
}

.socket:hover{
  border: 1px solid #ddddddff;
  background-color: rgb(209, 255, 255);


}

.socket-input {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.socket-output {
  display: flex;
  flex-direction: row-reverse;
  justify-content: end;
}

</style>
