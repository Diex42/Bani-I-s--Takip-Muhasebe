import { Clock, AlertCircle, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Job } from "../../types/job";

interface UserUrgentJobsProps {
    jobs: Job[];
    // Opsiyonel: Eğer dashboard'dan user adını prop olarak geçersen daha garanti olur
    // currentUserName?: string; 
}

export default function UserUrgentJobs({ jobs }: UserUrgentJobsProps) {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long' 
        });
    };

    const getDaysLeft = (dateString: string) => {
        const due = new Date(dateString).getTime();
        const now = new Date().getTime();
        const diff = due - now;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    // --- YÖNLENDİRME MANTIĞI (SENİN İSTEDİĞİN GİBİ) ---

    // 1. Tekil İşe Tıkla -> ?search=İşinAdı
    const handleJobClick = (jobTitle: string) => {
        // encodeURIComponent: Boşlukları ve özel karakterleri linke uygun hale getirir (%20 vs.)
        navigate(`/isler?search=${encodeURIComponent(jobTitle)}`);
    };

    // 2. Tümünü Gör -> ?search=PersonelAdı
    const handleSeeAllClick = () => {
       
        if (jobs.length > 0) {
            const myName = jobs[0].assignedTo?.[0]?.fullname; 
            
            if (myName) {
                navigate(`/isler?search=${encodeURIComponent(myName)}`);
            } else {
                navigate('/isler'); // İsim bulamazsa düz git
            }
        } else {
            navigate('/isler');
        }
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-zinc-900 font-black text-xl tracking-tight">Acil İşler</h3>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-1">
                        Teslim Tarihi Yaklaşanlar
                    </p>
                </div>
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl animate-pulse">
                    <AlertCircle size={24} />
                </div>
            </div>

            <div className="flex-1 space-y-4">
                {jobs.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2 min-h-[200px]">
                        <div className="p-4 bg-zinc-50 rounded-full">
                            <Clock size={32} className="opacity-50" />
                        </div>
                        <p className="font-medium">Süper! Hiç acil işin yok.</p>
                    </div>
                ) : (
                    jobs.map((job) => {
                        const daysLeft = job.dueDate ? getDaysLeft(job.dueDate) : 0;
                        const isOverdue = daysLeft < 0;
                        const isUrgent = daysLeft <= 2 && daysLeft >= 0; 

                        return (
                            <div 
                                key={job.id} 
                                // TIKLAMA OLAYI BURADA
                                onClick={() => handleJobClick(job.title)}
                                className="group relative overflow-hidden bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-md hover:border-zinc-200 transition-all duration-300 cursor-pointer"
                            >
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isOverdue ? 'bg-rose-500' : (isUrgent ? 'bg-amber-500' : 'bg-blue-500')}`} />

                                <div className="flex justify-between items-start pl-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider bg-zinc-50 px-2 py-0.5 rounded-md">
                                                {job.brand?.name || "Marka Yok"}
                                            </span>
                                            {isOverdue && (
                                                <span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded-md uppercase">
                                                    Gecikmiş
                                                </span>
                                            )}
                                        </div>
                                        
                                        <h4 className="text-zinc-800 font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
                                            {job.title}
                                        </h4>
                                    </div>

                                    <div className="text-right">
                                        <div className={`flex items-center gap-1.5 text-sm font-bold ${isOverdue ? 'text-rose-600' : 'text-zinc-500'}`}>
                                            <Calendar size={14} />
                                            <span>{job.dueDate ? formatDate(job.dueDate) : '-'}</span>
                                        </div>
                                        <div className="text-[10px] font-semibold text-zinc-400 mt-1">
                                            {isOverdue 
                                                ? `${Math.abs(daysLeft)} gün geçti` 
                                                : `${daysLeft} gün kaldı`
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    <div className="bg-zinc-900 text-white p-2 rounded-full shadow-lg">
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {jobs.length > 0 && (
                <div className="mt-6 pt-4 border-t border-zinc-100 text-center">
                    <button 
                        onClick={handleSeeAllClick}
                        className="text-sm font-bold text-zinc-400 hover:text-zinc-900 transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        Tüm İşlerimi Gör <ArrowRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}