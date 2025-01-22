<script setup lang="ts">
import useCheckPayment from '@/composables/checkout/useCheckPayment';
import { checkoutStore } from '@/stores/checkout';
import { useCustomizerStore } from '@/stores/customizer';
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import Logoimg from '@/assets/images/logos/full-logo.png';
import { VBtn, VImg, VProgressCircular } from 'vuetify/lib/components/index.mjs';
import ProfileDD from '@/layouts/full/vertical-header/ProfileDD.vue';
import image from '@/assets/images/products/plan_gold.png';

const { checkPaymentMutation, savePaymentMutation } = useCheckPayment();
const route = useRoute();
const router = useRouter();
const store = checkoutStore();
const isLoading = computed(() => checkPaymentMutation.isPending.value || savePaymentMutation.isPending.value);
onMounted(() => {
    checkPaymentMutation.mutate({ id: route.query.id?.toString() ?? 'a', clientTxId: route.query.clientTransactionId?.toString() ?? 'a' });
});

const customizer = useCustomizerStore();

watch(checkPaymentMutation.isError, () => {
    if (checkPaymentMutation.isError.value) {
    }
});

watch(checkPaymentMutation.isSuccess, () => {
    if (checkPaymentMutation.isSuccess.value) {
        let response = checkPaymentMutation.data.value;
        if (response) {
            if (response.statusCode != 3) {
            }
            savePaymentMutation.mutate({ payment: response, product_id: store.productId });
        }
    }
});

watch(savePaymentMutation.isError, () => {
    if (savePaymentMutation.isError.value) {
    }
});

watch(savePaymentMutation.isSuccess, () => {
    if (savePaymentMutation.isSuccess.value) {
        toast.success('Empresa actualizada');
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
                    <div class="pt-6 page-wrapper bg-background rounded-xl tw-flex tw-flex-col tw-gap-4 tw-justify-center tw-items-center">
                        <div class="page-wrapper tw-grid tw-place-content-center" v-if="isLoading">
                            <VProgressCircular indeterminate />
                        </div>
                        <div class="page-wrapper tw-grid tw-place-content-center" v-else-if="savePaymentMutation.isError.value">
                            <p>
                                no se pudo guardar su pago en nuestra base, si se le desconto el cobro de su cuenta llamanos y actualizamos
                                su plan
                            </p>
                        </div>
                        <div class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-4" v-else>
                            <h1 class="text-primary tw-font-semibold tw-text-2xl">Felicitaciones!, tu compra fue exitosa</h1>
                            <div class="">
                                <VImg :src="image" height="180" width="180" />
                            </div>
                            <h2 class="text-primary tw-text-xl">Acabas de acceder al Sistema que optimiza tus procesos y tiempos.</h2>
                            <p class="tw-text-gray-500">Toca para continuar con la siguiente tarea</p>
                            <VBtn color="primary" :to="{ name: 'home' }">Si, Vamos!</VBtn>
                        </div>
                    </div>
                </div>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<style scoped></style>
