<template>
  <Body class="has-background-dark has-text-light" />
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" to="/">
          <strong>Tenticketing</strong>
        </NuxtLink>

        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': isNavBarVisible }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="isNavBarVisible = !isNavBarVisible"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <Transition name="fade">
        <!-- v-if="isActive" -->
        <div
          id="navbarBasicExample"
          class="navbar-menu has-background-dark has-text-light"
          :class="{
            'is-active': isNavBarVisible,
          }"
        >
          <div class="navbar-start">
            <div class="navbar-item">
              <span class="icon" v-if="isLoading">
                <i class="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label
                    class="label has-background-dark has-text-light"
                    for="utente"
                  >
                    Utente
                  </label>
                </div>
                <div class="field-body">
                  <div class="field has-addons">
                    <div class="control">
                      <input
                        class="input"
                        type="text"
                        name="utente"
                        v-model="utente"
                      />
                    </div>
                    <div class="control">
                      <button class="button" @click="download">
                        <span class="icon">
                          <i class="fas fa-arrows-rotate"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
  <section class="section">
    <div class="container">
      <div class="table-container" v-if="filteredTickets.length > 0">
        <table class="table is-bordered is-striped is-fullwidth">
          <thead>
            <tr>
              <th class="has-background-dark has-text-light">Data</th>
              <th class="has-background-dark has-text-light">Commessa</th>
              <th class="has-background-dark has-text-light">Ore</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="ticket in filteredTickets"
              :key="ticket.id"
              class="has-background-dark has-text-light"
            >
              <td>{{ ticket.data?.toLocaleDateString() }}</td>
              <td>{{ ticket.commessa }}</td>
              <td>{{ ticket.ore }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <div class="columns is-mobile">
          <div class="column">Empty Tickets</div>
          <div class="column"></div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{ 'is-active': ticketing }">
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
        @click="ticketing = false"
      ></button>
    </div>
  </section>
  <div>
    <FloatingActionButton :click="(_) => (ticketing = true)" />
  </div>
</template>

<script lang="ts" setup>
import FloatingActionButton from "./components/FloatingActionButton.vue";
import Parse from "parse";

const config = useRuntimeConfig();

const appId = config.public.apiKey; // "RAmQnWu6jjSuC292CCZSgB1CvbvGWqS4YUpn9u7W";
const jsKey = config.public.jsKey; // "cuc78sVw01xCo6AXaJ2Y0M28MBrsCeScqIxwPh8y";
const serverUrl = "https://parseapi.back4app.com/";

onMounted(async () => {
  Parse.serverURL = serverUrl;
  Parse.initialize(appId, jsKey);
  download();
});

const tickets = useState<Ticket[]>("tickets", () => <Ticket[]>[]);

interface Ticket {
  id: number;
  data?: Date;
  commessa: string;
  ore: number;
}

const commessa = ref("");
const ore = ref(0);
const utente = ref("");
const filteredTickets = computed(() =>
  tickets.value.sort(function (a, b) {
    if (a.data === undefined) return 1;
    else if (b.data === undefined) return -1;
    else if (a.data > b.data) return -1;
    else if (a.data < b.data) return 1;
    return a.commessa.localeCompare(b.commessa);
  })
);

const ticketing = ref(false);
const isNavBarVisible = ref(false);
const isLoading = ref(false);

async function tick() {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const myNewObject: Parse.Object = new Parse.Object("Ticket");
    myNewObject.set("commessa", commessa.value);
    myNewObject.set("data", new Date());
    myNewObject.set("ore", ore.value);
    myNewObject.set("utente", utente.value);
    try {
      const result: Parse.Object = await myNewObject.save();
      console.log("New ticket with id: ", result);
      tickets.value.push({
        id: result.get("objectId"),
        commessa: result.get("commessa"),
        // data: object.get("data"),
        data: result.get("data"),
        ore: result.get("ore"),
      });
      ticketing.value = false;
    } catch (error: any) {
      console.error("Error while creating Ticket: ", error);
    }
  } finally {
    isLoading.value = false;
  }
}

async function download() {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    const old = tickets.value.splice(0, tickets.value.length);
    const myTicket: Parse.Object = Parse.Object.extend("Ticket");
    const query: Parse.Query = new Parse.Query(myTicket);
    query.equalTo("utente", utente.value);
    try {
      const results: Parse.Object[] = await query.find();
      fillTickets(results);
    } catch (error) {
      tickets.value = old;
      console.error("Error while fetching Ticket", error);
    }
  } finally {
    isLoading.value = false;
  }
}

function fillTickets(results: Parse.Object[]) {
  for (const object of results) {
    console.log("Data", object.get("data"));
    tickets.value.push({
      id: object.get("objectId"),
      commessa: object.get("commessa"),
      // data: object.get("data"),
      data: object.get("data"),
      ore: object.get("ore"),
    });
  }
}
</script>

<style>
body {
  min-height: 100vh;
}
</style>
