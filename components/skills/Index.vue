<script lang="ts" setup>
import { h } from "vue";
import { Icon } from "#components";
import type { VNode } from "vue";

// Define the stack type
export type Stack = {
  icon: VNode;
  name: string;
};

// Backend stack
const backendStack: Stack[] = [
  {
    icon: h(Icon, { name: "logos:typescript-icon" }),
    name: "TypeScript",
  },
  {
    icon: h(Icon, { name: "logos:nestjs" }),
    name: "Nest",
  },
  {
    icon: h(Icon, { name: "skill-icons:prisma" }),
    name: "Prisma",
  },
  {
    icon: h(Icon, { name: "skill-icons:mysql-dark" }),
    name: "MySQL",
  },
  {
    icon: h(Icon, { name: "logos:postgresql" }),
    name: "PostgresSQL",
  },
  {
    icon: h(Icon, { name: "logos:mongodb-icon" }),
    name: "MongoDB",
  },
  {
    icon: h(Icon, { name: "skill-icons:redis-light" }),
    name: "Redis",
  },
  {
    icon: h(Icon, { name: "skill-icons:docker" }),
    name: "Docker",
  },
  {
    icon: h(Icon, { name: "logos:aws-s3", class: "rounded-md" }),
    name: "AWS S3",
  },
  {
    icon: h(Icon, { name: "carbon:microservices-1", class: "text-blue-500" }),
    name: "Microservices",
  },
  {
    icon: h(Icon, { name: "icon-park-outline:api", class: "text-violet-500" }),
    name: "RESTful",
  },
  {
    icon: h(Icon, { name: "logos:swagger" }),
    name: "OpenAPI",
  },
];

// Frontend stack
const frontendStack: Stack[] = [
  {
    icon: h(Icon, { name: "devicon:vuejs" }),
    name: "Vue",
  },
  {
    icon: h(Icon, { name: "logos:react" }),
    name: "React",
  },
  {
    icon: h(Icon, { name: "logos:nuxt-icon" }),
    name: "NuxtJS",
  },
  {
    icon: h(Icon, { name: "logos:nextjs-icon" }),
    name: "NextJS",
  },
  {
    icon: h(Icon, { name: "logos:tailwindcss-icon" }),
    name: "Tailwind",
  },
];

// Mobile stack
const mobileStack: Stack[] = [
  {
    icon: h(Icon, { name: "logos:android-icon" }),
    name: "Android",
  },
  {
    icon: h(Icon, { name: "logos:react" }),
    name: "React Native",
  },
  {
    icon: h(Icon, { name: "simple-icons:expo", class: "text-white" }),
    name: "Expo",
  },
];

// Miscellaneous
const miscellaneousStack: Stack[] = [
  {
    icon: h(Icon, { name: "logos:git-icon" }),
    name: "Git Flow",
  },
  {
    icon: h(Icon, {
      name: "game-icons:transparent-tubes",
      class: "text-emerald-500",
    }),
    name: "TDD",
  },
  {
    icon: h(Icon, { name: "logos:jest" }),
    name: "Jest",
  },
  {
    icon: h(Icon, { name: "devicon:vitest" }),
    name: "Vitest",
  },

  {
    icon: h(Icon, { name: "devicon:githubactions" }),
    name: "CI/CD",
  },
  {
    icon: h(Icon, { name: "logos:opentelemetry-icon" }),
    name: "Observability",
  },
];

const stacks = [
  {
    name: "backend",
    items: backendStack,
  },
  {
    name: "frontend",
    items: frontendStack,
  },
  {
    name: "mobile",
    items: mobileStack,
  },
  {
    name: "miscellaneous",
    items: miscellaneousStack,
  },
];
</script>

<template>
  <div id="skills" class="w-full flex flex-col items-start">
    <h3 class="text-xl text-center mb-2 mt-12 w-full">
      {{ $t("skills.title") }}
    </h3>
    <p class="text-lg text-center w-full mb-4">
      {{ $t("skills.description") }}.
    </p>

    <div
      class="w-full flex flex-col items-start justify-start mt-4"
      v-for="(stack, index) in stacks"
      :key="index"
    >
      <h3 class="text-lg mb-2">{{ $t(`skills.${stack.name}.title`) }}</h3>

      <ul
        class="w-full flex flex-row flex-wrap items-center justify-start max-sm:grid max-sm:grid-cols-2 gap-4 mt-4"
      >
        <SkillsItem :stack-items="stack.items" />
      </ul>
    </div>
  </div>
</template>
