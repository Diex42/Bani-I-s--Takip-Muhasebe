export interface Brand {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    isRetainer: boolean;
    monthlyRetainerAmount?: number;
    paymentDay?: number;
    totalActiveJobs: number;
    currentDebt: number;
}