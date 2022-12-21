<template>
  <Body class="has-background-dark has-text-light" />
  <MyNavBar :is-loading="isLoading">
    <template #navbarEnd>
      <div class="navbar-item">
        {{ status }}
      </div>
      <div class="navbar-item">
        <!-- Use reference for App.onMounted event. -->
        <div
          v-if="isLogIn"
          class="navbar-item"
        >
          Hello, {{ username }}
        </div>
        <div class="navbar-item">
          <div
            v-if="!isLogIn"
            class="buttons"
          >
            <NuxtLink
              class="button"
              to="signup"
            >
              Sign Up
            </NuxtLink>
            <NuxtLink
              class="button"
              to="signin"
            >
              Sign In
            </NuxtLink>
          </div>
          <div
            v-else
          >
            <button @click="userLogout">
              Logout
            </button>
          </div>
        </div>
      </div>
    </template>
  </MyNavBar>
  <section class="section">
    <div class="container">
      <NuxtPage />
    </div>
  </section>
  <MyFooter />
  <div>
    <FloatingActionButton :click="showTicketing" />
  </div>
  <div>
    <NewTicketModal
      v-model:visible="ticketing"
      :user="username"
    />
  </div>
</template>

<script lang="ts" setup>
import FloatingActionButton from './components/FloatingActionButton.vue';
import MyNavBar from './components/ui/MyNavBar.vue';
import MyFooter from '@/components/ui/MyFooter.vue';
// import UserLoader from './components/UserLoader.vue';

import Parse from 'parse';
const config = useRuntimeConfig();
const isLoading = useLoading();

const serverUrl = 'https://parseapi.back4app.com/';

const tickets = useTickets();
// const userLoader = ref<InstanceType<typeof UserLoader> | null>(null);
const user = useUser();
const username = computed(() => user.value?.get('username') ?? '' as string);
const isLogIn = computed(() => ((user.value?.get('username') ?? '') as string).length !== 0);
const status = ref('');

onMounted(async () => {
  try {
    isLoading.value = true;
    const appId = config.public.apiKey;
    const jsKey = config.public.jsKey;
    Parse.serverURL = serverUrl;
    status.value = 'Initializing parse';
    Parse.initialize(appId, jsKey);
    await getCurrentUser();
    await download();
  } finally {
    isLoading.value = false;
    status.value = 'Ready';
  }
});

function showTicketing (e: MouseEvent) {
  console.log('Mouse button', e.button);
  ticketing.value = true;
}

const ticketing = ref(false);

watch(user, async (newUser) => {
  if (newUser !== null) {
    console.log('Watched user', newUser.getUsername());
    await download();
  }
});

async function userLogout () {
  try {
    await Parse.User.logOut();
    const currentUser: Parse.User | null = await Parse.User.currentAsync();
    if (currentUser === null) {
      alert('Successful logout');
    }
    await getCurrentUser();
    return true;
  } catch (error: any) {
    alert(`Error! ${error.message}`);
    return false;
  }
}

async function download () {
  try {
    console.log('Download new tickets for %s', username.value);
    const old = tickets.value.splice(0, tickets.value.length);
    const myTicket: Parse.Object = Parse.Object.extend('Ticket');
    const query: Parse.Query = new Parse.Query(myTicket);
    query.equalTo('utente', username.value);
    try {
      const results: Parse.Object[] = await query.find();
      fillTickets(results);
    } catch (error) {
      tickets.value = old;
      console.error('Error while fetching Ticket', error);
    }
  } finally { /* empty */ }
}

function fillTickets (results: Parse.Object[]) {
  console.log('Filling tickets with ', results);
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
</script>

<style>
body {
  min-height: 100vh;
}
</style>
