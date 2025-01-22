<script setup lang="ts">
import { useAbility } from '@casl/vue';

const { rules } = useAbility();
const props = defineProps({ item: Object });
const show = () => {
    if (props.item?.permissions) {
        let permissions = props.item?.permissions as string[];
        let x = rules.map((x) => {
            return permissions.some((y) => x.action == y);
        });
        console.log(x);

        return x.some((x) => x);
    }
    return false;
};
</script>

<template>
    <v-list-subheader  class="mt-3 smallCap text-uppercase text-subtitle-2 font-weight-bold d-flex align-items-center ">
        <span class="mini-icon"><DotsIcon size="16" stroke-width="1.5" class="iconClass" /></span>
       <span class="mini-text">{{ $t(props.item!.header) }}</span> 
    </v-list-subheader>
</template>
