export interface Tenant {
    id: string;
    email: string;
    owner: Owner;
    created_at: string|null;
}

export interface TenantUser {
    id: number;
    tenant_id: string;
    user_id: number;
    role_id: number;
    created_at: any;
    updated_at: any;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
    access: string;
    created_at: string;
    updated_at: string;
}
export interface Owner {
    id: number;
    name: string;
    phone: string;
    city: any;
    address: any;
    state: any;
    email: string;
    email_verified_at: any;
    current_team_id: any;
    profile_photo_path: string;
    created_at: string;
    updated_at: string;
    two_factor_confirmed_at: any;
    profile_photo_url: string;
}
