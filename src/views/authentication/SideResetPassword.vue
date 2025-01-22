<script setup lang="ts">
import ResetForm from '@/components/auth/ResetForm.vue';
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
/* Register form */

</script>

<template>
    <div>
        <h2 class="text-h3 text-primary semibold heading">Lost your password?</h2>
        <div class="my-4 text-textSecondary">Enter the email address associated with your account and we'll email you a link to reset your password.</div> 
        <ResetForm />
        <v-btn size="large" color="info" class="mt-5 text-secondary" to="/auth/login" block  submit flat><Ri:a>Return to login</Ri:a></v-btn>
    </div>
</template>
