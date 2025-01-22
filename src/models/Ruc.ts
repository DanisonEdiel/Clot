export interface Ruc {
    id: number;
    name: string;
    ruc: string;
    tenant_id: string;
    password: string;
    wrongPassword: boolean;
    is_synchronizing: boolean;
}
