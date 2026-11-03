<script lang="ts" setup>
const drawerOpen = ref(false);
const route = useRoute();

const isActive = (hash: string) => {
  const currentHash = route.hash || "";

  if (currentHash?.replace("#", "") === hash) {
    return true;
  }

  return false;
};

const closeDrawer = () => {
  drawerOpen.value = !drawerOpen.value;
};

const toggleDrawerOpen = () => {
  drawerOpen.value = !drawerOpen.value;
};
</script>

<template>
  <header class="w-full flex flex-row items-center justify-between">
    <nuxt-link to="/" class="flex items-center gap-3">
      <img src="/logo.svg" alt="" width="36" height="36" class="w-9 h-9" />
      <h1 class="logo-font [&_*]:text-2xl">
        <span class="text-primary-500">Ícaro</span>&nbsp;<span
          class="text-secondary-500"
          >Rocha</span
        >
      </h1>
    </nuxt-link>

    <div class="max-md:flex hidden items-center justify-center gap-4">
      <button @click="toggleDrawerOpen">
        <span class="sr-only">Menu</span>
        <Icon name="tabler:menu-2" size="28" />
      </button>
    </div>

    <ul
      :class="
        drawerOpen
          ? 'max-md:flex max-md:fixed max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:w-full max-md:h-full max-md:bg-base-200 z-50'
          : 'max-md:hidden'
      "
      class="flex flex-row items-center justify-end gap-8"
    >
      <li
        :class="drawerOpen ? 'max-md:flex ' : 'max-md:hidden'"
        class="hidden fixed top-4 right-4"
      >
        <button
          @click="toggleDrawerOpen"
          class="bg-base-300 p-4 h-[60px] w-[60px] rounded-full"
        >
          <span class="sr-only">Fechar</span>
          <Icon name="tabler:x" size="28" />
        </button>
      </li>
      <li>
        <nuxt-link
          to="/#about"
          @click="closeDrawer"
          :class="
            (route.path === '/' && isActive('')) || isActive('about')
              ? '!text-primary-500'
              : ''
          "
          class="font-semibold"
        >
          {{ $t("header.about") }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/#projects"
          @click="closeDrawer"
          :class="isActive('projects') ? '!text-primary-500' : ''"
          class="font-semibold"
        >
          {{ $t("header.projects") }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/#contact-me"
          @click="closeDrawer"
          :class="isActive('contact-me') ? '!text-primary-500' : ''"
          class="font-semibold"
        >
          {{ $t("header.contact-me") }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/blog"
          @click="closeDrawer"
          :class="route.path.startsWith('/blog') ? '!text-primary-500' : ''"
          class="font-semibold"
        >
          {{ $t("header.blog") }}
        </nuxt-link>
      </li>
      <li>
        <hero-lang-dropdown />
      </li>
    </ul>
  </header>
</template>
