<template>
  <tr class="has-background-dark has-text-light">
    <slot>
      {{ props.label }}
    </slot>
  </tr>
</template>

<script lang="ts" setup>
interface Props {
  label?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    label: '',
  },
);
</script>
