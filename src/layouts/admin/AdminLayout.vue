<script setup lang="ts">
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
import Logo from '../full/logo/Logo.vue';
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100">
            <v-col cols="12" lg="4" xl="4" class="bg-surface auth">
                <div class="justify-center d-flex align-center h-100">
                    <div class="mt-5 tw-px-8 auth-card">
                        <LogoIcon />
                        <RouterView v-slot="{ Component }">
                            <transition name="slide-fade" mode="out-in">
                                <component :is="Component" />
                            </transition>
                        </RouterView>
                    </div>
                </div>
            </v-col>
            <v-col
                cols="12"
                lg="8"
                xl="8"
                class="justify-center d-lg-flex d-none align-center authentication bg-textPrimary position-relative"
            >
                <div class="circle-top"></div>
                <div>
                    <Logo class="circle-bottom" />
                </div>
                <div class="justify-center d-flex align-center w-100 h-n80">
                    <v-row class="justify-center z-index-2">
                        <v-col cols="7" class="tw-mb-12">
                            <h1 class="text-h1">
                                Bienvenido a
                                <br />
                                Admin Bots
                            </h1>
                            <p class="mt-4 text-h6 opacity-80 font-weight-regular">
                                Somos la solución perfecta para el día a día de tus tareas, nos integramos y mejoramos tu procesos con el
                                respaldo de BBF
                            </p>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
