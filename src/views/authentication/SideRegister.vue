<script setup lang="ts">
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
/* Register form */
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
    <div>
        <h2 class="text-h3 text-primary semibold heading">Regístrate</h2>
        <div class="mb-6 text-primary">y obtén tu prueba gratuita</div>
        <RegisterForm />
        <p class="d-flex align-center justify-center text-textSecondary mt-6 font-weight-medium">
            ¿Ya tienes cuenta?
            <RouterLink
                class="pl-0 text-primary opacity-1 pl-2 font-weight-medium text-decoration-none"
                height="auto"
                to="/auth/login"
                variant="plain"
                >Inicia sesión</RouterLink
            >
        </p>
    </div>
</template>
