<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const certifications = portfolio.certifications;

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
    <section v-if="certifications && certifications.length" id="certifications" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="06" title="Certifications" />

            <div class="grid gap-6 md:grid-cols-2">
                <div
                    v-for="(cert, index) in certifications"
                    :key="cert.name"
                    v-motion="cardReveal(index)"
                    class="card card-hover group p-7"
                >
                    <div
                        class="mb-5 grid size-12 place-items-center rounded-xl border border-accent-400/20 bg-accent-500/10 text-accent-300 transition-all duration-300 group-hover:border-accent-400/50 group-hover:shadow-glow"
                    >
                        <AppIcon name="award" size="6" />
                    </div>

                    <h3 class="text-lg font-semibold text-white">{{ cert.name }}</h3>

                    <p v-if="cert.issuer" class="mt-2 text-sm text-slate-500">{{ cert.issuer }}</p>
                </div>
            </div>
        </div>
    </section>
</template>