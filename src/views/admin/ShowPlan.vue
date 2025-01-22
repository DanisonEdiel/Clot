<script setup lang="ts">
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import useAdminShowCompany from '@/composables/dashboard/useAdminShowCompany';
import usePlans from '@/composables/plans/usePlans';
import usePlansAdminMutations from '@/composables/plans/usePlansAdminMutations';
import { userStore } from '@/stores/useStore';
import { Icon } from '@iconify/vue';
import { AxiosError } from 'axios';
import { defineComponent, ref, watch } from 'vue';

import { useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { VProgressCircular } from 'vuetify/lib/components/index.mjs';
const { deletePlanMutations, savePlanMutations, updatePlanMutations } = usePlansAdminMutations();
const route = useRoute()
const store = userStore();

const { plans } = usePlans();
const { data, isError, isFetching } = useAdminShowCompany(route.params.id.toString())
const page = ref({ title: 'Detalles del Cliente' });
const selectedPlan = ref()
const selectedVoucher = ref()
const onPlanChange = () => {
    updatePlanMutations.mutate({
        admin_id:store.user.id,
        file:selectedVoucher.value[0],
        plan_id:selectedPlan.value,
        tenant_id:route.params.id.toString()
    })
}
const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/home'
    },
    {
        text: 'Detalles del Cliente',
        disabled: true,
        href: '#'
    }
]);

const rules = [
    (value: File[]) => {
        if (!value || value.length === 0) {
            return true; 
        }
        if (value[0].size < 2000000) {
            return true;
        }
        return 'El tamaño de la imagen no debe sobrepasar los 2 MB!';
    },
];

watch(updatePlanMutations.isError,() => {
    if (updatePlanMutations.isError.value) {
        toast.error('Problemas en la imagen')
    }
})

watch(updatePlanMutations.isSuccess,() => {
    if (updatePlanMutations.isSuccess.value) {
        toast('Cambio exitoso')

        selectedPlan.value = undefined
        selectedVoucher.value = undefined
    }
})

</script>
<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
    <div class="tw-grid tw-place-content-center" v-if="isFetching">
        <VProgressCircular />
    </div>
    <div class="tw-grid tw-place-content-center" v-else-if="isError">
        <p>error wasaaaaaaaaaaaaaaaaaaa</p>
    </div>
    <div v-else>
        <v-row v-if="data">
            <v-col cols="12" md="8">
                <v-card elevation="10" rounded="md">
                    <v-card-item class="pt-4">
                        <h1 class="my-6 text-h1 text-capitalize">{{ data?.owner.name }}</h1>
                        <div class="d-flex align-center justify-space-between">
                            <div>
                                <v-avatar class="" size="18">
                                    <Icon icon="material-symbols:call" size="18" class="text-textPrimary" />
                                </v-avatar>
                                <span class="ml-2 text-subtitle-1 textSecondary" v-text="data?.owner.phone"></span>
                                <v-avatar class="ml-4" size="18">
                                    <Message2Icon size="18" class="text-textPrimary" />
                                </v-avatar>
                                <span class="ml-2 text-subtitle-1 textSecondary" v-text="data?.owner.email"></span>
                            </div>
                        </div>
                    </v-card-item>
                    <v-divider></v-divider>
                    <div class="pa-6">
                        <ol class="mt-3 ml-10">
                            <div
                                class="px-4 py-5 my-3 rounded-md d-flex font-weight-bold bg-grey100 border-s-md border-primary text-h6">
                                <div class="mt-n2" />Plan {{data?.subscription.plan.name}}
                            </div>
                            <div v-for="item in data.ruc" :key="item.id" class="tw-flex tw-gap-4">
                                <p class="text-body-1 textSecondary"><strong>Ruc:</strong> {{ item.ruc }} </p>
                                <p class="text-body-1 textSecondary"><strong>Nombre:</strong> {{ item.name }} </p>
                            </div>
                            <p class="text-body-1 textSecondary"><strong>Ruc:</strong> {{ data.transactions.transactions
                                }} </p>
                            <p class="text-body-1 textSecondary"><strong>Vouchers:</strong> {{
                                data.subscription.vouchers }} </p>
                        </ol>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <VCard elevation="10">
                    <v-toolbar color="secondary tw-rounded-md" class="px-4 text-h4">Cambiar de Plan</v-toolbar>
                    <v-card-text class="text-h4">
                        <p v-if="data?.subscription.price">Plan Seleccionado: {{ }}</p>
                        <p v-else>No hay un plan seleccionado.</p>
                        <VSelect class="mt-4" v-model="selectedPlan" :items="plans" item-title="name" item-value="id"
                            label="Selecciona un Plan" placeholder="Elige un plan"  />
                        <v-file-input :rules="rules" v-model="selectedVoucher" accept="image/png, image/jpeg, image/bmp" label="png, jpeg, bmp"
                            placeholder="Pick an avatar" prepend-icon="mdi-camera"></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer />
                        <VBtn text color="primary" @click="onPlanChange">Guardar</VBtn>
                    </v-card-actions>
                </VCard>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped></style>