<script setup>
import { ref } from 'vue';
import { portfolio } from '../data/portfolio';
import SectionHeading from './SectionHeading.vue';
import AppIcon from './AppIcon.vue';

const copied = ref(false);
const formSubmitted = ref(false);
let copyTimer = null;

const copyEmail = async () => {
    try {
        await navigator.clipboard.writeText(portfolio.email);
    } catch {
        const helper = document.createElement('textarea');
        helper.value = portfolio.email;
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

const onSubmit = (event) => {
    event.preventDefault();
    formSubmitted.value = true;
    event.target.reset();
};
</script>

<template>
    <section id="contact" class="relative scroll-mt-20 py-24 sm:py-28">
        <div class="container-site">
            <SectionHeading number="07" title="Get In Touch" />

            <div class="grid gap-14 lg:grid-cols-2 lg:gap-20">
                <div v-motion :initial="{ opacity: 0, x: -28 }" :visible="{ opacity: 1, x: 0 }">
                    <p class="max-w-md text-base leading-relaxed text-slate-400">
                        My inbox is always open — whether you have a project idea, a job opportunity,
                        or just want to say hi. I will do my best to get back to you as soon as possible.
                    </p>

                    <div class="mt-10">
                        <p class="text-xs font-semibold uppercase tracking-widest text-slate-500">Email me at</p>
                        <div class="mt-3 flex flex-wrap items-center gap-4">
                            <a
                                :href="`mailto:${portfolio.email}`"
                                class="break-all text-xl font-semibold text-white transition-colors duration-300 hover:text-accent-300 sm:text-2xl"
                            >
                                {{ portfolio.email }}
                            </a>
                            <button
                                type="button"
                                :aria-label="copied ? 'Copied!' : 'Copy email address'"
                                :title="copied ? 'Copied to clipboard!' : 'Copy email'"
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
                                v-for="social in portfolio.socials"
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
                        {{ portfolio.location }} · {{ portfolio.availability }}
                    </p>
                </div>

                <form
                    v-motion
                    :initial="{ opacity: 0, x: 28 }"
                    :visible="{ opacity: 1, x: 0 }"
                    action="#"
                    method="POST"
                    class="card p-7 sm:p-9"
                    @submit="onSubmit"
                >
                    <div class="space-y-6">
                        <div>
                            <label for="contact-name" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                Name
                            </label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                required
                                autocomplete="name"
                                placeholder="Your name"
                                class="input-field"
                            />
                        </div>

                        <div>
                            <label for="contact-email" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                Email
                            </label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                required
                                autocomplete="email"
                                placeholder="you@example.com"
                                class="input-field"
                            />
                        </div>

                        <div>
                            <label for="contact-message" class="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows="5"
                                required
                                placeholder="Tell me about your project..."
                                class="input-field resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary group mt-8 w-full sm:w-auto">
                        Send Message
                        <AppIcon name="send" class="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <p class="mt-5 text-xs leading-relaxed text-slate-600">
                        This form is a UI preview — backend delivery is coming soon. Meanwhile, reach me directly via email.
                    </p>

                    <p
                        v-show="formSubmitted"
                        role="status"
                        class="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-4 py-3 text-sm text-emerald-300"
                    >
                        Thanks! Your message draft has been noted locally — please also send it via email.
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>