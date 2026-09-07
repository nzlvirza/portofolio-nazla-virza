<script setup>
import { useLanguage } from '../composables/useLanguage';
import AppIcon from './AppIcon.vue';

const { portfolioData } = useLanguage();
const year = new Date().getFullYear();

const scrollToTop = (event) => {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
    history.pushState(null, '', '#home');
};
</script>

<template>
    <footer class="border-t border-white/[0.06] py-10">
        <div class="container-site flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div class="text-center sm:text-left">
                <a
                    href="#home"
                    class="font-bold tracking-tight text-white transition-colors duration-300 hover:text-accent-300"
                    @click="scrollToTop"
                >
                    {{ portfolioData.name }}<span class="text-accent-400">.</span>
                </a>
                <p class="mt-1 text-xs text-slate-600">
                    &copy; {{ year }} {{ portfolioData.name }} · {{ portfolioData.footer.rights }}
                </p>
            </div>

            <div class="flex items-center gap-3">
                <a
                    v-for="social in portfolioData.socials"
                    :key="social.label"
                    :href="social.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="social.label"
                    class="icon-btn size-9"
                >
                    <AppIcon :name="social.icon" size="4" />
                </a>

                <span class="mx-1 hidden h-5 w-px bg-white/10 sm:block" aria-hidden="true"></span>

                <a href="#home" aria-label="Back to top" class="icon-btn size-9" @click="scrollToTop">
                    <AppIcon name="arrow-up" size="4" />
                </a>
            </div>
        </div>
    </footer>
</template>