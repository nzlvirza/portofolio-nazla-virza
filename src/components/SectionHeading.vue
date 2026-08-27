<script setup>
defineProps({
    number: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="mb-14 mt-0" v-motion :initial="{ opacity: 0, y: 28 }" :visible="{ opacity: 1, y: 0 }">
        <div class="flex items-center gap-4">
            <p class="eyebrow">{{ number }}.</p>
            <h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {{ title }}
            </h2>
            <span class="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" aria-hidden="true"></span>
        </div>
    </div>
</template>