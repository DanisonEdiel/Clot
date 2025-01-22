<script setup lang="ts">
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
import Logo from '../full/logo/Logo.vue';
</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100">
            <v-col cols="12" lg="4" xl="4" class="bg-surface tw-h-screen tw-z-10">
                <div class="d-flex justify-center align-center h-100">
                    <div class="tw-px-8 mt-5 auth-card">
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
                class="d-lg-flex d-none align-center justify-center authentication bg-textPrimary position-relative"
            >
                <div class="circle-top"></div>
                <div>
                    <Logo class="circle-bottom" />
                </div>
                <div class="d-flex justify-center align-center w-100 h-n80">
                    <v-row class="justify-center z-index-2">
                        <v-col cols="7" class="tw-mb-12">
                            <h1 class="text-h1">
                                Bienvenido a
                                <br />
                                Tygor Bots
                            </h1>
                            <p class="text-h6 opacity-80 font-weight-regular mt-4">
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
