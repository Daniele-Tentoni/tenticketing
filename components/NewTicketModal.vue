<template>
  <div
    class="modal"
    :class="{ 'is-active': isVisible }"
  >
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Ticket
        </p>
        <button
          class="delete"
          aria-label="close"
          @click="isVisible = false"
        />
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label
            class="label has-text-light"
            for="commessa"
          >
            Commessa
          </label>
          <div class="control">
            <input
              v-model="commessa"
              type="text"
              class="input"
              name="commessa"
            >
          </div>
          <p class="help">
            Commessa su cui hai lavorato
          </p>
        </div>
        <div class="field">
          <label
            class="label has-text-light"
            for="ore"
          >
            Ore
          </label>
          <div class="control">
            <input
              v-model="ore"
              type="number"
              class="input"
              name="ore"
            >
          </div>
          <p class="help">
            Quante ore ci hai lavorato
          </p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-primary"
              type="button"
              @click="tick"
            >
              Tick
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
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import Parse from 'parse';
interface Props {
  user: string;
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
const tickets = useTickets();

const commessa = ref('');
const ore = ref(0);

async function tick () {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const config = useRuntimeConfig();
    const appId = config.public.apiKey;
    const jsKey = config.public.jsKey;
    const serverUrl = 'https://parseapi.back4app.com/';
    Parse.serverURL = serverUrl;
    Parse.initialize(appId, jsKey);
    const myNewObject: Parse.Object = new Parse.Object('Ticket');
    myNewObject.set('commessa', commessa.value);
    myNewObject.set('data', new Date());
    myNewObject.set('ore', ore.value);
    myNewObject.set('utente', props.user);
    try {
      const result: Parse.Object = await myNewObject.save();
      tickets.value.push({
        id: result.get('objectId'),
        commessa: result.get('commessa'),
        data: result.get('data'),
        ore: result.get('ore'),
      });
      isVisible.value = false;
    } catch (error: any) {
      console.error('Error while creating Ticket: ', error);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
