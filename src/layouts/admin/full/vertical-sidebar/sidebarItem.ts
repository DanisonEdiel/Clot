export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    id?: number;
    to?: string;
    chip?: string;
    BgColor?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
}
const sidebarItem: menu[] = [
    {
        id: 1,
        children: [
            {
                title: 'Dashboard',
                icon: 'widget-add-line-duotone',
                to: 'home-admin'
            }
        ]
    },
    // {
    //     id: 1,
    //     children: [
    //         {
    //             title: 'Usuarios',
    //             icon: 'user-bold-duotone',
    //             to: 'admin-users'
    //         }
    //     ]
    // },
    // {
    //     id: 1,
    //     children: [
    //         {
    //             title: 'Actividad',
    //             icon: 'history-2-broken',
    //             to: 'admin-activity'
    //         }
    //     ]
    // },
    {
        id: 2,
        children: [
            {
                title: 'RUC',
                icon: 'user-id-bold',
                to: 'ruc-list',
                id: 2
            }
        ]
    },
    {
        id: 3,
        children: [
            {
                title: 'Usuarios',
                icon: 'users-group-rounded-bold',
                to: 'users-list',
                id: 2
            },
            {
                title: 'Perfil',
                icon: 'user-circle-bold',
                to: 'my-account',
                id: 2
            },
            {
                title: 'Subscripción',
                icon: 'hand-money-outline',
                to: 'my-subscription',
                id: 2
            }
        ]
    }
];

export default sidebarItem;
