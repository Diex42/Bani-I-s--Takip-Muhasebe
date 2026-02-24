import type { JobStatus, PaymentStatus, Department } from "./enum";
import type { User } from "./user";
import type { Brand } from "./brand";

export interface Job {
    id: string;
    title: string;
    description?: string;

    brandId: string;
    brand?: Brand;
    assignedTo: User[];
    department: Department;

    startDate: string;
    dueDate?: string;
    status: JobStatus;

    isRetainerIncluded: boolean;
    price?: number;
    paymentStatus?: PaymentStatus;
}