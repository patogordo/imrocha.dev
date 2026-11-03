<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const { data: page } = await useAsyncData("page-" + route.path, () =>
  queryCollection("content").path(route.path).first(),
);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useHead({ title: () => `${page.value?.title} · Ícaro Rocha` });

const date = computed(() =>
  page.value?.date
    ? new Date(`${page.value.date}T00:00:00Z`).toLocaleDateString(
        locale.value,
        { timeZone: "UTC", day: "numeric", month: "long", year: "numeric" },
      )
    : "",
);
</script>

<template>
  <article v-if="page" class="w-full max-w-3xl mx-auto">
    <nuxt-link
      v-if="route.path.startsWith('/blog/')"
      to="/blog"
      class="inline-flex items-center gap-1 text-sm font-semibold hover:!text-primary-400"
    >
      <Icon name="tabler:arrow-left" size="16" />
      {{ $t("blog.back") }}
    </nuxt-link>

    <h1 class="!text-3xl sm:!text-4xl !font-bold mt-6 leading-tight">
      {{ page.title }}
    </h1>

    <p v-if="date" class="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-sm">
      <time :datetime="page.date">{{ date }}</time>
      <span
        v-for="tag in page.tags"
        :key="tag"
        class="px-2 py-0.5 text-xs bg-base-200 border border-base-100 rounded-md"
      >
        #{{ tag }}
      </span>
    </p>

    <ContentRenderer :value="page" class="prose-content mt-10" />

    <BlogToc v-if="page.body?.toc?.links" :links="page.body.toc.links" />
  </article>
</template>
