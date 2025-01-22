import { userStore } from '@/stores/useStore';
import type { NavigationGuardNext, RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

const isUserAuthenticated = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
    const { token } = userStore();

    if (!token) {
        next({ name: 'Side Login' });
    }
    next();
};

export default isUserAuthenticated;
