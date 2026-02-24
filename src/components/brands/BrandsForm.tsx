import { useState } from "react";
import { Building2, Mail, Phone, CalendarDays, Wallet, Check } from "lucide-react";
import type { Brand } from "../../types/brand"; // Brand tipinin yolu

interface BrandsFormProps {
    onClose: () => void;
    // Gerçek uygulamada bu fonksiyon API'ye istek atacak
    onSubmit: (data: Partial<Brand>) => void; 
}

function BrandsForm({ onClose, onSubmit }: BrandsFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        isRetainer: false,
        monthlyRetainerAmount: "",
        paymentDay: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleRetainer = () => {
        setFormData((prev) => ({ ...prev, isRetainer: !prev.isRetainer }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Veriyi formatlayıp gönderiyoruz
        const submitData: Partial<Brand> = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            isRetainer: formData.isRetainer,
            // Sayısal değerleri string'den number'a çeviriyoruz
            monthlyRetainerAmount: formData.monthlyRetainerAmount ? Number(formData.monthlyRetainerAmount) : undefined,
            paymentDay: formData.paymentDay ? Number(formData.paymentDay) : undefined,
            // Yeni marka olduğu için varsayılanlar:
            totalActiveJobs: 0,
            currentDebt: 0
        };

        onSubmit(submitData);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* --- BÖLÜM 1: Temel Bilgiler --- */}
            <div className="space-y-4">
                {/* Marka Adı */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Marka Adı <span className="text-red-500">*</span></label>
                    <div className="relative group">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Örn: Acme Corp"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                        />
                    </div>
                </div>

                {/* İletişim Bilgileri (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* E-posta */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">E-Posta</label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                            <input
                                type="email"
                                name="email"
                                placeholder="iletisim@marka.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                            />
                        </div>
                    </div>

                    {/* Telefon */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Telefon</label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="0555 000 0000"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-100 w-full" />

            {/* --- BÖLÜM 2: Finansal Model (Retainer) --- */}
            <div className="space-y-4">
                <div className="flex items-center justify-between bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <div className="flex flex-col">
                        <span className="font-heading font-semibold text-zinc-800">Aylık Sabit Çalışma (Retainer)</span>
                        <span className="text-xs text-zinc-500">Bu markanın aylık sabit bir ödemesi var mı?</span>
                    </div>
                    
                    {/* Custom Toggle Switch */}
                    <button
                        type="button"
                        onClick={handleToggleRetainer}
                        className={`relative w-12 h-7 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-yellow
                            ${formData.isRetainer ? 'bg-text-primary' : 'bg-zinc-300'}`}
                    >
                        <span
                            className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center
                                ${formData.isRetainer ? 'translate-x-5' : 'translate-x-0'}`}
                        >
                             {formData.isRetainer && <Check className="w-3 h-3 text-text-primary" />}
                        </span>
                    </button>
                </div>

                {/* Koşullu Alanlar: Sadece Retainer ise görünür */}
                {formData.isRetainer && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in duration-300">
                        {/* Aylık Tutar */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Aylık Tutar (TL)</label>
                            <div className="relative group">
                                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                                <input
                                    type="number"
                                    name="monthlyRetainerAmount"
                                    placeholder="0.00"
                                    min="0"
                                    value={formData.monthlyRetainerAmount}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                                />
                            </div>
                        </div>

                        {/* Ödeme Günü */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Ödeme Günü</label>
                            <div className="relative group">
                                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                                <input
                                    type="number"
                                    name="paymentDay"
                                    placeholder="1-31 arası"
                                    min="1"
                                    max="31"
                                    value={formData.paymentDay}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* --- BUTONLAR --- */}
            <div className="pt-4 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl text-zinc-500 font-medium hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-text-primary text-white font-heading font-semibold hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                    Markayı Kaydet
                </button>
            </div>
        </form>
    );
}

export default BrandsForm;