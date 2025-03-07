<script setup lang="ts">
import { onMounted, ref, shallowRef, computed } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';
import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
// MiniSidebar Icons
import MiniSideIcons from './MinIconItems';
import LogoIcon from '../logo/LogoIcon.vue';

const route = useRoute();

const findTitleByPath = (items: any, path: any) => {
    let title = '';

    for (const item of items) {
        if (item.to === path) {
            title = item.id;
            break;
        } else if (item.children) {
            for (const child of item.children) {
                if (child.to === path) {
                    title = item.id;
                    break;
                }
            }
        }
    }

    return title;
};
const foundId = findTitleByPath(sidebarItems, route.path);
const getCurrent = foundId ? foundId : 1;
const currentMenu = ref<any>(getCurrent);
function showData(data: any) {
    currentMenu.value = data;
}

// MiniSidebar Icons End
const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
</script>

<template>
    <!-- Minisidebar Icons -->
    <v-navigation-drawer class="bg-light" v-model="customizer.Sidebar_drawer" top="0" rail rail-width="80">
        <perfect-scrollbar class="miniscrollnavbar">
            <v-list-item class="px-0">
                <!-- Toggle Sidebar Button -->
                <div class="px-4 mb-3">
                    <v-btn
                        class="my-2 hidden-md-and-down"
                        icon
                        rounded="md"
                        variant="plain"
                        @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
                    >
                        <Icon icon="solar:hamburger-menu-line-duotone" height="25" />
                    </v-btn>
                </div>

                <div class="mt-4 miniicons mt-lg-0">
                    <!-- MiniSidebar Icons -->
                    <div class="gap-2 d-flex flex-column">
                        <div class="px-4 miniicons-list" v-for="menu in MiniSideIcons" :key="menu.icon">
                            <v-btn
                                rounded="md"
                                flat
                                icon
                                variant="plain"
                                @click="showData(menu.id)"
                                :class="{ 'bg-primary opacity-1': currentMenu === menu.id }"
                            >
                                <Icon :icon="'solar:' + menu.icon" width="25" />
                                <!-- Tooltip on Hover -->
                                <v-tooltip activator="parent" location="end" class="custom-tooltip">{{ menu.tooltip }}</v-tooltip>
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-list-item>
        </perfect-scrollbar>
    </v-navigation-drawer>

    <!-- LeftSidebar Items -->
    <v-navigation-drawer
        v-model="customizer.Sidebar_drawer"
        elevation="0"
        rail-width="1"
        app
        top="0"
        class="leftSidebar"
        :rail="customizer.mini_sidebar"
        width="210"
    >
        <!---Logo part -->
        <div class="pb-0 mb-4 pa-4 tw-w-44">
            <LogoIcon />
        </div>

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <div class="px-4 py-0 sidebar-menus">
                <v-list class="py-1">
                    <template v-for="(item, i) in sidebarMenu">
                        <template v-if="currentMenu == item.id">
                            <!---Item Sub Header -->
                            <NavGroup :item="item" v-if="item.header" :key="item.title" />
                            <!---If Has Child -->
                            <template v-for="sItem in item.children">
                                <NavCollapse class="leftPadding" :item="sItem" :level="0" v-if="sItem.children" />
                                <NavItem :item="sItem" class="leftPadding" v-else />
                            </template>
                        </template>
                    </template>
                </v-list>
            </div>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
