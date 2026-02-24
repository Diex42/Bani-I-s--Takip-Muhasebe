export interface Finance {
    id: string;
    brandId: string;
    brandName: string;

    sourceType: 'RETAINER' | 'JOB';
    sourceId?: string; //job ise jobID, retainer ise boş

    description: string;
    amount: number;

    dueDate: string; // Vade Tarihi
    paymentDate?: string; //tahsil edildiği tarih (edilmediyse null)

    status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED'
}