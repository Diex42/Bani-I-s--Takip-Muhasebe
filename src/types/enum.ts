export type JobStatus =
    | 'In_Progress'
    | 'Revision'
    | 'Done';

export type PaymentStatus =
    | 'Paid'
    | 'Unpaid';

export type UserRole =
    | 'Admin'
    | 'User';

export const DEPARTMENTS = [
  "Yazılım",
  "Grafik",
  "Sosyal Medya",
  "Video",
  "3D",
  "Yönetim",
] as const;

export type Department = (typeof DEPARTMENTS)[number];