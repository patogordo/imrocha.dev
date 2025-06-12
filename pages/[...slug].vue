<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData("page-" + route.path, async () => {
  const foundPage = await queryCollection("content").path(route.path).first();

  return foundPage;
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
    :class="page.extension === 'md' ? 'content-page' : ''"
  />
</template>
