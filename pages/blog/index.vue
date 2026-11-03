<script lang="ts" setup>
const { t } = useI18n();

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .select("path", "title", "description", "date", "tags")
    .all(),
);

useHead({ title: () => `${t("blog.title")} · Ícaro Rocha` });
</script>

<template>
  <section class="w-full max-w-3xl mx-auto flex flex-col items-start">
    <h2 class="mb-2">{{ $t("blog.title") }}</h2>
    <p class="text-lg">{{ $t("blog.description") }}</p>

    <nuxt-link
      to="/blog/editor"
      class="inline-flex items-center gap-2 mt-4 px-3 py-1.5 text-sm font-semibold bg-base-200 border border-base-100 rounded-lg transition-colors hover:border-primary-500"
    >
      <Icon name="tabler:pencil" size="18" />
      {{ $t("blog.open-editor") }}
    </nuxt-link>

    <p v-if="!posts?.length" class="mt-12">{{ $t("blog.empty") }}</p>
    <BlogPostList v-else :posts="posts" class="mt-12" />
  </section>
</template>
