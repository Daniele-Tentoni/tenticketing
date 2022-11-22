<template>
  <div class="fab-container">
    <button
      class="button is-dark is-inverted is-outlined"
      @click="click"
    >
      {{ props.text }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface FabProps {
  text?: string;
  click?: (e: MouseEvent) => void;
}

const props = withDefaults(defineProps<FabProps>(), {
  text: '+',
  click: (e: MouseEvent) => console.log('clicked', e.metaKey),
});
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
