<script setup>
import { ref } from 'vue';
import { portfolio } from '../data/portfolio';
import AppIcon from './AppIcon.vue';

const socials = portfolio.socials;
const imgFailed = ref(false);

const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
});
</script>

<template>
    <section id="home" class="relative flex min-h-svh items-center overflow-hidden pb-20 pt-28">
        <div
            class="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_35%,black,transparent_75%)]"
            aria-hidden="true"
        ></div>

        <div class="container-site relative">
            <div class="grid items-center gap-16 lg:grid-cols-[1.25fr_0.75fr]">
                <div>
                    <p v-motion="reveal(0)" class="eyebrow mb-6 flex items-center gap-3">
                        <span class="h-px w-10 bg-accent-500/70" aria-hidden="true"></span>
                        {{ portfolio.greeting }}
                    </p>

                    <h1 v-motion="reveal(100)" class="text-balance">
                        <span class="block text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {{ portfolio.name }}<span class="text-accent-400">.</span>
                        </span>
                        <span class="mt-4 block text-2xl font-semibold tracking-tight text-accent-300 sm:text-3xl lg:text-4xl">
                            {{ portfolio.role }}
                        </span>
                    </h1>

                    <p v-motion="reveal(200)" class="mt-7 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                        {{ portfolio.bio }}
                    </p>

                    <div v-motion="reveal(300)" class="mt-10 flex flex-wrap items-center gap-4">
                        <a href="#projects" class="btn btn-primary group">
                            View My Projects
                            <AppIcon name="arrow-right" class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        <a :href="portfolio.cvUrl" download="Nazla-Virza-Rahman-CV.pdf" class="btn btn-secondary group">
                            <AppIcon name="download" class="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                            Download CV
                        </a>
                    </div>

                    <div v-motion="reveal(400)" class="mt-12 flex items-center gap-3">
                        <a
                            v-for="social in socials"
                            :key="social.label"
                            :href="social.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            :aria-label="social.label"
                            :title="`${social.label} — ${social.handle}`"
                            class="icon-btn"
                        >
                            <AppIcon :name="social.icon" size="[18px]" />
                        </a>
                    </div>
                </div>

                <div
                    v-motion
                    :initial="{ opacity: 0, scale: 0.9 }"
                    :visible="{ opacity: 1, scale: 1, transition: { duration: 0.8, delay: 200 } }"
                    class="relative hidden justify-self-end lg:block"
                    aria-hidden="true"
                >
                    <div class="absolute -inset-16 rounded-full bg-accent-500/10 blur-3xl"></div>
                    <div class="relative size-80 xl:size-[22rem]">
                        <span class="absolute inset-0 rounded-full border border-white/[0.06]"></span>
                        <span class="absolute inset-10 rounded-full border border-accent-500/15"></span>
                        <span class="animate-spin-slower absolute inset-20 rounded-full border border-dashed border-white/10"></span>
                        <div class="animate-float absolute inset-0 m-auto grid size-44 place-items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] shadow-glow backdrop-blur-md">
                            <img
                                v-if="!imgFailed"
                                :src="`/images/profile.jpg`"
                                alt="Nazla Virza Rahman profile photo"
                                class="size-full object-cover"
                                @error="imgFailed = true"
                            />
                            <span v-else class="text-5xl font-bold text-accent-300">{{ portfolio.initial }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a
            href="#about"
            aria-label="Scroll to about section"
            class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-600 transition-colors duration-300 hover:text-accent-300 md:block"
        >
            <span class="animate-bounce-soft block">
                <AppIcon name="chevron-down" size="6" />
            </span>
        </a>
    </section>
</template>