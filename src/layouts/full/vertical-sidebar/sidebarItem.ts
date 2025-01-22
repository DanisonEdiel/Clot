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
                to: 'home'
            },
            {
                title: 'RUC',
                icon: 'user-id-bold',
                to: 'ruc-list'
            },
            {
                title: 'Usuarios',
                icon: 'users-group-rounded-bold',
                to: 'users-list',
            },
            {
                title: 'Mi Cuenta',
                icon: 'user-circle-bold',
                to: 'my-account',
            },
            {
                title: 'Subscripción',
                icon: 'hand-money-outline',
                to: 'my-subscription',
            }
        ]
    },
];

export default sidebarItem;
