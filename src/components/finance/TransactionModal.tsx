import { X, CalendarDays, CheckCircle2, Building2, Wallet, Layers, FileText } from "lucide-react";
import { useState, useEffect } from "react";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void; // Kaydetme fonksiyonu
}

export default function TransactionModal({ isOpen, onClose, onSave }: TransactionModalProps) {
    
    // Form State'leri
    const [type, setType] = useState<'RETAINER' | 'JOB'>('JOB'); // Varsayılan: Ekstra İş
    const [brand, setBrand] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [desc, setDesc] = useState("");

    // Modal açılınca formları temizle
    useEffect(() => {
        if (isOpen) {
            setBrand("");
            setAmount("");
            setDesc("");
            setType('JOB');
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        // Basit validasyon
        if (!brand || !amount) {
            alert("Lütfen marka ve tutar giriniz.");
            return;
        }

        onSave({
            brandName: brand,
            amount: Number(amount),
            dueDate: date,
            description: desc,
            sourceType: type,
            status: 'PENDING' // Yeni işler her zaman Bekliyor olarak başlar
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
                
                {/* --- BAŞLIK --- */}
                <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-heading font-bold text-xl text-zinc-800">Yeni İşlem Ekle</h3>
                        <p className="text-xs text-zinc-500 mt-1">Sisteme yeni bir gelir kalemi gir.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>

                {/* --- FORM --- */}
                <div className="p-6 space-y-5">
                    
                    {/* 1. İşlem Tipi Seçimi (Segmented Control) */}
                    <div className="bg-zinc-100 p-1 rounded-xl flex">
                        <button 
                            onClick={() => setType('JOB')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2
                            ${type === 'JOB' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <Layers size={16} />
                            Ekstra Proje
                        </button>
                        <button 
                            onClick={() => setType('RETAINER')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2
                            ${type === 'RETAINER' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                        >
                            <Wallet size={16} />
                            Aylık Sabit
                        </button>
                    </div>

                    {/* 2. Marka ve Tutar (Yan Yana) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">MARKA</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input 
                                    type="text" 
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="" 
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all font-bold text-zinc-700 placeholder:font-normal"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">TUTAR</label>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00" 
                                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all font-heading font-black text-zinc-800 text-right placeholder:font-normal"
                            />
                        </div>
                    </div>

                    {/* 3. Tarih ve Açıklama */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">VADE TARİHİ</label>
                        <div className="relative">
                            <CalendarDays className="absolute left-3 top-3 text-zinc-400" size={18} />
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all font-medium text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">AÇIKLAMA</label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 text-zinc-400" size={18} />
                            <input 
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Örn: Sosyal Medya Yönetimi Hizmeti" 
                                className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all text-sm"
                            />
                        </div>
                    </div>

                </div>

                {/* --- ALT BUTONLAR --- */}
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-200 transition-colors">
                        İptal
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="flex-[2] py-3 px-4 rounded-xl font-bold text-white bg-zinc-900 hover:bg-zinc-800 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={18} />
                        Kaydet
                    </button>
                </div>

            </div>
        </div>
    )
}