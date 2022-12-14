<template>
  <Body class="has-background-dark has-text-light" />
  <MyNavBar :is-loading="isLoading">
    <template #navbarEnd>
      <div class="navbar-item">
        <!-- Use reference for App.onMounted event. -->
        <UserLoader
          ref="userLoader"
          v-model="user"
        />
      </div>
    </template>
  </MyNavBar>
  <section class="section">
    <div class="container">
      <TicketTable />
    </div>
  </section>
  <MyFooter />
  <div>
    <FloatingActionButton :click="showTicketing" />
  </div>
  <div>
    <NewTicketModal
      v-model:visible="ticketing"
      :user="user"
    />
  </div>
</template>

<script lang="ts" setup>
import FloatingActionButton from './components/FloatingActionButton.vue';
import MyNavBar from './components/MyNavBar.vue';
import TicketTable from './components/TicketTable.vue';
import UserLoader from './components/UserLoader.vue';

import Parse from 'parse';
const config = useRuntimeConfig();
const isLoading = useLoading();

const appId = config.public.apiKey;
const jsKey = config.public.jsKey;
const serverUrl = 'https://parseapi.back4app.com/';

const userLoader = ref<InstanceType<typeof UserLoader> | null>(null);
const user = useUser();

onMounted(async () => {
  Parse.serverURL = serverUrl;
  Parse.initialize(appId, jsKey);
  userLoader.value?.download();
});

function showTicketing (e: MouseEvent) {
  console.log('Mouse button', e.button);
  ticketing.value = true;
}

const ticketing = ref(false);
</script>

<style>
body {
  min-height: 100vh;
}
</style>
