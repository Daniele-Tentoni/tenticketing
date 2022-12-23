<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label has-text-light">
        <slot name="label">
          <span class="has-light-text">
            {{ props.text }}
          </span>
        </slot>
      </label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            v-model="value"
            class="input"
            :type="props.type"
            :placeholder="props.placeholder"
          >
          <span class="icon is-small is-left">
            <slot name="left-icon">
              <i class="fas fa-user" />
            </slot>
          </span>
        </p>
        <slot name="validation" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
  text?: string;
  type?: string;
}

const props = withDefaults(
  defineProps<Props>(),
  {
    placeholder: '',
    text: '',
    type: 'text',
  },
);
const emit = defineEmits(['update:modelValue',]);
const value = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit('update:modelValue', value);
  },
});
</script>
