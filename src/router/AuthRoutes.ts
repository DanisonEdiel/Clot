const AuthRoutes = {
    path: '/auth',
    component: () => import('@/layouts/auth/AuthLayout.vue'),
    meta: {
        requiresAuth: false
    },
    children: [
        {
            name: 'Side Login',
            path: '/auth/login',
            component: () => import('@/views/authentication/SideLogin.vue')
        },
        {
            name: 'Side Register',
            path: '/auth/register',
            component: () => import('@/views/authentication/SideRegister.vue')
        },
        {
            name: 'Reset Password',
            path: '/auth/reset-password',
            component: () => import('@/views/authentication/SideResetPassword.vue')
        },
        {
            name: 'Error',
            path: '/auth/404',
            component: () => import('@/views/authentication/Error.vue')
        }
    ]
};

export default AuthRoutes;
