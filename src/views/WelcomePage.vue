<script setup lang="ts">
import Logoimg from '@/assets/images/logos/full-logo.png';
import welcome from '@/assets/images/profile/welcome.png';
import PayphoneCheckout from '@/components/checkout/PayphoneCheckout.vue';
import PlanCard from '@/components/plans/PlanCard.vue';
import useCheckPayment from '@/composables/checkout/useCheckPayment';
import usePlans from '@/composables/plans/usePlans';
import NotificationDD from '@/layouts/full/vertical-header/NotificationDD.vue';
import ProfileDD from '@/layouts/full/vertical-header/ProfileDD.vue';
import ThemeToggler from '@/layouts/full/vertical-header/ThemeToggler.vue';
import { Plans } from '@/models/Plans';
import { checkoutStore } from '@/stores/checkout';
import { useCustomizerStore } from '@/stores/customizer';
import { Icon } from '@iconify/vue';
import { AxiosError } from 'axios';
import { ref, watch } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { toast } from 'vue3-toastify';
import { VApp, VBtn, VCard, VCardActions, VCardItem, VImg } from 'vuetify/lib/components/index.mjs';

const customizer = useCustomizerStore();
const { isError, isFetching, plans } = usePlans();
const { getPaymentDataMutation } = useCheckPayment();
const showDialog = ref(false);
const storeCheckout = checkoutStore();

const onPlanSelecte = (planSelected: Plans) => {
    getPaymentDataMutation.mutate(planSelected);
};
watch(getPaymentDataMutation.isError, () => {
    if (getPaymentDataMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = getPaymentDataMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage);
    }
});
watch(getPaymentDataMutation.isSuccess, () => {
    if (getPaymentDataMutation.isSuccess.value) {
        let response = getPaymentDataMutation.data.value;
        if (response) {
            storeCheckout.setToken(response.token);
            storeCheckout.setProductId(getPaymentDataMutation.variables.value?.id!);
            storeCheckout.setRedirectRouterName('home');
            console.log(storeCheckout.token);
            showDialog.value = true;
        }
    }
});
</script>

<template>
    <v-locale-provider>
        <v-app
            :theme="customizer.actTheme"
            class="bg-containerBg"
            :class="[
                customizer.actTheme,
                customizer.mini_sidebar ? 'mini-sidebar' : '',
                customizer.setHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
                customizer.setBorderCard ? 'cardBordered' : ''
            ]"
        >
            <div :class="customizer.boxed ? 'maxWidth' : 'full-header'">
                <v-app-bar elevation="0" :priority="0" height="70" class="main-head tw-px-7">
                    <div class="logo">
                        <RouterLink to="/">
                            <img :src="Logoimg" alt="home" width="100" />
                        </RouterLink>
                    </div>
                    <v-spacer />

                    <!-- ---------------------------------------------- -->
                    <!-- Mobile Logo -->
                    <!-- ---------------------------------------------- -->

                    <ThemeToggler />
                    <div class="hidden-sm-and-down">
                        <NotificationDD />
                    </div>

                    <!-- ---------------------------------------------- -->
                    <!-- User Profile -->
                    <!-- ---------------------------------------------- -->
                    <div class="hidden-sm-and-down">
                        <ProfileDD />
                    </div>

                    <!----Mobile ----->
                    <v-menu :close-on-content-click="true" class="mobile_popup">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                icon
                                class="hidden-md-and-up custom-hover-primary"
                                color="primary"
                                variant="text"
                                v-bind="props"
                                size="small"
                            >
                                <Icon icon="solar:menu-dots-bold-duotone" height="22" />
                            </v-btn>
                        </template>
                        <v-sheet rounded="lg" elevation="10" class="px-4 py-3 mt-4 dropdown-box">
                            <div class="d-flex justify-space-between align-center">
                                <RightMobileSidebar />
                                <v-btn icon variant="text" class="mr-2 mr-sm-3 custom-hover-primary" to="/ecommerce/checkout" size="small">
                                    <v-badge color="primary" content="0" offset-x="-4" offset-y="-6">
                                        <Icon icon="solar:cart-large-2-outline" height="22" />
                                    </v-badge>
                                </v-btn>
                                <NotificationDD />
                                <ProfileDD />
                            </div>
                        </v-sheet>
                    </v-menu>
                </v-app-bar>
            </div>
            <v-main class="lg:tw-px-24 md:tw-px-16 tw-px-7">
                <div class="mb-3 hr-layout bg-containerBg">
                    <div
                        class="pt-6 h-container bg-background rounded-xl tw-flex tw-flex-wrap tw-overflow-hidden tw-flex-col md:tw-flex-row bg-background tw-gap-4"
                    >
                        <div class="tw-min-w-[300px] tw-h-min md:tw-h-full">
                            <VCard variant="flat" width="300">
                                <VCardItem class="tw-text-center">
                                    <p class="text-primary">Hurra.!</p>
                                    <p class="text-primary tw-font-semibold tw-text-xl tw-mb-4">
                                        Ya tienes tu plan Gratuito de nuestros Bots
                                    </p>
                                    <VImg :src="welcome" />
                                </VCardItem>
                                <VCardActions>
                                    <VBtn variant="elevated" color="primary" :to="{ name: 'home' }"
                                        >Listo, Continuar con el plan gratuito</VBtn
                                    >
                                </VCardActions>
                            </VCard>
                        </div>
                        <div class="tw-flex-1 tw-h-full tw-flex-col tw-flex tw-gap-3 tw-items-center">
                            <h1 class="text-primary tw-text-xl md:tw-text-5xl tw-font-medium">
                                Tu plan Gratuito consta de 100 documentos para descargar
                            </h1>
                            <p class="tw-text-gray-500 tw-text-2xl">¿Necesitas más?, mejora tus procesos con Tygor Bots Premium</p>
                            <PerfectScrollbar class="tw-h-full">
                                <div class="tw-h-32 tw-grid tw-place-content-center" v-if="isFetching">
                                    <VProgressCircular indeterminate />
                                </div>
                                <div class="tw-h-32 tw-grid tw-place-content-center" v-else-if="isError">
                                    <p>Error consultando los planes</p>
                                </div>
                                <div class="tw-flex tw-flex-wrap tw-gap-8" v-else>
                                    <PlanCard
                                        v-for="item in plans"
                                        :plan="item"
                                        @plan-selected="onPlanSelecte"
                                        :is-button-loading="getPaymentDataMutation.isPending.value"
                                    />
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
                <VDialog v-model="showDialog">
                    <PayphoneCheckout :data="getPaymentDataMutation.data.value" />
                </VDialog>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<style scoped>
.h-container {
    height: calc(100vh - 100px);
    padding: 24px;
    @media screen and (max-width: 767px) {
        padding: 20px 10px;
    }
}
</style>
