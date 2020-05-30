<template>
  <div id="emoji">
    <VEmojiPicker @select="selectEmoji" />
  </div>
</template>
 
<script>
import VEmojiPicker from "v-emoji-picker";

export default {
  name: "emoji",
  components: {
    VEmojiPicker
  },
  data: () => ({}),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji);
      this.$store.commit('emoji', emoji)
    }
  }
};
</script>

<style lang="scss" scoped>
#emoji {
  .category {
    &.active {
      border-bottom: 3px solid #ffccbc;
    }
  }
}
</style>

