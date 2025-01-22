<script setup lang="ts">
import { userStore } from '@/stores/useStore';
import { useRouter } from 'vue-router';

const store = userStore();
const router = useRouter();
const onLogout = () => {
    store.logout();
    router.push({ name: 'Side Login' });
};
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu open-on-hover open-on-click>
        <template v-slot:activator="{ props }">
            <v-btn variant="text" class="custom-hover-primary" color="primary" v-bind="props" icon>
                <v-avatar size="35" :image="store.user.profile_photo_url" />
            </v-btn>
        </template>
        <v-sheet rounded="md" width="280" elevation="10">
            <div class="pa-6">
                <div class="pb-6 d-flex align-center">
                    <v-avatar size="55" :image="store.user.profile_photo_url" />
                    <div class="ml-3">
                        <h6 class="text-subtitle-1 mb-n1">{{ store.user.name }}</h6>
                        <span class="text-subtitle-1 text-textSecondary">{{ store.user.email }}</span>
                    </div>
                </div>
                <v-divider></v-divider>
                <perfect-scrollbar>
                    <v-list class="py-0 mt-3 theme-list" lines="one">
                        <v-list-item class="px-2 py-0 rounded-md custom-text-primary" color="primary" :to="{ name: 'my-account' }">
                            <div class="gap-3 d-flex align-center">
                                <p class="text-subtitle-1 heading custom-title">Mi cuenta</p>
                                <!-- <v-chip size="small" color="error" v-if="item.badge">4</v-chip> -->
                            </div>
                        </v-list-item>
                        <v-list-item class="px-2 py-0 rounded-md custom-text-primary" color="primary" @click="onLogout">
                            <div class="gap-3 d-flex align-center">
                                <p class="text-subtitle-1 heading custom-title">Cerrar sesión</p>
                                <!-- <v-chip size="small" color="error" v-if="item.badge">4</v-chip> -->
                            </div>
                        </v-list-item>
                    </v-list>
                </perfect-scrollbar>
            </div>
        </v-sheet>
    </v-menu>
</template>
