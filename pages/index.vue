<script lang="ts" setup></script>

<template>
  <section class="w-full h-fit">
    <Hero />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <Projects />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <Skills />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <ContactMe />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <GithubActivity />

    <footer
      class="w-full flex max-sm:flex-col items-center justify-between gap-4 mt-12 pt-6 border-t border-gray-700 text-sm"
    >
      <span>© {{ new Date().getFullYear() }} Ícaro Rocha</span>

      <a href="#" class="flex items-center gap-1 font-semibold">
        {{ $t("footer.back-to-top") }}
        <Icon name="tabler:arrow-up" size="18" />
      </a>
    </footer>
  </section>
</template>
