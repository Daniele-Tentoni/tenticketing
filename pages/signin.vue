<template>
  <div class="container">
    <h1 class="h1">
      User Login
    </h1>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Username</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              v-model="username"
              class="input is-danger"
              type="next"
              placeholder="Username"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Password</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              v-model="password"
              class="input is-danger"
              type="next"
              placeholder="Password"
            >
          </div>
        </div>
      </div>
    </div>
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
  } catch (error: any) {
    alert(`Error! ${error.message}`);
    return false;
  }
}
</script>
