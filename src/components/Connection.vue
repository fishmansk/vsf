<template>
  <svg class="connection">
    <path :d="line_path()" fill="none" stroke="#000000ff" stroke-width="4" stroke-linecap="round" stroke-dasharray="5,5"/>
  </svg>
</template>

<script>
export default {
  name: "Connection",
  props: ["id", "start", "end"],
  computed: {},
  mounted() {
    this.$store.commit("assign_connection_component", {
      id: this.id,
      component: this
    });
    this.update_bound();
  },
  methods: {
    line_path() {
      let s = this.start.$refs.socket.getBoundingClientRect(); //start bounding rect
      let e = this.end.$refs.socket.getBoundingClientRect(); //end bounding rect
      let b = this.get_bound();
      let start = {};
      start.left = s.left - b.left + s.width / 2.0;
      start.top = s.top - b.top + s.height / 2.0;
      let end = {};
      end.left = e.left - b.left + e.width / 2.0;
      end.top = e.top - b.top + e.height / 2.0;
      let offset_left = e.left - s.left;
      let offset_top = e.top - s.top;
      if (this.$el !== undefined) {
        this.update_bound();
      }
      // return `M ${start.left} ${start.top} L ${end.left} ${end.top}`;
      let pc = {};
      pc.left = start.left + (end.left - start.left) / 2.0;
      pc.top = start.top + (end.top - start.top) / 2.0;
      if (start.left > end.left)
        return `M ${start.left} ${start.top} L ${end.left} ${end.top}`;
      else
        return `M ${start.left} ${start.top} Q ${start.left + b.width / 4.0} ${
          start.top
        } ${pc.left} ${pc.top} Q ${end.left - b.width / 4.0} ${end.top} ${
          end.left
        } ${end.top}`;
    },
    get_bound() {
      let start_socket = this.start.$refs.socket.getBoundingClientRect(); //start bounding rect
      let end_socket = this.end.$refs.socket.getBoundingClientRect(); //end bounding rect
      let svg_bounding = {};
      if (start_socket.top < end_socket.top) {
        svg_bounding.top = start_socket.top;
        svg_bounding.height = end_socket.top - start_socket.top;
      } else {
        svg_bounding.top = end_socket.top;
        svg_bounding.height = start_socket.top - end_socket.top;
      }
      if (start_socket.left < end_socket.left) {
        svg_bounding.left = start_socket.left;
        svg_bounding.width = end_socket.left - start_socket.left;
      } else {
        svg_bounding.left = end_socket.left;
        svg_bounding.width = start_socket.left - end_socket.left;
      }
      
      svg_bounding.top += start_socket.height / 2.0;
      svg_bounding.left += start_socket.width / 2.0;
      //offset by line width
      svg_bounding.top -= 2;
      svg_bounding.left -= 2;
      svg_bounding.width += 4;
      svg_bounding.height += 4;
      
      return svg_bounding;
    },
    update_bound() {
      let b = this.get_bound();
      //offset by parent
      let parent_bbox = this.$parent.$el.getBoundingClientRect();
      b.top -= parent_bbox.top;
      b.left -= parent_bbox.left;
      this.$el.style.top = `${b.top}px`;
      this.$el.style.left = `${b.left}px`;
      this.$el.style.width = `${b.width}px`;
      this.$el.style.height = `${b.height}px`;
    }
  }
};
</script>

<style scoped>
.connection {
  position: absolute;
  pointer-events: none;
  min-width: 2px;
  min-height: 2px;
}
</style>
