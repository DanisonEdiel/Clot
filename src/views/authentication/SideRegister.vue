<script setup lang="ts">
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
    <div>
        <h2 class="text-h3 text-primary semibold heading">Register</h2>
        <RegisterForm />
        <p class="justify-center mt-6 d-flex align-center text-textSecondary font-weight-medium">
            Do you have an account?
            <RouterLink
                class="pl-0 pl-2 text-primary opacity-1 font-weight-medium text-decoration-none"
                height="auto"
                to="/auth/login"
                variant="plain"
                >Login now</RouterLink
            >
        </p>
    </div>
</template>
