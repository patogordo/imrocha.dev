<script setup lang="ts">
import { appConfig } from "~/config/app";
</script>

<template>
  <section id="contact-me" class="w-full flex flex-col items-center">
    <h3 class="text-xl text-center mb-2 mt-12">
      {{ $t("contact-me.title") }}
    </h3>

    <p class="text-lg text-center">
      {{ $t("contact-me.description") }}
    </p>

    <span class="mt-12" />

    <ContactMeForm />

    <div class="w-full h-[1px] bg-gray-700 mt-12"></div>

    <span class="mt-12">{{
      $t("contact-me.prefer-another-contact-method")
    }}</span>

    <span class="mt-6" />

    <div class="w-full flex max-sm:flex-col items-center justify-center gap-4">
      <a
        class="flex items-center justify-center gap-2"
        href="https://github.com/patogordo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="ri:github-fill" size="24" />
        <span class="font-semibold underline underline-offset-2">GitHub</span>
      </a>

      <a
        class="flex items-center justify-center gap-2"
        href="https://www.linkedin.com/in/icaromiguel/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="skill-icons:linkedin" size="24" />
        <span class="font-semibold underline underline-offset-2">LinkedIn</span>
      </a>

      <a
        class="flex items-center justify-center gap-2"
        :href="`mailto:${appConfig.contactMailAddress}`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="uil:envelope-alt" size="24" />
        <span class="font-semibold underline underline-offset-2">{{
          appConfig.contactMailAddress
        }}</span>
      </a>
    </div>
  </section>
</template>
