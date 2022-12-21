<template>
  <div class="container">
    <h1 class="h1">
      User Registration
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
              type="text"
              placeholder="Username"
            >
          </div>
          <p
            v-if="username === ''"
            class="help is-danger"
          >
            This username is required
          </p>
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
              type="password"
              placeholder="Password"
            >
          </div>
          <p
            v-if="password.length === 0"
            class="help is-danger"
          >
            This password is required
          </p>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Confirm</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              v-model="passwordConfirm"
              class="input is-danger"
              type="password"
              placeholder="Confirm password"
            >
          </div>
          <p
            v-if="passwordConfirm.length === 0"
            class="help is-danger"
          >
            This password confirmation is required
          </p>
          <p
            v-if="!validPassword"
            class="help is-danger"
          >
            Passwords doesn't match
          </p>
        </div>
      </div>
    </div>
    <div class="buttons">
      <div class="field">
        <button
          class="button"
          @click="userRegistration"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Parse from 'parse';

const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

const validPassword = computed(() => password.value === passwordConfirm.value);

async function userRegistration () {
  try {
    const user: Parse.User = await Parse.User.signUp(username.value, password.value, {});
    alert(`Successful ${user.getUsername()} creation`);
    return true;
  } catch (error) {
    alert(`Error ${error}`);
    return false;
  }
}
</script>
