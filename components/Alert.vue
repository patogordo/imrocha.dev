<script setup>
defineProps(["type"]);
</script>

<template>
  <div class="alert" :class="[type]">
    <h5>
      <slot name="title" />
    </h5>

    <p>
      <slot name="description" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @apply w-full flex flex-col items-start justify-start p-4 border rounded-md border-primary-300;

  h5 {
    @apply text-lg !font-semibold;
  }

  p {
    @apply text-sm;
  }

  &.info {
    @apply border-blue-400 bg-blue-400/5;
  }
  &.warning {
    @apply border-yellow-400 bg-yellow-400/5;
  }
  &.error {
    @apply border-red-400 bg-red-400/5;
  }
  &.success {
    @apply border-green-400 bg-green-400/5;
  }
}
</style>
