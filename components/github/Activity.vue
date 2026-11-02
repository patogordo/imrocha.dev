<script lang="ts" setup>
type Day = { date: string; count: number; level: number };

const githubUser = "patogordo";
const { locale } = useI18n();

// Public proxy of GitHub's contribution calendar, CORS enabled. If it fails the section stays hidden.
const { data } = useFetch<{ total: { lastYear: number }; contributions: Day[] }>(
  `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`,
  { server: false, lazy: true },
);

// Pad the first column so weeks start on Sunday, like on GitHub
const days = computed<(Day | null)[]>(() => {
  const list = data.value?.contributions ?? [];
  if (!list.length) return [];
  const pad = new Date(`${list[0].date}T00:00:00Z`).getUTCDay();
  return [...Array(pad).fill(null), ...list];
});

const levelClasses = [
  "bg-base-100",
  "bg-primary-900",
  "bg-primary-700",
  "bg-primary-500",
  "bg-primary-300",
];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString(locale.value, {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// On small screens show the most recent weeks first
const scroller = ref<HTMLElement>();
watch(days, async () => {
  await nextTick();
  scroller.value?.scrollTo({ left: scroller.value.scrollWidth });
});
</script>

<template>
  <section
    v-if="days.length"
    id="github-activity"
    class="w-full flex flex-col items-center"
  >
    <h3 class="text-xl text-center mb-2 mt-12">
      {{ $t("github-activity.title") }}
    </h3>

    <p class="text-lg text-center">
      {{
        $t("github-activity.description", {
          total: data?.total.lastYear.toLocaleString(locale),
        })
      }}
    </p>

    <div
      class="w-full max-w-fit mt-8 p-4 bg-base-300 border-2 border-base-100 rounded-lg"
    >
      <div ref="scroller" class="overflow-x-auto pb-2">
        <ol
          class="grid grid-rows-7 grid-flow-col gap-[3px] w-max"
          :aria-label="$t('github-activity.title')"
        >
          <li
            v-for="(day, index) in days"
            :key="day?.date ?? `pad-${index}`"
            class="w-[11px] h-[11px] rounded-sm"
            :class="day ? levelClasses[day.level] : 'invisible'"
            :title="
              day
                ? $t(
                    'github-activity.tooltip',
                    { count: day.count, date: formatDate(day.date) },
                    day.count,
                  )
                : undefined
            "
          />
        </ol>
      </div>

      <div
        class="flex flex-wrap items-center justify-between gap-4 mt-2 text-sm"
      >
        <a
          class="flex items-center gap-2"
          :href="`https://github.com/${githubUser}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="ri:github-fill" size="20" />
          <span class="underline underline-offset-2">
            {{ $t("github-activity.see-profile") }}
          </span>
        </a>

        <div class="flex items-center gap-1" aria-hidden="true">
          <span class="mr-1">{{ $t("github-activity.less") }}</span>
          <span
            v-for="levelClass in levelClasses"
            :key="levelClass"
            class="w-[11px] h-[11px] rounded-sm"
            :class="levelClass"
          />
          <span class="ml-1">{{ $t("github-activity.more") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
