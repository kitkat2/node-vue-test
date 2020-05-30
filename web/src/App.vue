<template>
  <div id="app">
    <my-header></my-header>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "./components/common/Header";

export default {
  name: "App",
  components: {
    myHeader
  },
  data() {
    return {
      transitionName: ""
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style>
</style>
