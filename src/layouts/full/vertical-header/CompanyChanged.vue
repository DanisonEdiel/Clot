<script setup lang="ts">
import { userStore } from '@/stores/useStore';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VSelect } from 'vuetify/lib/components/index.mjs';

const store = userStore();
const selected = ref(store.tenantId);
const router = useRouter();
const route = useRoute();

watch(selected, () => {
    if (selected.value) {
        store.setTenantId(selected.value);
        if (route.name == 'home') {
            window.location.reload();
        } else {
            router.push({ name: 'home' });
        }
    }
});
</script>

<template>
    <div class="tw-flex tw-items-center tw-justify-center tw-gap-2" v-if="store.companies.length > 0">
        <p>Empresa</p>
        <VSelect :items="store.companies" hide-details item-title="owner.name" item-value="id" v-model="selected" />
    </div>
</template>

<style scoped></style>
