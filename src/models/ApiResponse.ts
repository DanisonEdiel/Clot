import { subscription, tenant, transactions } from './Dashboard';
import { Invoices } from './Invoice';
import { Plans } from './Plans';
import { Ruc } from './Ruc';
import type { Owner, Tenant } from './Tenant';
import type { User } from './User';

export interface LoginResponse {
    token: string;
    user: User;
    tenants: Tenant[];
}

export interface DashboardApiResponse {
    tenant: tenant;
    rucs: number;
    invoices: Invoices[];
    creditNotes: Invoices[];
    retentions: Invoices[];
    debitNotes: Invoices[];
}

export interface AdminDashboardApiResponse {
    company: Tenant;
    rucs: number;
    plan: string;
    vouchers: string;
    downloadedVouchers: number;
}

export interface SingleCompanyApiResponse {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
    owner: Owner;
    ruc: Ruc[];
    subscription: subscription;
    transactions: transactions;
    payment: any[];
}

export interface PlansApiResponse {
    plans: Plans[];
}

export interface InvoicesApiResponse {
    invoices: Invoices[];
    creditNotes: Invoices[];
    retentions: Invoices[];
    debitNotes: Invoices[];
}

export interface PaymentDataApiResponse {
    token: string;
    transactionId: string;
    amount: number;
}

export interface PayphoneCheckoutResponse {
    email: string;
    cardType: string;
    bin: string;
    lastDigits: string;
    deferredCode: string;
    deferredMessage: string;
    deferred: boolean;
    cardBrandCode: string;
    cardBrand: string;
    amount: number;
    clientTransactionId: string;
    phoneNumber: string;
    statusCode: number;
    transactionStatus: string;
    authorizationCode: string;
    message: any;
    messageCode: number;
    transactionId: number;
    document: string;
    taxes: any[];
    currency: string;
    optionalParameter1: string;
    optionalParameter2: string;
    optionalParameter3: string;
    optionalParameter4: string;
    storeName: string;
    date: string;
    regionIso: string;
    transactionType: string;
    recap: any;
    reference: string;
}
