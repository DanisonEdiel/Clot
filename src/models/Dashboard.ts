import { Plans } from "./Plans";

export interface Dashboard {
    tenant: tenant;
    transactions: transactions;
    subscription: subscription;
}

export interface tenant {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    transactions: transactions;
    subscription: subscription;
}

export interface transactions {
    id: number;
    transactions: number;
    bot_id: number;
    tenant_id: string;
    created_at: string;
    updated_at: string;
}

export interface subscription {
    id: number;
    vouchers: string;
    usersOnline: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    rucs: any;
    plan:Plans;
    price: string;
}
