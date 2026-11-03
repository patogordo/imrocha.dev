<script lang="ts" setup>
const route = useRoute();
const { t } = useI18n();

const tag = computed(() => String(route.params.tag));

// Tags are stored as a JSON array, so match the quoted value
const { data: posts } = await useAsyncData(
  () => `blog-tag-${tag.value}`,
  () =>
    queryCollection("content")
      .where("path", "LIKE", "/blog/%")
      .where("tags", "LIKE", `%"${tag.value}"%`)
      .order("date", "DESC")
      .select("path", "title", "description", "date", "tags")
      .all(),
);

useHead({ title: () => `#${tag.value} · ${t("blog.title")} · Ícaro Rocha` });
</script>

<template>
  <section class="w-full max-w-3xl mx-auto flex flex-col items-start">
    <nuxt-link
      to="/blog"
      class="inline-flex items-center gap-1 text-sm font-semibold hover:!text-primary-400"
    >
      <Icon name="tabler:arrow-left" size="16" />
      {{ $t("blog.all-posts") }}
    </nuxt-link>

    <h2 class="mt-6 mb-2">
      {{ $t("blog.tag-title") }}
      <span class="!text-primary-400">#{{ tag }}</span>
    </h2>
    <p class="text-lg">
      {{ $t("blog.tag-count", { count: posts?.length ?? 0 }, posts?.length ?? 0) }}
    </p>

    <BlogPostList v-if="posts?.length" :posts="posts" class="mt-12" />
  </section>
</template>
