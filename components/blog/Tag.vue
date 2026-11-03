<script lang="ts" setup>
defineProps<{ tag: string }>();
</script>

<template>
  <nuxt-link
    :to="`/blog/tags/${encodeURIComponent(tag)}`"
    class="inline-block px-2 py-0.5 text-xs bg-base-200 border border-base-100 rounded-md transition-colors hover:border-primary-500 hover:!text-primary-400"
  >
    #{{ tag }}
  </nuxt-link>
</template>
