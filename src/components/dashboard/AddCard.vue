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
            <h1 class="text-h5 tw-text-center">¿Conoces nuestro plan ilimitado?</h1>
            <p class="my-3 text-15 text-muted">
                Sabemos que cada vez creces más y más y eso nos alegra tanto, por eso te entregamos nuestra solución sin Límites, si como lo
                acabas de leer, sin límites, diseñado y preparado para personas como tú
            </p>
            <div class="mt-4 d-flex justify-content-start">
                <div class="ml-2 d-flex">
                    <span
                        size="40"
                        class="ml-n2 avtar-border text-warning font-weight-medium tw-cursor-pointer"
                        @click="router.push({ name: 'my-subscription' })"
                        color="lightprimary"
                    >
                        >>Obtener oferta
                    </span>
                </div>
            </div>
        </v-card-item>
    </v-card>
</template>
