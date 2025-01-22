import type { TenantUser } from "./Tenant";

export interface User {
  id: number;
  user_id: number;
  name: string;
  email: string;
  profile_photo_url: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  confirmPassword: string;
  tenant_user: TenantUser[];
}
