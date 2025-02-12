<script setup lang="ts">
import DeleteAccountForm from '@/components/account/DeleteAccountForm.vue';
import UnsubscribeCompanyForm from '@/components/account/UnsubscribeCompanyForm.vue';
import UpdateAccountForm from '@/components/account/UpdateAccountForm.vue';
import UpdatePasswordForm from '@/components/account/UpdatePasswordForm.vue';
import UpdateProfileAvatarForm from '@/components/account/UpdateProfileAvatarForm.vue';
import useAccount from '@/composables/users/useAccount';

const { account, accountHasError, isAccountLoading, idlAccount } = useAccount();
</script>

<template>
    <div>
        <v-row v-if="isAccountLoading">
            <v-col cols="12" md="5">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="12" md="7">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="12" md="5">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col cols="12" md="7">
                <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-row v-else-if="accountHasError">
            <v-col cols="12">
                <p>error</p>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12" md="5">
                <v-card class="pb-5 tw-mt-3 tw-text-center tw-overflow-hidden" rounded="lg" flat>
                    <v-card-title class="tw-mb-3 tw-w-full bg-primary"> Current Information </v-card-title>
                    <v-card-subtitle class="tw-mb-4 tw-w-full"> User Profile </v-card-subtitle>
                    <VAvatar :image="account.profile_photo_url" :size="150" />
                    <v-card-text>
                        <div class="tw-font-semibold tw-text-lg">{{ idlAccount.name }}</div>
                        <div class="tw-text-gray-500">{{ idlAccount.email }}</div>
                    </v-card-text>
                </v-card>
                <UpdateProfileAvatarForm
                    @avatar-update="
                        (params: any) => {
                            account.profile_photo_url = params;
                        }
                    "
                />
            </v-col>
            <v-col cols="12" md="7">
                <UpdateAccountForm :account="account" />
                <UpdatePasswordForm :account="account" />
                <!-- <UnsubscribeCompanyForm :account="account" />
                <DeleteAccountForm :account="account" /> -->
            </v-col>
        </v-row>
    </div>
</template>

<style scoped></style>
