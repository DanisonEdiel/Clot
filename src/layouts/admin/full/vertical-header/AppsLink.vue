<script setup lang="ts">
import { Icon } from '@iconify/vue';

const appsLink = [
    {
        avatar: 'arcticons:norton-lifelock-identity',
        color: 'success',
        title: 'Crea tu RUC',
        subtext: '¡Crea una identificación para que puedas descargar tus documentos!',
        to: 'ruc-list'
    },
];
</script>
<template>
    <!-- ---------------------------------------------- -->
    <!-- apps link -->
    <!-- ---------------------------------------------- -->
    <v-row>
        <v-col cols="12" v-for="(item, i) in appsLink" :key="i">
            <router-link :to="{ name: item.to }" class="text-decoration-none custom-text-primary">
                <div class="d-flex align-center">
                    <v-avatar size="45" :color="'primary' + item.color" rounded="md">
                        <Icon icon="arcticons:norton-lifelock-identity" height="40" :class="'text-' + item.color" />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="mb-1 text-subtitle-1 heading custom-title">{{ item.title }}</h6>
                        <p class="text-subtitle-2 textSecondary">{{ item.subtext }}</p>
                    </div>
                </div>
            </router-link>
        </v-col>
    </v-row>
</template>
