<script setup>
import { ref } from 'vue';
import { useLanguage } from '../composables/useLanguage';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const { portfolioData } = useLanguage();

const copied = ref(false);
let copyTimer = null;

const formData = ref({
    name: '',
    email: '',
    message: ''
});

const isSubmitting = ref(false);
const submitSuccess = ref(false);
const errorMessage = ref('');

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(portfolioData.value.email);
    } catch {
        const helper = document.createElement('textarea');
        helper.value = portfolioData.value.email;
        helper.setAttribute('readonly', '');
        helper.style.position = 'fixed';
        helper.style.opacity = '0';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        helper.remove();
    }

    copied.value = true;
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(() => {
        copied.value = false;
    }, 2000);
};

const onSubmit = async () => {
    if (isSubmitting.value) return;

    isSubmitting.value = true;
    submitSuccess.value = false;
    errorMessage.value = '';

    try {
        const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.value.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.value.name,
                email: formData.value.email,
                message: formData.value.message,
                _subject: `New Portfolio Message from ${formData.value.name}`,
                _template: 'table'
            })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
            submitSuccess.value = true;
            formData.value = { name: '', email: '', message: '' };
        } else {
            throw new Error(data.message || 'Failed to send message. Please try again later.');
        }
    } catch (err) {
        console.error('Contact Form Error:', err);
        errorMessage.value = err.message || 'Network error occurred. Please try sending again or reach out via email directly.';
    } finally {
        isSubmitting.value = false;
    }
};
</script>

<template>
    <section id="contact" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="07" :title="portfolioData.sections.contactTitle" />

            <div class="grid gap-14 lg:grid-cols-2 lg:gap-20">
                <div v-motion :initial="{ opacity: 0, x: -28 }" :visible="{ opacity: 1, x: 0 }">
                    <p class="max-w-md text-base leading-relaxed text-slate-400">
                        {{ portfolioData.contact.description }}
                    </p>

                    <div class="mt-10">
                        <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Email me at</p>
                        <div class="mt-3 flex flex-wrap items-center gap-4">
                            <a
                                :href="`mailto:${portfolioData.email}`"
                                class="break-all text-xl font-semibold text-white transition-colors duration-300 hover:text-accent-300 sm:text-2xl"
                            >
                                {{ portfolioData.email }}
                            </a>
                            <button
                                type="button"
                                :aria-label="copied ? portfolioData.contact.copiedMsg : 'Copy email address'"
                                :title="copied ? portfolioData.contact.copiedMsg : 'Copy email'"
                                :class="[
                                    'icon-btn size-9 cursor-pointer transition-all duration-300',
                                    copied
                                        ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.35)]'
                                        : 'text-slate-400 hover:border-accent-400/50 hover:text-accent-300'
                                ]"
                                @click="copyEmail"
                            >
                                <AppIcon name="copy" size="4" />
                            </button>
                        </div>
                    </div>

                    <div class="mt-10">
                        <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Find me on</p>
                        <div class="mt-4 flex items-center gap-3">
                            <a
                                v-for="social in portfolioData.socials"
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

                    <p class="mt-10 flex items-center gap-2 text-sm text-slate-500">
                        <AppIcon name="pin" size="4" class="text-accent-400" />
                        {{ portfolioData.location }} · {{ portfolioData.availability }}
                    </p>
                </div>

                <form
                    v-motion
                    :initial="{ opacity: 0, x: 28 }"
                    :visible="{ opacity: 1, x: 0 }"
                    class="card p-7 sm:p-9"
                    @submit.prevent="onSubmit"
                >
                    <div class="space-y-6">
                        <div>
                            <label for="contact-name" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {{ portfolioData.contact.nameLabel }}
                            </label>
                            <input
                                id="contact-name"
                                v-model="formData.name"
                                name="name"
                                type="text"
                                required
                                autocomplete="name"
                                :placeholder="portfolioData.contact.namePlaceholder"
                                :disabled="isSubmitting"
                                class="input-field disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label for="contact-email" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {{ portfolioData.contact.emailLabel }}
                            </label>
                            <input
                                id="contact-email"
                                v-model="formData.email"
                                name="email"
                                type="email"
                                required
                                autocomplete="email"
                                :placeholder="portfolioData.contact.emailPlaceholder"
                                :disabled="isSubmitting"
                                class="input-field disabled:opacity-50"
                            />
                        </div>

                        <div>
                            <label for="contact-message" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {{ portfolioData.contact.messageLabel }}
                            </label>
                            <textarea
                                id="contact-message"
                                v-model="formData.message"
                                name="message"
                                rows="5"
                                required
                                :placeholder="portfolioData.contact.messagePlaceholder"
                                :disabled="isSubmitting"
                                class="input-field resize-none disabled:opacity-50"
                            ></textarea>
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="btn btn-primary group mt-8 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        <template v-if="isSubmitting">
                            <svg class="size-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </template>
                        <template v-else>
                            {{ portfolioData.contact.sendBtn }}
                            <AppIcon name="send" class="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </template>
                    </button>

                    <p
                        v-if="submitSuccess"
                        role="status"
                        class="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
                    >
                        Thank you! Your message has been sent successfully.
                    </p>

                    <p
                        v-if="errorMessage"
                        role="alert"
                        class="mt-5 rounded-xl border border-rose-400/25 bg-rose-400/[0.06] px-4 py-3 text-sm text-rose-300"
                    >
                        {{ errorMessage }}
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>