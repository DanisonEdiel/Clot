<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
    <div>
        <h2 class="text-h3 my-3 heading">Iniciar Sesión</h2>
        <h3 class="heading mb-6">Tu Dashboard administrativo</h3>
        <LoginForm />
        <p class="d-flex align-center justify-center text-textSecondary mt-6 font-weight-medium">
            ¿Nuevo en Tygor?
            <RouterLink
                class="pl-0 text-primary opacity-1 pl-2 font-weight-medium text-decoration-none"
                height="auto"
                to="/auth/register"
                variant="plain"
                >Crea una cuenta</RouterLink
            >
        </p>
    </div>
</template>
