<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie';
import workAnimation from '@/animations/workinSriAnimation.json';

</script>

<template>
    <VCard>
        <div class="tw-flex tw-flex-col md:tw-flex-row">
            <Vue3Lottie :animationData="workAnimation" :height="300" class="tw-md:block tw-mx-auto"
                style="max-width: 300px;" />
            <div class="border tw-p-10 tw-flex tw-items-center tw-justify-center text-h5"
                style="border: solid; flex: 1;">
                <p>¡Hey! Estamos trabajando por ti, nos estamos conectando con nuestros servidores para descargar
                    <strong>tus comprobantes</strong> del SRI.
                </p>
            </div>
        </div>
    </VCard>
</template>

<style scoped></style>
