import { X, CalendarDays, CheckCircle2, FileText, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { type Finance } from "../../types/finance";
import { formatCurrency } from "../../utils/format";

interface PaymentModalProps {
    isOpen: boolean;                // Modal açık mı?
    onClose: () => void;            // Kapatma fonksiyonu
    transaction: Finance | null;    // Hangi işlem için açıldı? (Veri)
    onConfirm: (date: string, note: string) => void; // Kaydetme fonksiyonu
}

export default function PaymentModal({ isOpen, onClose, transaction, onConfirm }: PaymentModalProps) {
    
    // Form State'leri
    // Varsayılan olarak bugünün tarihini al (YYYY-MM-DD formatında)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState("");

    // Modal her açıldığında not kısmını temizle
    useEffect(() => {
        if (isOpen) {
            setNote("");
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [isOpen]);

    // Eğer kapalıysa veya veri yoksa hiçbir şey render etme
    if (!isOpen || !transaction) return null;

    return (
        // 1. ARKA PLAN (Overlay) - Tıklayınca kapatır
        <div 
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            
            {/* 2. MODAL KUTUSU - Tıklamayı engeller (stopPropagation) */}
            <div 
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-zinc-200"
                onClick={(e) => e.stopPropagation()} 
            >
                
                {/* --- BAŞLIK ALANI --- */}
                <div className="bg-zinc-50/80 border-b border-zinc-100 p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-200/50">
                            <Wallet size={24} />
                        </div>
                        <div>
                            <h3 className="font-heading font-bold text-lg text-zinc-800">Tahsilat Girişi</h3>
                            <p className="text-xs text-zinc-500 font-medium">Ödemeyi sisteme işle</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 hover:text-red-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* --- İÇERİK --- */}
                <div className="p-6 space-y-6">
                    
                    {/* Özet Kartı (Bilgi) */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl flex justify-between items-center shadow-sm">
                        <div>
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">MARKA / İŞLEM</p>
                            <p className="font-heading font-bold text-zinc-700 text-lg leading-tight">{transaction.brandName}</p>
                            <p className="text-xs text-blue-400/80 mt-1 truncate max-w-[150px]">{transaction.description}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">TUTAR</p>
                            <p className="font-heading font-black text-2xl text-blue-600">{formatCurrency(transaction.amount)}</p>
                        </div>
                    </div>

                    {/* Form Alanı */}
                    <div className="space-y-4">
                        
                        {/* Tarih Seçimi */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                                <CalendarDays size={16} className="text-zinc-400" />
                                Tahsilat Tarihi
                            </label>
                            <input 
                                type="date" 
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium text-zinc-700"
                            />
                        </div>

                        {/* Açıklama */}
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-zinc-700 flex items-center gap-2">
                                <FileText size={16} className="text-zinc-400" />
                                Not / Dekont No (Opsiyonel)
                            </label>
                            <input 
                                type="text" 
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Örn: Havale ile geldi, Dekont No: 12345"
                                className="w-full p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-sm placeholder:text-zinc-400"
                            />
                        </div>
                    </div>

                </div>

                {/* --- ALT BUTONLAR --- */}
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-3.5 px-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-200 transition-colors"
                    >
                        Vazgeç
                    </button>
                    <button 
                        onClick={() => onConfirm(date, note)}
                        className="flex-[2] py-3.5 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <CheckCircle2 size={20} />
                        Tahsilatı Onayla
                    </button>
                </div>

            </div>
        </div>
    );
}