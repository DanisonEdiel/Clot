<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import AppsLink from './AppsLink.vue';
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- mega menu DD -->
    <!-- ---------------------------------------------- -->
    <v-menu open-on-hover open-on-click >
        <template v-slot:activator="{ props }">
            <v-btn class="hidden-sm-and-down custom-hover-primary custom-sparkle"  size="small" variant="text" icon color="primary" v-bind="props">  <Icon icon="material-symbols:add-2-rounded"  height="40"   /> </v-btn>
        </template>
        <v-sheet width="500" height="100" elevation="10" rounded="md" class="overflow-hidden pa-0">
            <div>
                <v-row>
                    <v-col cols="12" md="8" class="d-flex">
                        <div class="pa-6">
                            <AppsLink />
                        </div>
                    </v-col>
                    <v-col cols="12" md="4" class="pa-0">
                        <img src="@/assets/images/usable/identity.jpg" alt="matdash-img" height="200" class="w-100"  />
                    </v-col>
                </v-row>
            </div>
        </v-sheet>
    </v-menu>
</template>

<style scoped>
.custom-sparkle {
  position: relative;
  display: inline-block;
  overflow: hidden;
  background-color: transparent;
}

.custom-sparkle::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(243, 244, 245, 0.6) 10%, transparent 70%);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  animation: sparkle-animation 2s infinite;
}

@keyframes sparkle-animation {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
}

.custom-sparkle::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 10%, transparent 70%);
  opacity: 0;
  animation: small-sparkles 3s infinite ease-in-out;
}

@keyframes small-sparkles {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 0.6;
  }
}

</style>
