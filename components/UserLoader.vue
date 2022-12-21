<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label
        class="label has-background-dark has-text-light"
        for="user"
      >
        User
      </label>
    </div>
    <div class="field-body">
      <div class="field has-addons">
        <div class="control">
          <input
            v-model="user"
            class="input"
            type="text"
            name="user"
          >
        </div>
        <div class="control">
          <button
            class="button"
          >
            <span class="icon">
              <i class="fas fa-arrows-rotate" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue',]);

const user = computed({
  get () {
    return props.modelValue;
  },
  set (value) {
    emit('update:modelValue', value);
  },
});

/*
@click="download"

import Parse from 'parse';

const isLoading = useLoading();
const tickets = useTickets();

defineExpose({ download, });

async function download () {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const old = tickets.value.splice(0, tickets.value.length);
    const myTicket: Parse.Object = Parse.Object.extend('Ticket');
    const query: Parse.Query = new Parse.Query(myTicket);
    query.equalTo('utente', user.value);
    try {
      const results: Parse.Object[] = await query.find();
      fillTickets(results);
    } catch (error) {
      tickets.value = old;
      console.error('Error while fetching Ticket', error);
    }
  } finally {
    isLoading.value = false;
  }
}

function fillTickets (results: Parse.Object[]) {
  for (const object of results) {
    tickets.value.push({
      id: object.id,
      commessa: object.get('commessa'),
      data: object.get('data'),
      ore: object.get('ore'),
      notes: object.get('notes') ?? [],
    });
  }
}
*/
</script>
