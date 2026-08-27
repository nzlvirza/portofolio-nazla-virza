<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const skills = portfolio.skills;

const cardReveal = (index) => ({
    initial: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 90, ease: [0.22, 1, 0.36, 1] },
    },
});
</script>

<template>
    <section id="skills" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="02" title="Skills & Technologies" />

            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div
                    v-for="(group, index) in skills"
                    :key="group.category"
                    v-motion="cardReveal(index)"
                    class="card card-hover group p-8"
                >
                    <div
                        class="mb-6 grid size-12 place-items-center rounded-xl border border-accent-400/20 bg-accent-500/10 text-accent-300 transition-all duration-300 group-hover:border-accent-400/50 group-hover:shadow-glow"
                    >
                        <AppIcon :name="group.icon" size="6" />
                    </div>

                    <h3 class="text-lg font-semibold text-white">{{ group.category }}</h3>
                    <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ group.description }}</p>

                    <ul class="mt-6 flex flex-wrap gap-2">
                        <li v-for="item in group.items" :key="item" class="chip">{{ item }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>