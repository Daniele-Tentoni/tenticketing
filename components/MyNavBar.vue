<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <NuxtLink class="navbar-item" to="/">
          <strong>{{ app.title }}</strong>
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
              <span class="icon" v-if="props.isLoading">
                <i class="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
          </div>
          <div class="navbar-end">
            <slot name="navbarEnd">Navbar End</slot>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script lang="ts" setup>
interface Props {
  isLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), { isLoading: false });

const app = useAppConfig();

const isNavBarVisible = ref(false);
</script>
