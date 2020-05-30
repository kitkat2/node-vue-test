<template>
  <div class="tooltip" ref="popover" role="tooltip">
    <div class="tooltip-inner bg-dark text-white">
      <el-button type="text">批注</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "select-bar",
  props: {
    position: {
      type: Object
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      pos: {
        top: 0,
        left: 0
      },
      // show: true,
      showFlag: false // 用于判断延迟关闭
    };
  },
  watch: {
    // show: function (val) {
    //   if (val) {
    //     const popover = this.$refs.popover
    //     const triger = this.$refs.trigger.children[0]
    //     console.log(triger)
    //     switch (this.placement) {
    //       case 'top':
    //         this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
    //         this.position.top = triger.offsetTop - popover.offsetHeight - 5
    //         break
    //       case 'left':
    //         console.log('width:', popover.offsetWidth)
    //         this.position.left = triger.offsetLeft - popover.offsetWidth - 5
    //         this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2
    //         break
    //       case 'right':
    //         this.position.left = triger.offsetLeft + triger.offsetWidth + 5
    //         this.position.top = triger.offsetTop + triger.offsetHeight / 2 - popover.offsetHeight / 2
    //         break
    //       case 'bottom':
    //         this.position.left = triger.offsetLeft - popover.offsetWidth / 2 + triger.offsetWidth / 2
    //         this.position.top = triger.offsetTop + triger.offsetHeight + 5
    //         break
    //     }
    //     popover.style.top = this.position.top + 'px'
    //     popover.style.left = this.position.left + 'px'
    //   }
    // }
  },
  methods: {
    toggle() {
      // this.show = !this.show
    },
    show() {
      console.log(this.position);
      const popover = this.$refs.popover;
      popover.style.top = this.position.y + 'px';
      popover.style.left = this.position.x / 2 + 'px';  
    }
  },
  mounted() {
    this.show();
  },
  // 在组件销毁前移除监听，释放内存
  beforeDestroy() {}
};
</script>
<style lang="scss">
.tooltip {
  max-width: 500px;
  min-width: 100px;
  position: absolute;
  z-index: 200;
  // &.visible {
  //   visibility: visible;
  // }
}
</style>