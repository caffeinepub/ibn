import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface DataPlan {
    id: string;
    title: string;
    priceInCents: bigint;
}
export interface BankDetails {
    bic?: string;
    iban?: string;
    note?: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    name: string;
    phone?: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDataPlan(title: string, priceInCents: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createSinglePlanCheckoutSession(planId: string, successUrl: string, cancelUrl: string): Promise<string>;
    getAllDataPlans(): Promise<Array<DataPlan>>;
    getBankAccounts(): Promise<Array<BankDetails>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDataPlan(id: string): Promise<DataPlan | null>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    highestToLowestPrice(): Promise<Array<string>>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isRegisteredAsUser(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    registerAsUser(profile: UserProfile): Promise<void>;
    saveBankAccounts(accounts: Array<BankDetails>): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
