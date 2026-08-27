<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { portfolio } from '../data/portfolio';
import AppIcon from './AppIcon.vue';

const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
];

const header = ref(null);
const isScrolled = ref(false);
const isOpen = ref(false);
const activeId = ref('home');

let observer = null;

const onScroll = () => {
    isScrolled.value = window.scrollY > 20;
    if (window.scrollY < 80) {
        activeId.value = 'home';
    } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        activeId.value = 'contact';
    }
};

const onResize = () => {
    if (window.innerWidth >= 1024 && isOpen.value) isOpen.value = false;
    onScroll();
};

const onDocumentClick = (event) => {
    if (isOpen.value && header.value && !header.value.contains(event.target)) {
        isOpen.value = false;
    }
};

const onKeydown = (event) => {
    if (event.key === 'Escape' && isOpen.value) isOpen.value = false;
};

const closeMenu = () => {
    isOpen.value = false;
};

const scrollToSection = (event, href) => {
    event.preventDefault();
    const targetId = href.replace('#', '');
    activeId.value = targetId;
    closeMenu();

    if (targetId === 'home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        history.pushState(null, '', '#home');
        return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });

        history.pushState(null, '', href);
    }
};

onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeydown);

    if ('IntersectionObserver' in window) {
        const sections = links
            .map((link) => document.querySelector(link.href))
            .filter(Boolean);

        observer = new IntersectionObserver(
            (entries) => {
                if (window.scrollY < 80) {
                    activeId.value = 'home';
                    return;
                }
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        activeId.value = entry.target.id;
                    }
                });
            },
            { rootMargin: '-30% 0px -50% 0px' },
        );

        sections.forEach((section) => observer.observe(section));
    }
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKeydown);
    if (observer) observer.disconnect();
});
</script>

<template>
    <header
        ref="header"
        :class="['site-nav', { 'is-scrolled': isScrolled, 'menu-open': isOpen }]"
    >
        <div class="container-site">
            <div class="nav-inner">
                <!-- Brand / Logo -->
                <a
                    href="#home"
                    class="text-lg font-bold tracking-tight text-white transition-colors duration-300 hover:text-white"
                    @click="scrollToSection($event, '#home')"
                >
                    {{ portfolio.name }}<span class="text-accent-400">.</span>
                </a>

                <!-- Desktop Navigation Links -->
                <nav class="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main navigation">
                    <a
                        v-for="link in links"
                        :key="link.label"
                        :href="link.href"
                        :class="['nav-link', { 'is-active': activeId === link.href.slice(1) }]"
                        @click="scrollToSection($event, link.href)"
                    >
                        {{ link.label }}
                    </a>

                    <!-- Divider -->
                    <span class="h-4 w-px bg-white/15" aria-hidden="true"></span>

                    <!-- Resume Button -->
                    <a
                        :href="portfolio.cvUrl"
                        download="Nazla-Virza-Rahman-CV.pdf"
                        class="rounded-full border border-accent-400/40 bg-accent-500/10 px-4 py-1.5 text-sm font-medium text-accent-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-400 hover:bg-accent-500/20 hover:text-white hover:shadow-glow"
                    >
                        Resume
                    </a>
                </nav>

                <!-- Mobile Menu Toggle Button -->
                <button
                    type="button"
                    aria-label="Toggle navigation"
                    :aria-expanded="isOpen"
                    aria-controls="mobile-menu"
                    class="grid size-10 cursor-pointer place-items-center rounded-lg border border-white/10 text-slate-300 transition-colors duration-300 hover:border-accent-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/60 lg:hidden"
                    @click="isOpen = !isOpen"
                >
                    <span class="flex flex-col gap-[5px]">
                        <span class="bar bar-1"></span>
                        <span class="bar bar-2"></span>
                        <span class="bar bar-3"></span>
                    </span>
                </button>
            </div>
        </div>

        <!-- Mobile Dropdown Menu -->
        <div id="mobile-menu" class="mobile-menu">
            <div class="container-site py-6">
                <ul class="flex flex-col gap-1">
                    <li v-for="link in links" :key="link.label">
                        <a
                            :href="link.href"
                            :class="[
                                'block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-300',
                                activeId === link.href.slice(1)
                                    ? 'bg-accent-500/15 font-semibold text-white'
                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            ]"
                            @click="scrollToSection($event, link.href)"
                        >
                            {{ link.label }}
                        </a>
                    </li>
                    <li class="mt-3 border-t border-white/[0.06] px-2 pt-4">
                        <a
                            :href="portfolio.cvUrl"
                            download="Nazla-Virza-Rahman-CV.pdf"
                            class="btn btn-secondary w-full"
                            @click="closeMenu"
                        >
                            <AppIcon name="download" size="4" />
                            Download CV / Resume
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>