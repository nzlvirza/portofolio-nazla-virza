<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const education = portfolio.education;

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
    <section id="education" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="05" title="Education" />

            <ol class="max-w-3xl">
                <li
                    v-for="(item, index) in education"
                    :key="item.degree"
                    v-motion="itemReveal(index)"
                    class="timeline-item"
                >
                    <span class="timeline-dot timeline-dot--icon" aria-hidden="true">
                        <AppIcon name="cap" size="2.5" class="text-accent-300" />
                    </span>

                    <p class="eyebrow text-xs">{{ item.period }}</p>

                    <h3 class="mt-2 text-lg font-semibold text-white">{{ item.degree }}</h3>

                    <p class="mt-1 text-sm font-medium text-accent-300">{{ item.school }}</p>

                    <p v-if="item.description" class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                        {{ item.description }}
                    </p>
                </li>
            </ol>
        </div>
    </section>
</template>