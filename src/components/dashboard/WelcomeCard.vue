<script setup lang="ts">
import girl from '@/assets/images/usable/girl.png';
import { userStore } from '@/stores/useStore';
import { Icon } from '@iconify/vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const store = userStore();
const { mdAndUp } = useDisplay();

</script>

<template>
    <v-card elevation="10" class="tw-bg-gradient-to-r tw-h-full tw-from-[#009CDE] tw-to-[#0184BB] tw-relative">
        <v-card-item>
            <span
                class="tw-bg-[#35648a] tw-gap-2 tw-text-white tw-text-xs sm:tw-text-sm lg:tw-text-base tw-px-2 tw-py-1 tw-rounded-lg">
                <Icon icon="lucide:circle-check-big" height="18" class="tw-inline" />
                ¡Welcome to Clot 🙌!
            </span>
            <div class="pt-6 mt-7 tw-mr-36">
                <h3 class="mb-2 text-white text-h2">Hello {{ store.user.name }}!</h3>
                <p class="mb-1 text-white opacity-80 text-subtitle-1"></p>
            </div>
            <img :src="girl" v-if="mdAndUp" alt="home"
                class="tw-absolute tw-bottom-0 tw-right-0 tw-h-48 sm:tw-h-48 md:tw-h-52 lg:tw-h-56 xl:tw-h-60" />
        </v-card-item>
    </v-card>
</template>

<style scoped></style>
