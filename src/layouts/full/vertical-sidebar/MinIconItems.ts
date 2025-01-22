
export interface minisidebar {
    icon?: string;
    id?:number;
    tooltip?:string
}
const MiniSideIcons: minisidebar[] = [
    {
        icon: 'layers-line-duotone',
        tooltip:'Dashboards',
        id: 1
    },
    {
        icon:'document-add-outline',
        tooltip:'Rucs',
        id: 2
    },
    {
        icon:'settings-broken',
        tooltip:'Configuracion',
        id: 3
    },
]

export default MiniSideIcons;
