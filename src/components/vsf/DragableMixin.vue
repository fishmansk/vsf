<template></template>

<script>
export default {
  name: "DragableMixin",
  components: {},
  props: {},
  data: function() {
    return {
      top: 0,
      left: 0,
      width: 100,
      height: 200,
      drag: {
        enable: false,
        oldX: 0,
        oldY: 0,
        window_handlers: {
          onmousedown: null,
          onmouseup: null,
          onmousemove: null,
          onmouseleave: null
        }
      }
    };
  },
  computed: {},
  watch: {
    top: function(newVal, oldVal) {
      this.$el.style.top = `${this.top}px`;
    },
    left: function(newVal, oldVal) {
      this.$el.style.left = `${this.left}px`;
    },
    height: function(newVal, oldVal) {
      this.$el.style.height = `${this.height}px`;
    },
    width: function(newVal, oldVal) {
      this.$el.style.width = `${this.width}px`;
    }
  },

  mounted() {
    this.left = 0;
    this.top = 0;
    this.$el.style.userSelect = "none";
    this.$el.onmousedown = this.onmousedown.bind(this);
    this.$el.onmouseup = this.onmouseup.bind(this);
    this.$el.onmousemove = this.onmousemove.bind(this);
  },
  methods: {
    onmousedown(e) {
      if (e.which == 1) {
        this.drag.enable = true;
        this.drag.oldX = e.clientX;
        this.drag.oldY = e.clientY;
        this.drag.window_handlers.onmousemove = window.onmousemove;
        this.drag.window_handlers.onmouseup = window.onmouseup;
        this.drag.window_handlers.onmouseleave = window.onmouseleave;
        window.onmousemove = this.onmousemove;
        window.onmouseup = this.onmouseup;
        window.onmouseleave = this.onmouseup;
        e.stopPropagation();
        this.$emit("startdrag");
      }
    },
    onmouseup(e) {
      if (this.drag.enable) {
        this.drag.enable = false;
        window.onmousemove = this.drag.window_handlers.onmousemove;
        window.onmouseup = this.drag.window_handlers.onmouseup;
        window.onmouseleave = this.drag.window_handlers.onmouseleave;
        e.stopPropagation();
        this.$emit("stopdrag", { left: this.left, top: this.top });
      }
    },
    onmousemove(e) {
      if (this.drag.enable) {
        let offsetX = e.clientX - this.drag.oldX;
        let offsetY = e.clientY - this.drag.oldY;
        this.top += offsetY;
        this.left += offsetX;
        this.drag.oldX = e.clientX;
        this.drag.oldY = e.clientY;
        this.$emit("drag", { left: this.left, top: this.top });
      }
      // e.stopPropagation();
    }
  }
};
</script>

<style scoped>
</style>
