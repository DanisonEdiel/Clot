<script setup lang="ts">
import useAccountUserMutation from '@/composables/users/useAccountUserMutation';
import { userStore } from '@/stores/useStore';
import { ref, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { useDropZone } from '@vueuse/core';
import { AxiosError } from 'axios';

const dropZoneRef = ref();
const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    // specify the types of data to be received.
    dataTypes: ['image/jpeg']
});

function onDrop(files: File[] | null) {
    if (files) {
        console.log(files);
        file.value = files;
        const newFile = file.value;
        if (newFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewUrl.value = e.target?.result as string;
            };
            reader.readAsDataURL(newFile[0]);
        } else {
            previewUrl.value = null;
        }
    }
}

const emit = defineEmits(['avatar-update']);

const { updatePhotoMutation } = useAccountUserMutation();

const file = ref<File[] | null>(null);
const previewUrl = ref<string | null>(null);

const onFileChange = () => {
    const newFile = file.value;
    if (newFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(newFile[0]);
    } else {
        previewUrl.value = null;
    }
};

watch(file, () => {
    if (!file.value) {
        previewUrl.value = null;
    }
});

const onAvatarUpdate = () => {
    if (file.value) {
        updatePhotoMutation.mutate(file.value[0]);
    }
};

watch(updatePhotoMutation.isError, () => {
    if (updatePhotoMutation.isError.value) {
        let errorMessage = 'Error del servidor';
        let error = updatePhotoMutation.error.value as AxiosError<{
            message: string;
        }>;
        if (error.response?.data?.message) {
            errorMessage = JSON.stringify(error.response?.data?.message);
        }
        toast.error(errorMessage, {
            autoClose: 3000,
            closeButton: true
        });
    }
});

watch(updatePhotoMutation.isSuccess, () => {
    if (updatePhotoMutation.isSuccess.value) {
        toast.success('Photo updated 👌', {
            autoClose: 3000,
            closeButton: true
        });
        let response = updatePhotoMutation.data.value;
        if (response) {
            const store = userStore();
            store.setUser(response);
            emit('avatar-update', response.profile_photo_url);
            file.value = null;
        }
    }
});
</script>

<template>
    <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
        <v-card-title class="tw-mb-3 tw-w-full bg-primary"> Update profile photo </v-card-title>
        <v-card-text class="tw-mt-8" v-auto-animate>
            <div class="tw-flex tw-items-center tw-justify-center tw-w-full">
                <label
                    for="dropzone-file"
                    ref="dropZoneRef"
                    class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-h-44 tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-cursor-pointer tw-bg-gray-50 hover:tw-bg-gray-100"
                >
                    <div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-pt-5 tw-pb-6">
                        <svg
                            class="tw-w-8 tw-h-8 tw-mb-4 tw-text-gray-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p class="tw-mb-2 tw-text-sm tw-text-gray-500">
                            <span class="font-semibold">Haz click para subir</span> o arrastra y suelta
                        </p>
                        <p class="tw-text-xs tw-text-gray-500">PNG o JPG</p>
                    </div>
                    <v-file-input
                        v-model="file"
                        accept="image/png, image/jpeg, image/bmp"
                        label="Avatar"
                        placeholder="Un perfil"
                        prepend-icon=""
                        prepend-inner-icon="mdi-camera"
                        variant="outlined"
                        density="compact"
                        id="dropzone-file"
                        class="tw-hidden d-none"
                        @change="onFileChange"
                    ></v-file-input>
                </label>
            </div>
            <div class="tw-relative tw-w-min tw-m-auto tw-flex tw-flex-col tw-items-center" v-if="previewUrl">
                <div class="tw-absolute tw-right-0 tw-top-3 tw-z-10">
                    <v-btn icon="mdi-trash-can" color="error" variant="text" density="compact" @click="file = null"></v-btn>
                </div>
                <VAvatar :image="previewUrl" size="100" class="tw-mt-5" />
                <VBtn color="primary" class="mt-2" @click="onAvatarUpdate" :loading="updatePhotoMutation.isPending.value">
                    Actualizar
                </VBtn>
            </div>
        </v-card-text>
    </v-card>
</template>

<style scoped></style>
