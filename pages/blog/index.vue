<script lang="ts" setup>
const { t, locale } = useI18n();

const { data: posts } = await useAsyncData("blog-posts", () =>
  queryCollection("content")
    .where("path", "LIKE", "/blog/%")
    .order("date", "DESC")
    .select("path", "title", "description", "date", "tags")
    .all(),
);

useHead({ title: () => `${t("blog.title")} · Ícaro Rocha` });

const formatDate = (date?: string) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString(locale.value, {
        timeZone: "UTC",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
</script>

<template>
  <section class="w-full max-w-3xl mx-auto flex flex-col items-start">
    <h2 class="mb-2">{{ $t("blog.title") }}</h2>
    <p class="text-lg">{{ $t("blog.description") }}</p>

    <p v-if="!posts?.length" class="mt-12">{{ $t("blog.empty") }}</p>

    <ul class="w-full flex flex-col gap-6 mt-12">
      <li v-for="post in posts" :key="post.path">
        <nuxt-link
          :to="post.path"
          class="group block p-5 bg-base-200 border-2 border-base-100 rounded-lg transition-colors hover:border-primary-500"
        >
          <p class="text-sm">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <template v-if="locale !== 'pt'">
              · {{ $t("blog.written-in-pt") }}
            </template>
          </p>
          <h3 class="mt-1 !text-white group-hover:!text-primary-400">
            {{ post.title }}
          </h3>
          <p class="mt-2">{{ post.description }}</p>
          <ul v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-4">
            <li
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-0.5 text-xs bg-base-300 border border-base-100 rounded-md"
            >
              #{{ tag }}
            </li>
          </ul>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>
