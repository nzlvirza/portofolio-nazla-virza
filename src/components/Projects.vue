<script setup>
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const projects = portfolio.projects;

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
                    <figure class="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
                        <img
                            v-if="project.image"
                            :src="project.image"
                            :alt="`Preview of the ${project.title} project`"
                            loading="lazy"
                            class="size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div v-else class="project-ph absolute inset-0 bg-night-900 transition-transform duration-500 group-hover/card:scale-105">
                            <span class="absolute inset-0 bg-gradient-to-br from-accent-600/15 via-transparent to-transparent" aria-hidden="true"></span>
                            <span class="absolute left-6 top-6 text-accent-400/70" aria-hidden="true">
                                <AppIcon name="folder" size="1" />
                            </span>
                            <span
                                class="pointer-events-none absolute inset-0 grid select-none place-items-center font-mono text-7xl font-bold text-white/[0.05]"
                                aria-hidden="true"
                            >
                                {{ project.title.charAt(0).toUpperCase() }}
                            </span>
                            <span class="absolute bottom-5 right-6 font-mono text-xs tracking-widest text-accent-400/50">
                                {{ placeholderCode(project.title) }}
                            </span>
                        </div>
                        <span
                            class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
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