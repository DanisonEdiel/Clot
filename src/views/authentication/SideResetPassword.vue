<script setup lang="ts">
import ResetForm from '@/components/auth/ResetForm.vue';
import LogoIcon from '@/layouts/full/logo/LogoIcon.vue';
/* Register form */

</script>

<template>
    <div>
        <h2 class="text-h3 text-primary semibold heading">¿Perdiste tu contraseña?</h2>
        <div class="my-4 text-textSecondary">Ingresa la dirección de correo electrónico asociada con su cuenta y
        le enviaremos un enlace por correo electrónico para restablecer su contraseña</div> 
        <ResetForm />
        <v-btn size="large" color="info" class="mt-5 text-secondary" to="/auth/login" block  submit flat><Ri:a>Regresar al login</Ri:a></v-btn>
    </div>
</template>
