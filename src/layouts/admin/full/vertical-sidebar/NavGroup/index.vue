<script setup>
const props = defineProps({ item: Object });
</script>

<template>
    <v-list-subheader  class="mt-3 smallCap text-uppercase text-subtitle-2 font-weight-bold d-flex align-items-center ">
        <span class="mini-icon"><DotsIcon size="16" stroke-width="1.5" class="iconClass" /></span>
       <span class="mini-text">{{ $t(props.item.header) }}</span> 
    </v-list-subheader>
</template>
