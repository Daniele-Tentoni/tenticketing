<template>
  <div class="modal" :class="{ 'is-active': props.visible }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form class="field">
        <div class="field">
          <label class="label" for="commessa">Commessa</label>
          <div class="control">
            <input
              type="text"
              class="input"
              name="commessa"
              v-model="commessa"
            />
          </div>
          <p class="help">Commessa su cui hai lavorato</p>
        </div>
        <div class="field">
          <label class="label" for="ore">Ore</label>
          <div class="control">
            <input type="number" class="input" name="ore" v-model="ore" />
          </div>
          <p class="help">Quante ore ci hai lavorato</p>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary" type="button" @click="tick">
              Tick
            </button>
          </div>
          <div class="control">
            <button class="button" type="reset">Reset</button>
          </div>
        </div>
      </form>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="props.visible = false"
    ></button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  user: string;
  visible: boolean;
}

const props = withDefaults(defineProps<Props>(), { visible: false });

const isLoading = useLoading();
const tickets = useTickets();

const commessa = ref("");
const ore = ref(0);

async function tick() {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const myNewObject: Parse.Object = new Parse.Object("Ticket");
    myNewObject.set("commessa", commessa.value);
    myNewObject.set("data", new Date());
    myNewObject.set("ore", ore.value);
    myNewObject.set("utente", props.user);
    try {
      const result: Parse.Object = await myNewObject.save();
      tickets.value.push({
        id: result.get("objectId"),
        commessa: result.get("commessa"),
        // data: object.get("data"),
        data: result.get("data"),
        ore: result.get("ore"),
      });
      props.visible = false;
    } catch (error: any) {
      console.error("Error while creating Ticket: ", error);
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
