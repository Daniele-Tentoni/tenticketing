<template>
  <Body class="has-background-dark has-text-light" />
  <MyNavBar :is-loading="isLoading">
    <template #navbarEnd>
      <div class="navbar-item">
        <UserLoader ref="userLoader" />
      </div>
    </template>
  </MyNavBar>
  <section class="section">
    <div class="container">
      <TicketTable></TicketTable>
    </div>
  </section>
  <MyFooter></MyFooter>
  <div>
    <FloatingActionButton :click="(_) => (ticketing = true)" />
  </div>
</template>

<script lang="ts" setup>
import FloatingActionButton from "./components/FloatingActionButton.vue";
import MyNavBar from "./components/MyNavBar.vue";

import Parse from "parse";
import UserLoader from "./components/UserLoader.vue";

const config = useRuntimeConfig();
const isLoading = useLoading();

const appId = config.public.apiKey;
const jsKey = config.public.jsKey;
const serverUrl = "https://parseapi.back4app.com/";

const userLoader = ref<InstanceType<typeof UserLoader> | null>(null);

onMounted(async () => {
  Parse.serverURL = serverUrl;
  Parse.initialize(appId, jsKey);
  userLoader.value?.download();
});

const ticketing = ref(false);
</script>

<style>
body {
  min-height: 100vh;
}
</style>
