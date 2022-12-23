<template>
  <div class="container">
    <h1 class="h1">
      User Login
    </h1>
    <Field
      v-model="username"
      placeholder="Username"
      text="Username"
    />
    <Field
      v-model="password"
      placeholder="Password"
      text="Password"
      type="password"
    >
      <template #left-icon>
        <i class="fas fa-key" />
      </template>
    </Field>
    <div class="buttons">
      <div class="field">
        <button
          class="button"
          @click="doUserLogin"
        >
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Field from '@/components/ui/form/field.vue';
import Parse from 'parse';

const username = ref('');
const password = ref('');

async function doUserLogin () {
  try {
    const loggedInUser: Parse.User = await Parse.User.logIn(username.value, password.value);
    alert(`Success login with ${loggedInUser.getUsername()}`);
    const currentUser: Parse.User | null = await Parse.User.currentAsync();
    console.log(loggedInUser === currentUser);
    username.value = '';
    password.value = '';
    await getCurrentUser();
    return true;
  } catch (error: unknown) {
    alert(`Error! ${(error as Error).message}`);
    return false;
  }
}
</script>
