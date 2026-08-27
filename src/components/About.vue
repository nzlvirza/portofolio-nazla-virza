<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const about = portfolio.about;

const paragraphReveal = (index) => ({
    initial: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 90, ease: [0.22, 1, 0.36, 1] },
    },
});
</script>

<template>
    <section id="about" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="01" title="About Me" />

            <div class="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
                <div>
                    <p
                        v-for="(paragraph, index) in about.paragraphs"
                        :key="index"
                        v-motion="paragraphReveal(index)"
                        class="mb-5 leading-relaxed text-slate-400 last:mb-0"
                    >
                        {{ paragraph }}
                    </p>
                </div>

                <aside
                    v-motion
                    :initial="{ opacity: 0, x: 28 }"
                    :visible="{ opacity: 1, x: 0, transition: { duration: 0.7, delay: 150 } }"
                    class="card h-fit p-7"
                >
                    <h3 class="text-sm font-semibold uppercase tracking-widest text-white">Quick Facts</h3>

                    <dl class="mt-6 space-y-5">
                        <div
                            v-for="fact in about.facts"
                            :key="fact.label"
                            class="flex items-start justify-between gap-4 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0"
                        >
                            <dt class="flex items-center gap-2 text-sm text-slate-500">
                                <AppIcon name="chevron-right" size="3.5" class="text-accent-400" />
                                {{ fact.label }}
                            </dt>
                            <dd class="text-right text-sm font-medium text-slate-200">{{ fact.value }}</dd>
                        </div>
                    </dl>

                    <span
                        class="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.06] px-3 py-1.5 text-xs font-medium text-emerald-300"
                    >
                        <span class="relative flex size-2">
                            <span class="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none"></span>
                            <span class="relative inline-flex size-2 rounded-full bg-emerald-400"></span>
                        </span>
                        {{ portfolio.availability }}
                    </span>
                </aside>
            </div>
        </div>
    </section>
</template>