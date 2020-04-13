<template>
  <div id="card-aside" style="width: 100%; height: 14rem;">
    <!-- 文献 期刊 博硕士 会议 报纸 年鉴 -->
    <!-- <i class="fas fa-handshake"></i> -->
     <slot name="classify"></slot>
     
  </div>
</template>


<script>
export default {
  name: "card-aside",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>