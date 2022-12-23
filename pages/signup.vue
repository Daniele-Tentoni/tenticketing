<template>
  <div class="container">
    <h1 class="h1">
      User Registration
    </h1>
    <Field
      v-model="username"
      placeholder="Username"
      text="Username"
    >
      <template #validation>
        <p
          v-if="username === ''"
          class="help is-danger"
        >
          This username is required
        </p>
      </template>
    </Field>
    <Field
      v-model="password"
      placeholder="Password"
      text="Password"
      type="password"
    >
      <template #validation>
        <p
          v-if="password.length === 0"
          class="help is-danger"
        >
          This password is required
        </p>
      </template>
    </Field>
    <Field
      v-model="passwordConfirm"
      placeholder="Confirm password"
      text="Confirm"
      type="password"
    >
      <template #validation>
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
      </template>
    </Field>
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
import Field from '@/components/ui/form/field.vue';
import Parse from 'parse';

const isLoading = useLoading();

const username = ref('');
const password = ref('');
const passwordConfirm = ref('');

const validPassword = computed(() => password.value === passwordConfirm.value);

async function userRegistration () {
  if (isLoading.value) {
    return;
  }

  try {
    isLoading.value = true;
    const user: Parse.User = await Parse.User.signUp(username.value, password.value, {});
    alert(`Successful ${user.getUsername()} creation`);
    return true;
  } catch (error: unknown) {
    alert(`Error ${error}`);
    return false;
  } finally {
    isLoading.value = false;
  }
}
</script>
