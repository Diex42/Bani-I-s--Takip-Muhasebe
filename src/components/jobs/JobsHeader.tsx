import { useState } from "react";
import { CircleX, PlusCircle, Search } from "lucide-react";
import JobForm from "./JobForm"; 

interface JobsHeaderProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

function JobsHeader({searchTerm, setSearchTerm}: JobsHeaderProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const isAdmin = true; // İleride yetki kontrolüne bağlanacak

    return (
        <section className="relative w-full h-32 bg-bg flex flex-wrap justify-between items-center md:px-10 border-b-2 border-button-yellow">
            <div className="order-1">
                <h1 className="text-3xl font-heading font-semibold">İŞLER</h1>
            </div>

            {/* Arama Barı (Şimdilik statik) */}
            <div className="w-96 py-2 flex items-center gap-3 px-4 rounded-lg bg-bg-sidebar/20 border-2 border-transparent order-3 md:order-2
                 focus-within:border-button-yellow focus-within:shadow-sm focus-within:shadow-button-yellow transition-all duration-200 group">
                <Search className="w-5 h-5 text-text-muted group-focus-within:text-button-yellow duration-200" />
                <input type="text" placeholder="Marka Adı ara..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                    className="w-full h-full bg-transparent outline-none text-text-primary " 
                />
            </div>

            {/* Ekle Butonu */}
            {isAdmin && (
                <div className="order-2 md:order-3">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-text-primary px-5 py-2.5 rounded-xl flex items-center gap-2 drop-shadow-md drop-shadow-button-yellow hover:drop-shadow-xl hover:drop-shadow-button-yellow hover:-translate-y-1 transition-all duration-200"
                    >
                        <PlusCircle className="w-5 h-5 text-button-yellow"/>
                        <span className="text-text-inverse font-heading font-semibold">İş Ekle</span>
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/50 p-4" onClick={() => setIsModalOpen(false)}>
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-zinc-100 bg-zinc-50/50">
                            <h2 className="text-xl font-bold text-zinc-800">Yeni İş Oluştur</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <CircleX className="w-6 h-6 text-zinc-400 hover:text-red-500" />
                            </button>
                        </div>
                        
                        {/* AKILLI FORM BURADA ÇAĞRILIYOR */}
                        <JobForm onSuccess={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </section>
    );
}

export default JobsHeader;