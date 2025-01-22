<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
const showSnackbar = ref(false);
const close = () => {
    showSnackbar.value = false;

};

setTimeout(() => {
    showSnackbar.value = true;
}, 1500);
</script>

<template>
    <v-snackbar rounded="md" color="secondary" class="mt-n3" v-model="showSnackbar" location="top right" elevation="0">
        <div class="gap-2 d-flex">
            <Icon icon="mdi:hand-wave" height="22" />
            <div class="">
                <h5 class="text-body-1">Bienvenido a Tygor</h5>
                <p class="text-12">Descarga tus facturas electrónicas cómodamente.</p>
            </div>
        </div>
        <template v-slot:actions>
            <v-btn variant="text" @click="showSnackbar = false">
                <XIcon />
            </v-btn>
        </template>
    </v-snackbar>
</template>
