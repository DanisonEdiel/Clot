<script setup lang="ts">
import { User } from '@/models/User';

interface props {
    user: User;
}

const props = defineProps<props>();
const emit = defineEmits(['user-select']);

const onUserSelected = () => {
    emit('user-select', props.user);
};
</script>

<template>
    <div class="tw-shadow-sm tw-rounded-md tw-overflow-hidden tw-absolute">
        <VBtn @click="onUserSelected" icon="mdi-trash-can" color="error" variant="text" class="tw-absolute" />
        <div
            class="tw-flex tw-shadow-sm tw-flex-col tw-w-full tw-h-full tw-justify-center tw-items-center bg-surface tw-pb-8 tw-pt-3 tw-gap-3 tw-px-4"
        >
            <VAvatar :image="props.user.profile_photo_url" size="80" />
            <div class="">
                <h1 class="text-primary tw-text-lg">Nombre: {{ props.user.name }}</h1>
            </div>
            <div class="">
                <h6 class="text-primary tw-text-lg">Correo: {{ props.user.email }}</h6>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
