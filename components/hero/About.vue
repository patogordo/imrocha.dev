<script lang="ts" setup></script>

<template>
  <div id="about" class="w-full flex flex-col items-start justify-start">
    <h3 class="text-xl mb-2">{{ $t("about.who-am-i.title") }}</h3>

    <p class="text-lg">
      {{ $t("about.who-am-i.description.my-name-is") }}
      <span class="text-secondary">Ícaro Rocha</span>
      {{ $t("about.who-am-i.description.a-k-a") }}
      <span class="text-primary">Pato</span>,
      {{ $t("about.who-am-i.description.text") }}
    </p>

    <h3 class="text-xl mb-2 mt-12">
      {{ $t("about.knowledge-and-experience.title") }}
    </h3>

    <p class="text-lg">
      {{ $t("about.knowledge-and-experience.description.education-and-experience-intro") }}
      <a
        href="https://www.cruzeirodosul.edu.br/a-cruzeiro-do-sul"
        target="_blank"
        rel="noopener noreferrer"
        class="text-info-500 underline"
      >
        Universidade Cruzeiro do Sul (<icon
          name="circle-flags:br"
          size="16"
        />)</a
      >, {{ $t("about.knowledge-and-experience.description.education-and-experience-details") }}
    </p>

    <HeroExperience />
  </div>
</template>
