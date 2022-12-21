<template>
  <BaseModal v-model:visible="isVisible">
    <template #title>
      Add Note
    </template>
    <div class="field">
      <label
        class="label"
        for="subject"
      >
        Subject
      </label>
      <div class="control">
        <input
          v-model="subject"
          type="text"
          class="input"
          name="subject"
        >
      </div>
    </div>
    <div class="field">
      <label
        class="label"
        for="value"
      >
        Value
      </label>
      <div class="control">
        <input
          v-model="value"
          type="text"
          class="input"
          name="value"
        >
      </div>
    </div>
    <template #foot>
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button is-primary"
            type="button"
            @click="note"
          >
            Note
          </button>
        </div>
        <div class="control">
          <button
            class="button"
            type="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '../modal/BaseModal.vue';
import Note from '../../models/note';
import Parse from 'parse';
import { Ref, } from 'vue';
import Ticket from '../../models/ticket';

interface Props {
  id: string;
  user: Parse.Object | null;
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

const isLoading = useLoading();
const tickets: Ref<Ticket[]> = useTickets();

const subject = ref('');
const value = ref('');

async function note () {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const query: Parse.Query = new Parse.Query('Ticket');
    console.log('Search for ', props.id);
    const object: Parse.Object = await query.get(props.id);
    const oldNotes: Note[] = object.get('notes') || [];
    oldNotes.push({
      subject: subject.value,
      value: value.value,
    });
    object.set('notes', oldNotes);
    try {
      const result: Parse.Object = await object.save();
      console.log('Result %o', result);
      tickets.value
        .find((f: Ticket) => f.id === props.id)
        ?.notes.push({
          subject: subject.value,
          value: value.value,
        });
    } catch (error: any) {
      console.error('Error while creating Note: ', error);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
