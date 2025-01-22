import isUserAuthenticated from '@/guards/isUserAuthenticated';
import { RouteRecordRaw } from 'vue-router';

const AdminRoutes: RouteRecordRaw[] = [
    {
        path: '/auth',
        component: () => import('@/layouts/admin/AdminLayout.vue'),
        children: [
            {
                name: 'Admin Login',
                path: '/admin/login',
                component: () => import('@/views/admin/AdminLogin.vue')
            }
        ]
    },
    {
        path: '/main',
        redirect: '/main',
        component: () => import('@/layouts/admin/full/FullLayout.vue'),
        children: [
            {
                name: 'home-admin',
                path: '/admin',
                // beforeEnter: [isUserAuthenticated],
                component: () => import('@/views/admin/AdminDashboard.vue')
            },
            {
                name: 'admin-ruc',
                path: '/rucs',
                component: () => import('@/views/rucs/RucList.vue')
            },
            {
                name: 'admin-users',
                path: '/users',
                component: () => import('@/views/users/UsersAdminList.vue')
            },
            {
                name: 'change-plan',
                path: '/edit-plans/:id',
                component: () => import('@/views/admin/ShowPlan.vue')
            },
            {
                name: 'admin-activity',
                path: '/activity',
                component: () => import('@/views/admin/AdminActivity.vue')
            },
        ]
    }
];

export default AdminRoutes;
