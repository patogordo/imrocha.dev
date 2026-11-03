<script lang="ts" setup>
import type { MDCParserResult } from "@nuxtjs/mdc";
import sample from "~/config/editor-sample.md?raw";
import aiInstructions from "~/config/ai-writing-instructions.md?raw";

const { t, locale } = useI18n();
useHead({ title: () => `${t("editor.title")} · Ícaro Rocha` });

// The draft lives only in this browser; storage can be blocked, so every access is guarded
const STORAGE_KEY = "imrocha:editor-draft";
const readDraft = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};
const saveDraft = (value: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {}
};

const source = ref(readDraft() ?? sample);
const parsed = shallowRef<MDCParserResult | null>(null);
const parseError = ref(false);
const tab = ref<"write" | "preview">("write");

// Same parser and components as the published posts, so the preview matches the blog
let run = 0;
watchDebounced(
  source,
  async (markdown) => {
    const id = ++run;
    saveDraft(markdown);
    try {
      const { parseMarkdown } = await import("@nuxtjs/mdc/runtime");
      const result = await parseMarkdown(markdown);
      if (id !== run) return; // a newer edit already started parsing
      parsed.value = result;
      parseError.value = false;
    } catch {
      if (id === run) parseError.value = true; // keep the last good preview
    }
  },
  { debounce: 200, immediate: true },
);

const date = computed(() => {
  const value = parsed.value?.data?.date;
  if (!value) return "";
  const parsedDate = new Date(`${String(value).slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : parsedDate.toLocaleDateString(locale.value, {
        timeZone: "UTC",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
});
const tags = computed(() =>
  Array.isArray(parsed.value?.data?.tags) ? (parsed.value.data.tags as string[]) : [],
);

const markdownClipboard = useClipboard({ copiedDuring: 2000, legacy: true });
const aiClipboard = useClipboard({ copiedDuring: 2000, legacy: true });

const resetToSample = () => {
  if (source.value === sample || window.confirm(t("editor.reset-confirm"))) {
    source.value = sample;
  }
};
</script>

<template>
  <!-- Wider than the rest of the site: breaks out of the layout padding -->
  <section
    class="relative left-1/2 -translate-x-1/2 w-[calc(100vw-4rem)] max-w-[1600px]"
  >
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <nuxt-link
          to="/blog"
          class="inline-flex items-center gap-1 text-sm font-semibold hover:!text-primary-400"
        >
          <Icon name="tabler:arrow-left" size="16" />
          {{ $t("blog.back") }}
        </nuxt-link>
        <h2 class="mt-4 mb-1">{{ $t("editor.title") }}</h2>
        <p>{{ $t("editor.description") }}</p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="editor-action"
          @click="markdownClipboard.copy(source)"
        >
          <Icon
            :name="markdownClipboard.copied.value ? 'tabler:check' : 'tabler:markdown'"
            size="18"
          />
          {{
            $t(
              markdownClipboard.copied.value
                ? "blog.copied-markdown"
                : "blog.copy-markdown",
            )
          }}
        </button>
        <button
          type="button"
          class="editor-action !border-primary-700"
          @click="aiClipboard.copy(aiInstructions)"
        >
          <Icon
            :name="aiClipboard.copied.value ? 'tabler:check' : 'tabler:sparkles'"
            size="18"
          />
          {{ $t(aiClipboard.copied.value ? "editor.copied-ai" : "editor.copy-ai") }}
        </button>
        <button type="button" class="editor-action" @click="resetToSample">
          <Icon name="tabler:restore" size="18" />
          {{ $t("editor.reset") }}
        </button>
      </div>
    </div>

    <div class="flex gap-2 mt-6 lg:hidden" role="tablist">
      <button
        v-for="name in ['write', 'preview'] as const"
        :key="name"
        type="button"
        role="tab"
        :aria-selected="tab === name"
        class="flex-1 py-2 text-sm font-semibold rounded-lg border transition-colors"
        :class="
          tab === name
            ? 'border-primary-500 bg-base-200 !text-white'
            : 'border-base-100'
        "
        @click="tab = name"
      >
        {{ $t(`editor.${name}`) }}
      </button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 mt-6">
      <label :class="tab === 'preview' ? 'max-lg:hidden' : ''">
        <span class="sr-only">{{ $t("editor.write") }}</span>
        <textarea
          v-model="source"
          spellcheck="false"
          :placeholder="$t('editor.placeholder')"
          class="editor-input w-full h-[70vh] lg:h-[calc(100vh-21rem)] p-4 text-sm leading-6 rounded-lg border border-base-100 resize-none outline-none transition-colors focus:border-primary-500"
        />
      </label>

      <div
        class="relative h-[70vh] lg:h-[calc(100vh-21rem)] overflow-y-auto p-6 bg-base-300 border border-base-100 rounded-lg"
        :class="tab === 'write' ? 'max-lg:hidden' : ''"
        aria-live="polite"
      >
        <p
          v-if="parseError"
          class="mb-4 px-3 py-2 text-sm rounded-md border border-warning-500 !text-warning-400"
        >
          {{ $t("editor.parse-error") }}
        </p>

        <h1
          v-if="parsed?.data?.title"
          class="!text-3xl sm:!text-4xl !font-bold leading-tight"
        >
          {{ parsed.data.title }}
        </h1>
        <div
          v-if="date || tags.length"
          class="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-sm"
        >
          <time v-if="date">{{ date }}</time>
          <span
            v-for="tag in tags"
            :key="tag"
            class="px-2 py-0.5 text-xs bg-base-200 border border-base-100 rounded-md"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Same renderer as the posts, so ::alert and the custom Prose components resolve -->
        <ContentRenderer
          v-if="parsed"
          :value="{ ...parsed.data, body: parsed.body }"
          class="prose-content"
          :class="parsed.data?.title ? 'mt-10' : ''"
        />
        <p v-if="!source.trim()" class="text-sm">{{ $t("editor.empty") }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.editor-action {
  @apply flex items-center gap-2 px-3 py-1.5 text-sm font-semibold bg-base-200 border border-base-100 rounded-lg transition-colors;

  &:hover {
    @apply border-primary-500;
  }
}

.editor-input {
  background: #1c2128;
  caret-color: var(--primary-500);

  &,
  &::placeholder {
    font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  }
}
</style>
