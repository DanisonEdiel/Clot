<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const { mdAndUp } = useDisplay();

const router = useRouter();
</script>

<template>
    <v-card elevation="10" class="overflow-hidden">
        <img src="@/assets/images/products/more_plans.jpeg" v-if="mdAndUp" alt="matdash-image" />
        <v-card-item class="pt-6">
            <h1 class="text-h5 tw-text-center">Do you want to manage your products?</h1>
            <p class="my-3 text-15 text-muted">
                Feel free to add your clothes and manage your sales easily and simply
            </p>
            <div class="mt-4 d-flex justify-content-start">
                <div class="ml-2 d-flex">
                    <span
                        size="40"
                        class="ml-n2 avtar-border text-warning font-weight-medium tw-cursor-pointer"
                        @click="router.push({ name: 'my-subscription' })"
                        color="lightprimary"
                    >
                        >>Add Product
                    </span>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>
