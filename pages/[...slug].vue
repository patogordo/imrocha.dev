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

// Markdown without the frontmatter, with the title as the first heading
const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true });
const copyMarkdown = () =>
  copy(
    `# ${page.value?.title}\n\n${(page.value?.rawbody ?? "").replace(/^---\r?\n[\s\S]*?\r?\n---\s*/, "")}`,
  );

// Print styles (assets/scss) turn the page into a clean document; "Save as PDF" does the rest
const exportPdf = () => window.print();
</script>

<template>
  <article v-if="page" class="w-full max-w-3xl mx-auto">
    <nuxt-link
      v-if="route.path.startsWith('/blog/')"
      to="/blog"
      class="inline-flex items-center gap-1 text-sm font-semibold hover:!text-primary-400 print:hidden"
    >
      <Icon name="tabler:arrow-left" size="16" />
      {{ $t("blog.back") }}
    </nuxt-link>

    <h1 class="!text-3xl sm:!text-4xl !font-bold mt-6 leading-tight">
      {{ page.title }}
    </h1>

    <div
      v-if="date"
      class="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-sm"
    >
      <time :datetime="page.date">{{ date }}</time>
      <BlogTag v-for="tag in page.tags" :key="tag" :tag="tag" />
    </div>

    <div class="flex flex-wrap gap-2 mt-6 print:hidden">
      <button type="button" class="post-action" @click="copyMarkdown">
        <Icon :name="copied ? 'tabler:check' : 'tabler:markdown'" size="18" />
        {{ $t(copied ? "blog.copied-markdown" : "blog.copy-markdown") }}
      </button>
      <button type="button" class="post-action" @click="exportPdf">
        <Icon name="tabler:file-type-pdf" size="18" />
        {{ $t("blog.export-pdf") }}
      </button>
    </div>

    <ContentRenderer :value="page" class="prose-content mt-10" />

    <BlogToc v-if="page.body?.toc?.links" :links="page.body.toc.links" />
  </article>
</template>

<style lang="scss" scoped>
.post-action {
  @apply flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-base-200 border border-base-100 rounded-lg transition-colors;

  &:hover {
    @apply border-primary-500;
  }
}
</style>
