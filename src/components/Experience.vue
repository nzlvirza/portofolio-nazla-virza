<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const experience = portfolio.experience;

const itemReveal = (index) => ({
    initial: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 90, ease: [0.22, 1, 0.36, 1] },
    },
});
</script>

<template>
    <section id="experience" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="04" title="Where I've Worked" />

            <ol class="max-w-3xl">
                <li
                    v-for="(item, index) in experience"
                    :key="item.role"
                    v-motion="itemReveal(index)"
                    class="timeline-item"
                >
                    <span class="timeline-dot" aria-hidden="true"></span>

                    <p class="eyebrow text-xs">{{ item.period }}</p>

                    <h3 class="mt-2 text-lg font-semibold text-white">
                        {{ item.role }}
                        <span class="text-slate-600">·</span>
                        <span class="text-accent-300">{{ item.company }}</span>
                    </h3>

                    <p class="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                        <AppIcon name="pin" size="3.5" />
                        {{ item.location }}
                    </p>

                    <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                        {{ item.description }}
                    </p>

                    <ul v-if="item.points && item.points.length" class="mt-4 max-w-2xl space-y-2.5">
                        <li v-for="point in item.points" :key="point" class="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                            <AppIcon name="chevron-right" size="3.5" class="mt-0.5 shrink-0 text-accent-400" />
                            {{ point }}
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    </section>
</template>