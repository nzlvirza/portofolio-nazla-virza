<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const { portfolioData, currentLang } = useLanguage();
const selectedCert = ref(null);
const currentImageIndex = ref(0);

const hasImages = (cert) => {
    if (!cert) return false;
    if (Array.isArray(cert.images)) {
        return cert.images.some(img => typeof img === 'string' && img.trim() !== '' && img !== 'Belum Tersedia');
    }
    if (typeof cert.image === 'string') {
        return cert.image.trim() !== '' && cert.image !== 'Belum Tersedia';
    }
    return false;
};

const activeImages = computed(() => {
    if (!selectedCert.value) return [];
    let list = [];
    if (Array.isArray(selectedCert.value.images)) {
        list = selectedCert.value.images;
    } else if (selectedCert.value.image) {
        list = [selectedCert.value.image];
    }
    return list.filter(img => typeof img === 'string' && img.trim() !== '' && img !== 'Belum Tersedia');
});

const currentImage = computed(() => {
    return activeImages.value[currentImageIndex.value] || '';
});

const cardReveal = (index) => ({
    initial: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: index * 90, ease: [0.22, 1, 0.36, 1] },
    },
});

const openModal = (cert) => {
    if (!hasImages(cert)) return;
    selectedCert.value = cert;
    currentImageIndex.value = 0;
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
    }
};

const closeModal = () => {
    selectedCert.value = null;
    currentImageIndex.value = 0;
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
};

const nextImage = () => {
    if (activeImages.value.length > 1) {
        currentImageIndex.value = (currentImageIndex.value + 1) % activeImages.value.length;
    }
};

const prevImage = () => {
    if (activeImages.value.length > 1) {
        currentImageIndex.value = (currentImageIndex.value - 1 + activeImages.value.length) % activeImages.value.length;
    }
};

const handleKeydown = (e) => {
    if (!selectedCert.value) return;
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
    }
});
</script>

<template>
    <section v-if="portfolioData.certifications && portfolioData.certifications.length" id="certifications" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="06" :title="portfolioData.sections.certificationsTitle" />

            <div class="grid gap-6 md:grid-cols-2">
                <div
                    v-for="(cert, index) in portfolioData.certifications"
                    :key="cert.name"
                    v-motion="cardReveal(index)"
                    class="card card-hover group flex flex-col justify-between p-7"
                >
                    <div>
                        <div
                            class="mb-5 grid size-12 place-items-center rounded-xl border border-accent-400/20 bg-accent-500/10 text-accent-300 transition-all duration-300 group-hover:border-accent-400/50 group-hover:shadow-glow"
                        >
                            <AppIcon name="award" size="6" />
                        </div>

                        <h3 class="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-accent-200">
                            {{ cert.name }}
                        </h3>

                        <p v-if="cert.issuer" class="mt-2 text-sm text-slate-400">{{ cert.issuer }}</p>
                    </div>

                    <div class="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                        <button
                            v-if="hasImages(cert)"
                            type="button"
                            @click="openModal(cert)"
                            class="btn-secondary inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-accent-300 hover:text-white transition-all duration-300 rounded-xl"
                        >
                            <AppIcon name="eye" size="4" />
                            <span>{{ portfolioData.viewCertificateBtn || (currentLang === 'en' ? 'View Certificate' : 'Lihat Sertifikat') }}</span>
                        </button>

                        <div
                            v-else
                            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs font-medium text-amber-400 select-none"
                        >
                            <AppIcon name="clock" size="3.5" />
                            <span>{{ portfolioData.certificateNotPublished || (currentLang === 'en' ? 'Certificate Not Published Yet' : 'Sertifikat Belum di Publish') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Certificate Modal Lightbox Slider -->
        <Teleport to="body">
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
                <div
                    v-if="selectedCert && activeImages.length > 0"
                    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-night-950/85 backdrop-blur-md"
                    @click.self="closeModal"
                    role="dialog"
                    aria-modal="true"
                    :aria-label="selectedCert.name"
                >
                    <div class="relative flex flex-col w-full max-w-4xl rounded-2xl border border-white/10 bg-night-900 shadow-2xl overflow-hidden max-h-[92vh]">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between border-b border-white/[0.08] px-5 sm:px-6 py-4 bg-night-950/60 shrink-0">
                            <div class="flex items-center gap-3 min-w-0">
                                <div class="grid size-9 shrink-0 place-items-center rounded-lg border border-accent-400/20 bg-accent-500/10 text-accent-300">
                                    <AppIcon name="award" size="5" />
                                </div>
                                <div class="truncate">
                                    <h4 class="text-base sm:text-lg font-semibold text-white leading-tight truncate">
                                        {{ selectedCert.name }}
                                    </h4>
                                    <p class="text-xs text-slate-400 font-mono truncate">{{ selectedCert.issuer }}</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                @click="closeModal"
                                class="icon-btn size-9 shrink-0 hover:bg-accent-500/20 hover:text-white"
                                aria-label="Tutup sertifikat"
                            >
                                <AppIcon name="x" size="5" />
                            </button>
                        </div>

                        <!-- Modal Body (Image Slider Container) -->
                        <div class="relative flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-night-950/50 min-h-[300px]">
                            <!-- Left Arrow Button -->
                            <button
                                v-if="activeImages.length > 1"
                                type="button"
                                @click.stop="prevImage"
                                class="absolute left-3 sm:left-6 z-20 grid size-10 sm:size-12 place-items-center rounded-full border border-white/20 bg-night-950/80 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 hover:border-accent-400/60 hover:bg-accent-500/30 hover:shadow-glow focus-visible:outline-none"
                                aria-label="Gambar Sebelumnya"
                            >
                                <AppIcon name="chevron-left" size="6" />
                            </button>

                            <!-- Center Certificate Image -->
                            <div class="relative flex flex-col items-center justify-center size-full">
                                <Transition
                                    mode="out-in"
                                    enter-active-class="transition duration-200 ease-out"
                                    enter-from-class="opacity-0 scale-98"
                                    enter-to-class="opacity-100 scale-100"
                                    leave-active-class="transition duration-150 ease-in"
                                    leave-from-class="opacity-100 scale-100"
                                    leave-to-class="opacity-0 scale-98"
                                >
                                    <img
                                        :key="currentImage"
                                        :src="currentImage"
                                        :alt="`Sertifikat ${selectedCert.name} (Halaman ${currentImageIndex + 1})`"
                                        class="max-h-[68vh] w-auto max-w-full rounded-lg object-contain shadow-2xl border border-white/10 transition-all duration-300"
                                    />
                                </Transition>

                                <!-- Page Indicator Dots (if multiple images) -->
                                <div v-if="activeImages.length > 1" class="mt-4 flex items-center gap-2">
                                    <button
                                        v-for="(_, idx) in activeImages"
                                        :key="idx"
                                        type="button"
                                        @click="currentImageIndex = idx"
                                        :class="[
                                            'size-2.5 rounded-full transition-all duration-300',
                                            idx === currentImageIndex
                                                ? 'bg-accent-400 w-7 shadow-glow'
                                                : 'bg-white/20 hover:bg-white/50'
                                        ]"
                                        :aria-label="`Pergi ke gambar ${idx + 1}`"
                                    ></button>
                                </div>
                            </div>

                            <!-- Right Arrow Button -->
                            <button
                                v-if="activeImages.length > 1"
                                type="button"
                                @click.stop="nextImage"
                                class="absolute right-3 sm:right-6 z-20 grid size-10 sm:size-12 place-items-center rounded-full border border-white/20 bg-night-950/80 text-white backdrop-blur-md shadow-2xl transition-all duration-300 hover:scale-110 hover:border-accent-400/60 hover:bg-accent-500/30 hover:shadow-glow focus-visible:outline-none"
                                aria-label="Gambar Selanjutnya"
                            >
                                <AppIcon name="chevron-right" size="6" />
                            </button>
                        </div>

                        <!-- Modal Footer -->
                        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/[0.08] px-4 sm:px-6 py-3 bg-night-950/80 text-xs shrink-0">
                            <div class="flex items-center justify-between sm:justify-start gap-2 text-slate-400 min-w-0">
                                <span class="truncate font-medium text-slate-300">
                                    BNSP <span class="hidden sm:inline text-slate-400 font-normal">(Badan Nasional Sertifikasi Profesi)</span>
                                </span>
                                <span
                                    v-if="activeImages.length > 1"
                                    class="inline-flex items-center shrink-0 rounded-full border border-accent-400/30 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-accent-300 whitespace-nowrap"
                                >
                                    {{ currentImageIndex + 1 }} / {{ activeImages.length }}
                                </span>
                            </div>
                            <a
                                :href="currentImage"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="btn-secondary shrink-0 whitespace-nowrap inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 text-xs text-slate-300 hover:text-accent-300"
                            >
                                <span>{{ currentLang === 'en' ? 'Open Original Image' : 'Buka Gambar Asli' }}</span>
                                <AppIcon name="external" size="3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </Transition>
        </Teleport>
    </section>
</template>