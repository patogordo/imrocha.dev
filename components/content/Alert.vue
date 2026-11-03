<script setup lang="ts">
// Callout used in Markdown: ::alert{type="warning" title="Atenção"} ... ::
const props = withDefaults(
  defineProps<{
    type?: "info" | "success" | "warning" | "error";
    title?: string;
  }>(),
  { type: "info" },
);

const icons = {
  info: "tabler:info-circle",
  success: "tabler:circle-check",
  warning: "tabler:alert-triangle",
  error: "tabler:alert-octagon",
};
</script>

<template>
  <div class="callout" :class="props.type" role="note">
    <p v-if="props.title" class="callout-title">
      <Icon :name="icons[props.type]" size="20" />
      {{ props.title }}
    </p>
    <div class="callout-body">
      <slot />
    </div>
  </div>
</template>
