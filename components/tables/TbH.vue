<template>
  <th class="has-text-light">
    <slot>{{ props.label }}</slot>
  </th>
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
