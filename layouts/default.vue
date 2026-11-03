<template>
  <main
    class="w-full h-fit py-8 px-72 max-xl:px-32 max-lg:px-24 max-md:px-12 max-sm:px-8 print:!p-0"
  >
    <section class="w-full flex flex-col items-center print:hidden">
      <HeroHeader />

      <span class="mt-12" />
    </section>

    <slot />
  </main>
</template>
