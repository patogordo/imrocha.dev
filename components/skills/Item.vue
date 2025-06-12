<script lang="ts" setup>
import type { Stack } from "./Index.vue";

defineProps<{
  stackItems: Stack[];
}>();
</script>

<template>
  <li
    class="tech-item bg-base-200 px-3 py-1.5 border border-base-100 rounded-lg flex items-center justify-center gap-2"
    v-for="(item, index) in stackItems"
    :key="index"
  >
    <component :is="item.icon" class="w-5 h-5" />
    {{ item.name }}
  </li>
</template>

<style lang="scss">
.tech-item {
  @apply cursor-pointer transition-all duration-300 ease-in-out;

  &:hover {
    @apply border border-violet-500;

    filter: brightness(1.2);
  }
}
</style>
