<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
    <div>
        <h2 class="my-3 text-h3 heading">Login</h2>
        <h3 class="mb-6 heading">Your favorite Site</h3>
        <LoginForm />
        <p class="justify-center mt-6 d-flex align-center text-textSecondary font-weight-medium">
            ¿New in Clot?
            <RouterLink
                class="pl-0 pl-2 text-primary opacity-1 font-weight-medium text-decoration-none"
                height="auto"
                to="/auth/register"
                variant="plain"
                >Create an account!</RouterLink
            >
        </p>
    </div>
</template>
