<script setup>
import { ref } from 'vue';
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const projects = portfolio.projects;
const failedLogos = ref({});

const projectReveal = (index) => ({
    initial: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 90, ease: [0.22, 1, 0.36, 1] },
    },
});

const placeholderCode = (title) =>
    `// ${title.toLowerCase().replace(/ /g, '_')}`;
</script>

<template>
    <section id="projects" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="03" title="Featured Projects" />

            <div class="grid gap-7 md:grid-cols-2">
                <article
                    v-for="(project, index) in projects"
                    :key="project.title"
                    v-motion="projectReveal(index)"
                    class="card card-hover group/card flex flex-col overflow-hidden"
                >
                    <figure class="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-night-900/90">
                        <!-- Full Banner / Screenshot View (if project.image is set and no specific logo) -->
                        <img
                            v-if="project.image && !project.logo"
                            :src="project.image"
                            :alt="`Preview of the ${project.title} project`"
                            loading="lazy"
                            class="size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />

                        <!-- App Logo Showcase / Wadah Logo Aplikasi Container -->
                        <div
                            v-else
                            class="project-ph relative size-full flex flex-col items-center justify-center p-6 transition-transform duration-500 group-hover/card:scale-[1.02]"
                        >
                            <!-- Ambient Background Lighting -->
                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-accent-600/10" aria-hidden="true"></div>
                            <div class="pointer-events-none absolute size-44 rounded-full bg-accent-500/15 blur-2xl opacity-70 transition-opacity duration-500 group-hover/card:opacity-100" aria-hidden="true"></div>

                            <!-- App Logo Slot / Wadah Logo -->
                            <div class="relative z-10 flex flex-col items-center gap-3">
                                <div
                                    class="group/logo relative grid size-24 place-items-center overflow-hidden rounded-2xl border border-white/15 bg-night-950/80 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-300 group-hover/card:border-accent-400/60 group-hover/card:shadow-glow sm:size-28 sm:rounded-[22px]"
                                >
                                    <!-- If App Logo is uploaded -->
                                    <img
                                        v-if="project.logo && !failedLogos[project.title]"
                                        :src="project.logo"
                                        :alt="`${project.title} logo`"
                                        class="size-full object-cover transition-transform duration-300 group-hover/card:scale-105"
                                        @error="failedLogos[project.title] = true"
                                    />

                                    <!-- Placeholder state if logo is not yet set or failed to load -->
                                    <div
                                        v-else
                                        class="flex size-full flex-col items-center justify-center gap-1.5 p-3 text-center transition-colors duration-300"
                                    >
                                        <span class="rounded-xl bg-accent-500/10 p-2.5 text-accent-300 transition-all duration-300 group-hover/card:bg-accent-500/20 group-hover/card:text-white group-hover/card:scale-110">
                                            <AppIcon name="smartphone" size="6" />
                                        </span>
                                    </div>

                                    <!-- Corner Shine Effect & Border Overlay -->
                                    <span class="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/15 ring-1 ring-inset ring-white/10" aria-hidden="true"></span>
                                </div>

                                <!-- App Identifier / Code Tag -->
                                <span class="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-night-950/80 px-3 py-1 font-mono text-[11px] text-accent-300/80 backdrop-blur-sm transition-colors duration-300 group-hover/card:border-accent-400/30 group-hover/card:text-accent-200">
                                    <span class="size-1.5 rounded-full bg-accent-400"></span>
                                    {{ project.logo && !failedLogos[project.title] ? 'App Logo' : placeholderCode(project.title) }}
                                </span>
                            </div>
                        </div>

                        <!-- Hover Bottom Glow Accent Line -->
                        <span
                            class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
                            aria-hidden="true"
                        ></span>
                    </figure>

                    <div class="flex grow flex-col p-7">
                        <h3 class="text-xl font-semibold text-white transition-colors duration-300 group-hover/card:text-accent-200">
                            {{ project.title }}
                        </h3>

                        <p class="mt-3 grow text-sm leading-relaxed text-slate-400">
                            {{ project.description }}
                        </p>

                        <ul v-if="project.features && project.features.length" class="mt-4 space-y-2">
                            <li v-for="feature in project.features" :key="feature" class="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                                <AppIcon name="chevron-right" size="3.5" class="mt-0.5 shrink-0 text-accent-400" />
                                {{ feature }}
                            </li>
                        </ul>

                        <ul class="mt-5 flex flex-wrap gap-2">
                            <li v-for="technology in project.technologies" :key="technology" class="tech-chip">{{ technology }}</li>
                        </ul>

                        <footer class="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-5">
                            <div class="flex items-center gap-3">
                                <a
                                    v-if="project.github"
                                    :href="project.github"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :aria-label="`View source code of ${project.title} on GitHub`"
                                    class="icon-btn size-9"
                                >
                                    <AppIcon name="github" size="[18px]" />
                                </a>

                                <a
                                    v-if="project.demo"
                                    :href="project.demo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    :aria-label="`Open live demo of ${project.title}`"
                                    class="icon-btn size-9"
                                >
                                    <AppIcon name="external" size="[18px]" />
                                </a>

                                <span v-if="!project.github && !project.demo" class="font-mono text-xs text-slate-600">Source available on request</span>
                            </div>

                            <a
                                v-if="project.demo"
                                :href="project.demo"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="group/link inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors duration-300 hover:text-accent-300"
                            >
                                Live Demo
                                <AppIcon name="arrow-right" class="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                            </a>
                        </footer>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>