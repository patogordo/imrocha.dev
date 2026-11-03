<script setup lang="ts">
const props = defineProps({
  code: { type: String, default: "" },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
});

const { copy, copied } = useClipboard({ copiedDuring: 2000 });
</script>

<template>
  <div class="code-block">
    <div class="code-block-header">
      <span>{{ props.filename || props.language || "text" }}</span>
      <button
        type="button"
        class="code-block-copy"
        :aria-label="$t(copied ? 'blog.copied' : 'blog.copy')"
        @click="copy(props.code)"
      >
        <Icon :name="copied ? 'tabler:check' : 'tabler:copy'" size="16" />
        {{ $t(copied ? "blog.copied" : "blog.copy") }}
      </button>
    </div>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>
