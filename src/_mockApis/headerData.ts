// project imports
import mock from './mockAdapter';

import type { notificationType, profileType, appsLinkType,searchType } from '@/types/HeaderTypes'
// 
// Notification
// 
const notifications:notificationType[] = [
    {
        avatar: 'widget-3-line-duotone',
        color:'error',
        title: 'Launch Admin',
        subtitle: 'Just see the my new admin!',
        time:'9:30 AM'
    },
    {
        avatar: 'calendar-line-duotone',
        color:'primary',
        title: 'Event Today',
        subtitle: 'Just a reminder that you have event',
        time:'9:15 AM'
    },
    {
        avatar: 'settings-line-duotone',
        color:'secondary',
        title: 'Settings',
        subtitle: 'You can customize this template as you want',
        time:'4:36 PM'
    },
    {
        avatar: 'widget-4-line-duotone',
        color:'warning',
        title: 'Launch Admin',
        subtitle: 'Just see the my new admin!',
        time:'9:30 AM'
    },
    {
        avatar: 'calendar-line-duotone',
        color:'primary',
        title: 'Event Today',
        subtitle: 'Just a reminder that you have event',
        time:'9:15 AM'
    },
    {
        avatar: 'settings-line-duotone',
        color:'secondary',
        title: 'Settings',
        subtitle: 'You can customize this template as you want',
        time:'4:36 PM'
    },
];

// 
// Profile 
// 
const profileDD: profileType[] = [
    {
        title: 'My Profile',
        href: '/apps/user/profile',
        badge:false
    },
    {
        title: 'My Subscription',
        href: '/pages/pricing',
        badge:false
    },
    {
        title: 'My Notes',
        href: '/apps/notes',
        badge:true
    },
    {
        title: 'Account Settings',
        href: '/pages/account-settings',
        badge:false
    },
    {
        title: 'Sign Out',
        href: '/auth/login',
        badge:false
    },
   
];

// 
// AppsLink
// 
const appsLink: appsLinkType[] = [
    {
        avatar: 'chat-line-bold-duotone',
        color:'primary',
        title: '¡Crea un RUC Nuevo!',
        subtext: 'Agrega un número de identificación para el que quieras descargar sus documentos',
        href: '/apps/chats'
    },
    {
        avatar: 'user-bold-duotone',
        color:'success',
        title: 'User Profile App',
        subtext: 'Get profile details',
        href: '/apps/user/profile'
    },
];


// 
// Search Data
// 
const searchSugg: searchType[] = [
    {
        title: 'Modern',
        href: '/dashboards/modern'
    },
    {
        title: 'eCommerce',
        href: '/dashboards/ecommerce'
    },
    {
        title: 'Contacts',
        href: '/apps/contacts'
    },
    {
        title: 'Shop',
        href: '/ecommerce/shop'
    },
    {
        title: 'Checkout',
        href: '/ecommerce/checkout'
    },
    {
        title: 'Chats',
        href: '/apps/chats'
    },
    {
        title: 'Notes',
        href: '/apps/notes'
    },
    {
        title: 'Pricing',
        href: '/pages/pricing'
    },
    {
        title: 'Account Setting',
        href: '/pages/account-settings'
    },
];

export { notifications, profileDD, appsLink, searchSugg };

