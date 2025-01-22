import isUserAuthenticated from '@/guards/isUserAuthenticated';
import { RouteRecordRaw } from 'vue-router';

const MainRoutes: RouteRecordRaw[] = [
    {
        path: '/welcome',
        name: 'welcome-page',
        component: () => import('@/views/WelcomePage.vue')
    },
    {
        path: '/pay-response',
        name: 'pay-response',
        component: () => import('@/components/checkout/PayphoneResponsePage.vue')
    },
    {
        path: '/main',
        redirect: '/main',
        component: () => import('@/layouts/full/FullLayout.vue'),
        children: [
            {
                name: 'home',
                path: '/',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/StarterPage.vue')
            },
            {
                name: 'ruc-list',
                path: 'rucs',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/rucs/RucList.vue')
            },
            {
                name: 'documents-list',
                path: 'documentos/:ruc',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/documents/DocumentsList.vue')
            },
            {
                name: 'users-list',
                path: 'usuarios',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/users/UsersList.vue')
            },
            {
                name: 'my-account',
                path: 'account',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/account/MyAccount.vue')
            },
            {
                name: 'my-subscription',
                path: 'subscripcion',
                beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/subscription/MySubscription.vue')
            }
        ]
    }
];

export default MainRoutes;
