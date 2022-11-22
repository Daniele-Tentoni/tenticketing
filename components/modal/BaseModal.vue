<template>
  <div
    class="modal"
    :class="{ 'is-active': props.visible }"
  >
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="head">
          <p class="modal-card-title">
            <slot name="title" />
          </p>
        </slot>
        <button
          class="delete"
          aria-label="close"
          @click="isVisible = false"
        />
      </header>
      <section class="modal-card-body">
        <slot />
      </section>
      <footer class="modal-card-foot">
        <slot name="foot" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  visible?: boolean;
}

const props = withDefaults(defineProps<Props>(), { visible: false, });
const emit = defineEmits(['update:visible',]);

const isVisible = computed({
  get () {
    return props.visible;
  },
  set (value) {
    emit('update:visible', value);
  },
});
</script>
