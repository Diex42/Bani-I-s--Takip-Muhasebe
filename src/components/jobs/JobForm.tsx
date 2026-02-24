import { useState, useEffect } from "react";
import { Briefcase, Building2, Users, FileText, DollarSign, X } from "lucide-react";
import { Mock_Brands, Mock_Users } from "../../data/mock"; // Mock verilerini buradan çekiyoruz
import { DEPARTMENTS } from "../../types/enum";
import type { Job } from "../../types/job";

interface JobFormProps {
    onSuccess: () => void;
    onSubmit?: (jobData: Partial<Job>) => void;
}

function JobForm({ onSuccess, onSubmit }: JobFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        brandId: "",
        department: "Yazılım",
        startDate: new Date().toISOString().split('T')[0],
        dueDate: "",
        isRetainerIncluded: true,
        price: "",
        assignedUserIds: [] as string[], // Sadece ID'leri tutuyoruz
    });

    // Marka seçildiğinde, markanın retainer durumuna göre switch'i ayarla
    useEffect(() => {
        if (formData.brandId) {
            const selectedBrand = Mock_Brands.find(b => b.id === formData.brandId);
            if (selectedBrand) {
                setFormData(prev => ({
                    ...prev,
                    isRetainerIncluded: selectedBrand.isRetainer
                }));
            }
        }
    }, [formData.brandId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleToggleRetainer = () => {
        setFormData(prev => ({ ...prev, isRetainerIncluded: !prev.isRetainerIncluded }));
    };

    // Kullanıcı Seçimi Mantığı
    const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value;
        if (!userId) return;

        setFormData(prev => {
            const currentIds = prev.assignedUserIds;
            // Eğer zaten seçiliyse listeden çıkar, değilse ekle
            if (currentIds.includes(userId)) {
                return { ...prev, assignedUserIds: currentIds.filter(id => id !== userId) };
            } else {
                return { ...prev, assignedUserIds: [...currentIds, userId] };
            }
        });
    };

    const handleRemoveUser = (userId: string) => {
        setFormData(prev => ({
            ...prev,
            assignedUserIds: prev.assignedUserIds.filter(id => id !== userId)
        }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. ID'leri kullanarak gerçek User objelerini Mock_Users içinden buluyoruz
        // Bu işlem Type-Safe'dir çünkü Mock_Users zaten User[] tipindedir.
        const selectedUsers = Mock_Users.filter(user => formData.assignedUserIds.includes(user.id));

        const newJobData: Partial<Job> = {
            title: formData.title,
            description: formData.description,
            brandId: formData.brandId,
            // @ts-ignore: Enum tip eşleşmesi için
            department: formData.department,
            startDate: formData.startDate,
            dueDate: formData.dueDate,
            isRetainerIncluded: formData.isRetainerIncluded,
            price: !formData.isRetainerIncluded && formData.price ? Number(formData.price) : 0,
            status: "In_Progress",
            assignedTo: selectedUsers // Doğrudan atayabiliriz
        };

        console.log("Kaydedilecek İş:", newJobData);

        if (onSubmit) onSubmit(newJobData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSave} className="p-6 space-y-6">

            {/* --- BÖLÜM 1: Temel Bilgiler --- */}
            <div className="space-y-4">
                {/* İş Başlığı */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">İş Başlığı <span className="text-red-500">*</span></label>
                    <div className="relative group">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                        <input
                            type="text" name="title" required value={formData.title} onChange={handleChange}
                            placeholder="Örn: Instagram Post Tasarımı"
                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Marka Seçimi */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Marka <span className="text-red-500">*</span></label>
                        <div className="relative group">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                            <select
                                name="brandId" required value={formData.brandId} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow appearance-none cursor-pointer"
                            >
                                <option value="">Marka Seçiniz</option>
                                {Mock_Brands.map((brand) => (
                                    <option value={brand.id} key={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Departman Seçimi */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Departman</label>
                        <div className="relative group">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-button-yellow transition-colors" />
                            <select
                                name="department" value={formData.department} onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow appearance-none cursor-pointer"
                            >
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-zinc-100 w-full" />

            {/* --- BÖLÜM 2: Finans ve Zamanlama --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Sol: Retainer ve Fiyat */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                        <div className="flex flex-col">
                            <span className="text-sm font-heading font-semibold text-zinc-800">Retainer Dahil mi?</span>
                            <span className="text-[10px] text-zinc-500">Bu iş aylık pakete mi ait?</span>
                        </div>
                        <button
                            type="button"
                            onClick={handleToggleRetainer}
                            className={`relative w-10 h-6 rounded-full transition-colors duration-300 ${formData.isRetainerIncluded ? 'bg-button-yellow' : 'bg-zinc-300'}`}
                        >
                            <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow transition-transform duration-300 ${formData.isRetainerIncluded ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    {/* Fiyat Alanı (Sadece Retainer Değilse Görünür) */}
                    {!formData.isRetainerIncluded && (
                        <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Ekstra Ücret (TL)</label>
                            <div className="relative group">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-green-600 transition-colors" />
                                <input
                                    type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-zinc-200 rounded-xl outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sağ: Tarihler */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Başlangıç</label>
                            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-button-yellow focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Teslim</label>
                            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange}
                                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:border-button-yellow focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- BÖLÜM 3: Ekip ve Detay --- */}
            <div className="space-y-4">
                {/* Ekip Atama */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">İşi Kime Atayacaksın?</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                        <select
                            onChange={handleUserSelect}
                            className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow appearance-none cursor-pointer text-sm"
                            value="" // Her seçimden sonra sıfırlanır
                        >
                            <option value="" disabled>Personel Seç...</option>
                            {Mock_Users.map(user => {
                                const isSelected = formData.assignedUserIds.includes(user.id);
                                return (
                                    <option key={user.id} value={user.id}>
                                        {/* Seçiliyse TİK işareti koy */}
                                        {isSelected ? "✓ " : ""}

                                        {/* Departman bilgisini köşeli parantez içinde göster */}
                                        [{user.department}] {user.fullname}
                                    </option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Seçilen Personeller (Pill Listesi) - Burası Aynı Kalıyor */}
                    <div className="flex flex-wrap gap-2 mt-2 min-h-[30px]">
                        {formData.assignedUserIds.length === 0 && (
                            <span className="text-xs text-zinc-400 italic pl-1">Henüz kimse seçilmedi.</span>
                        )}
                        {formData.assignedUserIds.map(id => {
                            const user = Mock_Users.find(u => u.id === id);
                            if (!user) return null;
                            return (
                                <div key={id} className="flex items-center gap-1.5 pl-2.5 pr-1 py-1 bg-green-50 border border-green-200 rounded-full group hover:border-red-200 transition-colors">
                                    <span className="text-[10px] uppercase font-bold text-zinc-400">{user.department}</span>
                                    <span className="text-xs font-semibold text-zinc-700">{user.fullname}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveUser(id)}
                                        className="p-0.5 rounded-full text-zinc-400 hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Açıklama */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Açıklama</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                        <textarea
                            name="description" value={formData.description} onChange={handleChange}
                            placeholder="İşin detaylarını buraya girin..."
                            className="w-full h-24 pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-button-yellow focus:ring-1 focus:ring-button-yellow resize-none"
                        ></textarea>
                    </div>
                </div>
            </div>

            {/* --- BUTONLAR --- */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
                <button
                    type="button" onClick={onSuccess}
                    className="px-6 py-2.5 rounded-xl text-zinc-500 font-medium hover:bg-zinc-100 hover:text-zinc-800 transition-colors"
                >
                    İptal
                </button>
                <button
                    type="submit"
                    className="px-8 py-2.5 rounded-xl bg-text-primary text-white font-heading font-semibold hover:bg-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                    İşi Kaydet
                </button>
            </div>
        </form>
    );
}

export default JobForm;