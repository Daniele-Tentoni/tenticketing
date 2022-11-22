<template>
  <th>
    <span class="has-backgroud-dark has-text-light">
      <slot>
        {{ props.label }}
      </slot>
    </span>
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
