<script lang="ts" setup>
const { locale } = useI18n();

// Kept short on purpose, the full history lives on LinkedIn
const jobs = [
  { role: "cto", company: "AltPay", start: "2025-05" },
  { role: "engineer", company: "B91", start: "2026-03" },
  { role: "developer", company: "B91", start: "2022-08", end: "2025-04" },
  { role: "intern", company: "BlackPay", start: "2022-08", end: "2023-02" },
];

const formatMonth = (month: string) =>
  new Date(`${month}-01T00:00:00Z`).toLocaleDateString(locale.value, {
    timeZone: "UTC",
    month: "short",
    year: "numeric",
  });
</script>

<template>
  <div id="experience" class="w-full flex flex-col items-start justify-start">
    <h3 class="text-xl mb-4 mt-12">{{ $t("experience.title") }}</h3>

    <ol class="w-full border-l-2 border-base-100 ml-1.5">
      <li
        v-for="job in jobs"
        :key="`${job.company}-${job.role}`"
        class="relative pl-6 pb-5 last:pb-0"
      >
        <span
          class="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border-2 border-base-300"
          :class="job.end ? 'bg-base-100' : 'bg-primary-500'"
        />
        <p class="flex flex-wrap items-baseline gap-x-2">
          <span class="font-semibold text-white">{{
            $t(`experience.roles.${job.role}`)
          }}</span>
          <span class="text-secondary-400">{{ job.company }}</span>
        </p>
        <p class="text-sm">
          {{ formatMonth(job.start) }} –
          {{ job.end ? formatMonth(job.end) : $t("experience.present") }}
        </p>
      </li>
    </ol>

    <a
      href="https://www.linkedin.com/in/icaromiguel/"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 mt-6"
    >
      <Icon name="skill-icons:linkedin" size="20" />
      <span class="font-semibold underline underline-offset-2">{{
        $t("experience.see-more")
      }}</span>
      <Icon name="tabler:arrow-up-right" size="18" />
    </a>
  </div>
</template>
