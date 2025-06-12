<template>
  <main
    class="w-full h-fit py-8 px-72 max-xl:px-32 max-lg:px-24 max-md:px-12 max-sm:px-8"
  >
    <section class="w-full flex flex-col items-center">
      <HeroHeader />

      <span class="mt-12" />
    </section>

    <slot />
  </main>
</template>

<style lang="scss">
.content-page {
  @apply w-full flex flex-col items-start justify-start gap-6;
}
</style>
