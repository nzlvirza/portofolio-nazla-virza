<script setup>
import { computed, useAttrs } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String, Number],
        default: '5',
    },
});

const attrs = useAttrs();

const sizeMap = {
    '2.5': 'size-2.5',
    '3.5': 'size-3.5',
    '4': 'size-4',
    '5': 'size-5',
    '6': 'size-6',
    '[18px]': 'size-[18px]',
};

const iconClass = computed(() => {
    const inherited = String(attrs.class ?? '');
    const explicit = inherited.split(/\s+/).find((token) => /^size-/.test(token));
    return explicit ?? sizeMap[String(props.size)] ?? 'size-5';
});
</script>

<template>
    <span :class="iconClass" aria-hidden="true">
        <svg
            v-if="name === 'github'"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-full"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.05.78 2.13v3.16c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>

        <svg
            v-else-if="name === 'linkedin'"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-full"
        >
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.54V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
        </svg>

        <svg
            v-else-if="name === 'instagram'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <rect x="2.5" y="2.5" width="19" height="19" rx="5"></rect>
            <circle cx="12" cy="12" r="4.2"></circle>
            <circle cx="17.6" cy="6.4" r="0.6" fill="currentColor" stroke="none"></circle>
        </svg>

        <svg
            v-else-if="name === 'mail'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"></rect>
            <path d="m3.5 6.5 8.5 6 8.5-6"></path>
        </svg>

        <svg
            v-else-if="name === 'download'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M12 3.5v11"></path>
            <path d="m7 10.5 5 5 5-5"></path>
            <path d="M4.5 19.5h15"></path>
        </svg>

        <svg
            v-else-if="name === 'external'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M14 4.5h5.5V10"></path>
            <path d="M19.5 4.5 11 13"></path>
            <path d="M19.5 14v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V6A1.5 1.5 0 0 1 6 4.5h4"></path>
        </svg>

        <svg
            v-else-if="name === 'arrow-right'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M4 12h16"></path>
            <path d="m13 5 7 7-7 7"></path>
        </svg>

        <svg
            v-else-if="name === 'arrow-up'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M12 20V4"></path>
            <path d="m5 11 7-7 7 7"></path>
        </svg>

        <svg
            v-else-if="name === 'chevron-right'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="m9 5 7 7-7 7"></path>
        </svg>

        <svg
            v-else-if="name === 'chevron-down'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="m5 9 7 7 7-7"></path>
        </svg>

        <svg
            v-else-if="name === 'tools'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M14.7 6.3a4.5 4.5 0 0 0 6 6l-8.4 8.4a2.1 2.1 0 0 1-3-3l8.4-8.4Z"></path>
            <path d="m9.3 9.3-6-6"></path>
            <path d="M3.3 9.3 9.3 3.3"></path>
        </svg>

        <svg
            v-else-if="name === 'cap'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="m2 9 10-5 10 5-10 5L2 9Z"></path>
            <path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"></path>
            <path d="M22 9v5"></path>
        </svg>

        <svg
            v-else-if="name === 'folder'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v8.5A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z"></path>
        </svg>

        <svg
            v-else-if="name === 'copy'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <rect x="9" y="9" width="12" height="12" rx="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>

        <svg
            v-else-if="name === 'check'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="m4.5 12.5 5 5 10-11"></path>
        </svg>

        <svg
            v-else-if="name === 'send'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="m21.5 2.5-10 10"></path>
            <path d="M21.5 2.5 15 21.5l-3.5-8-8-3.5 18-7.5Z"></path>
        </svg>

        <svg
            v-else-if="name === 'smartphone'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <rect x="6.5" y="2.5" width="11" height="19" rx="2"></rect>
            <path d="M10 19h4"></path>
        </svg>

        <svg
            v-else-if="name === 'database'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <ellipse cx="12" cy="5.5" rx="8" ry="3"></ellipse>
            <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"></path>
            <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6"></path>
        </svg>

        <svg
            v-else-if="name === 'palette'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"></circle>
            <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none"></circle>
            <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none"></circle>
            <circle cx="6.5" cy="12" r="1.5" fill="currentColor" stroke="none"></circle>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.75 1.5-1.5 0-.39-.14-.74-.39-1.04-.23-.29-.38-.63-.38-1.01 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-9.94-10-9.94Z"></path>
        </svg>

        <svg
            v-else-if="name === 'shield-check'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path>
            <path d="m9 12 2 2 4-4"></path>
        </svg>

        <svg
            v-else-if="name === 'award'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <circle cx="12" cy="9" r="6"></circle>
            <path d="M9 22h6"></path>
            <path d="M12 15v7"></path>
            <path d="M8.5 12.5 7 22h10l-1.5-9.5"></path>
        </svg>

        <svg
            v-else-if="name === 'pin'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="size-full"
        >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
        </svg>

        <svg v-else viewBox="0 0 24 24" fill="currentColor" class="size-full">
            <circle cx="12" cy="12" r="4"></circle>
        </svg>
    </span>
</template>