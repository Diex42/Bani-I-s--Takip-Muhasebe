import type { UserRole, Department } from "./enum";

export interface User {
    id: string;
    fullname: string;
    email: string;
    number: string;
    role: UserRole;
    department: Department;
    salary: number;
    colorTheme: string;
}