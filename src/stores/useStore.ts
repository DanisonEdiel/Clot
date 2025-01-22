import type { Role, Tenant } from '@/models/Tenant';
import type { User } from '@/models/User';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore(
    'user-store',
    () => {
        const token = ref('');
        const tour = ref(true);
        const user = ref<User>({} as User);
        const role = ref<Role>({} as Role);
        const tenantId = ref();
        const companies = ref<Tenant[]>([]);
        const logout = () => {
            user.value = {} as User;
            role.value = {} as Role;
            companies.value = [];
            token.value = '';
            tenantId.value = '';
        };
        const setToken = (newToken: string) => {
            token.value = newToken;
        };

        const setTour = (newToken: boolean) => {
            tour.value = newToken;
        };
        const setCompanies = (newCompanies: Tenant[]) => {
            companies.value = newCompanies;
        };
        const setUser = (newUser: User) => {
            user.value = newUser;
        };
        const setRole = (newRole: Role) => {
            role.value = newRole;
        };
        const setTenantId = (newTenantId: string) => {
            tenantId.value = newTenantId;
        };
        return {
            token,
            user,
            tenantId,
            role,
            companies,
            tour,
            logout,
            setToken,
            setUser,
            setTenantId,
            setRole,
            setCompanies,
            setTour
        };
    },
    { persist: true }
);
