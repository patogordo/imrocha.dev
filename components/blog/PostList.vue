<script lang="ts" setup>
defineProps<{
  posts: {
    path: string;
    title: string;
    description: string;
    date?: string;
    tags?: string[];
  }[];
}>();

const { locale } = useI18n();

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
  <ul class="w-full flex flex-col gap-6">
    <li v-for="post in posts" :key="post.path">
      <!-- Whole card is clickable through the title link; tags stay separate links on top -->
      <article
        class="group relative p-5 bg-base-200 border-2 border-base-100 rounded-lg transition-colors hover:border-primary-500"
      >
        <p class="text-sm transition-colors group-hover:!text-secondary-400">
          <time
            :datetime="post.date"
            class="transition-colors group-hover:!text-secondary-400"
            >{{ formatDate(post.date) }}</time
          >
          <template v-if="locale !== 'pt'">
            · {{ $t("blog.written-in-pt") }}
          </template>
        </p>
        <h3 class="mt-1">
          <nuxt-link
            :to="post.path"
            class="!text-white group-hover:!text-primary-400 after:absolute after:inset-0"
          >
            {{ post.title }}
          </nuxt-link>
        </h3>
        <p class="mt-2">{{ post.description }}</p>
        <ul v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-4">
          <li v-for="tag in post.tags" :key="tag">
            <BlogTag :tag="tag" class="relative z-10 bg-base-300" />
          </li>
        </ul>
      </article>
    </li>
  </ul>
</template>
