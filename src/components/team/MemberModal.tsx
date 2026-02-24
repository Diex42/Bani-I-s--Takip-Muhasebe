import { X, User as UserIcon, Mail, Phone, Briefcase, DollarSign, Check, Palette } from "lucide-react";
import { useState, useEffect } from "react";

// --- KRİTİK AYRIM: IMPORTLARI AYIRDIK ---
// 1. Sabitler ve Enumlar
import { type UserRole, type Department, DEPARTMENTS } from "../../types/enum"; 
// 2. User Tipi (Interface)
import type { User } from "../../types/user"; 

interface MemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    userToEdit?: User | null; // <-- Doluysa Düzenle, Boşsa Ekle Modu
    onSave: (data: any) => void;
}

// Kart renk seçenekleri
const THEME_OPTIONS = [
    { name: "Mavi", value: "from-blue-500 to-indigo-600", bg: "bg-blue-500" },
    { name: "Yeşil", value: "from-emerald-400 to-teal-600", bg: "bg-emerald-500" },
    { name: "Turuncu", value: "from-orange-400 to-red-500", bg: "bg-orange-500" },
    { name: "Mor", value: "from-purple-500 to-pink-600", bg: "bg-purple-500" },
    { name: "Siyah", value: "from-zinc-700 to-zinc-900", bg: "bg-zinc-800" },
];

export default function MemberModal({ isOpen, onClose, userToEdit, onSave }: MemberModalProps) {
    
    // Mod Kontrolü: userToEdit var mı?
    const isEditMode = !!userToEdit;

    // --- FORM STATE'LERİ ---
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState<UserRole>('User');
    const [department, setDepartment] = useState<Department>(DEPARTMENTS[0]);
    const [salary, setSalary] = useState("");
    const [selectedTheme, setSelectedTheme] = useState(THEME_OPTIONS[0].value);

    // --- AÇILIŞ MANTIĞI ---
    useEffect(() => {
        if (isOpen) {
            if (userToEdit) {
                // DÜZENLEME MODU: Mevcut verileri forma bas
                setFullname(userToEdit.fullname);
                setEmail(userToEdit.email);
                setPhone(userToEdit.number); // User tipinde 'number', formda 'phone'
                setRole(userToEdit.role);
                setDepartment(userToEdit.department);
                setSalary(userToEdit.salary.toString());
                setSelectedTheme(userToEdit.colorTheme);
            } else {
                // EKLEME MODU: Formu sıfırla
                setFullname("");
                setEmail("");
                setPhone("");
                setRole('User');
                setDepartment(DEPARTMENTS[0]);
                setSalary("");
                setSelectedTheme(THEME_OPTIONS[0].value);
            }
        }
    }, [isOpen, userToEdit]);

    // --- KAYDETME ---
    const handleSubmit = () => {
        if (!fullname || !email || !salary) {
            alert("Lütfen zorunlu alanları (İsim, Email, Maaş) doldurun.");
            return;
        }

        // Form verisini hazırla
        const formData = {
            ...(isEditMode && { id: userToEdit.id }), // Düzenleme ise ID'yi koru, yoksa ID koyma (Backende bırak)
            fullname,
            email,
            number: phone || "Belirtilmedi",
            role,
            department,
            salary: Number(salary),
            colorTheme: selectedTheme
        };

        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={onClose}>
            
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                
                {/* --- HEADER (DİNAMİK) --- */}
                <div className="bg-zinc-50 border-b border-zinc-100 p-6 flex justify-between items-center">
                    <div>
                        <h3 className="font-heading font-bold text-xl text-zinc-800">
                            {isEditMode ? "Personel Düzenle" : "Yeni Personel Ekle"}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            {isEditMode ? "Mevcut personel bilgilerini güncelle." : "Takıma yeni bir çalışma arkadaşı ekle."}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors text-zinc-400 hover:text-red-500">
                        <X size={24} />
                    </button>
                </div>

                {/* --- FORM BODY --- */}
                <div className="p-6 space-y-6">
                    
                    {/* 1. SATIR: İsim ve Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">AD SOYAD *</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input 
                                    type="text" 
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder="Ad Soyad" 
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all font-bold text-zinc-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">EMAIL *</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ornek@sirket.com" 
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. SATIR: Telefon ve Departman */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">TELEFON</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="05XX..." 
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all text-sm"
                                />
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">DEPARTMAN</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <select 
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value as Department)}
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all text-sm appearance-none cursor-pointer"
                                >
                                    {DEPARTMENTS.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept.replace('_', ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 3. SATIR: Rol ve Maaş */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">ROL</label>
                            <select 
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                                className="w-full px-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all text-sm cursor-pointer"
                            >
                                <option value="User">User (Personel)</option>
                                <option value="Admin">Admin (Yönetici)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">MAAŞ (₺) *</label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 text-zinc-400" size={18} />
                                <input 
                                    type="number" 
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="0.00" 
                                    className="w-full pl-10 pr-3 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-400 transition-all font-heading font-black text-zinc-800"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. SATIR: Renk Teması */}
                    <div className="space-y-2 pt-2 border-t border-dashed border-zinc-200">
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1 flex items-center gap-2">
                            <Palette size={14} />
                            KART RENGİ
                        </label>
                        <div className="flex gap-3">
                            {THEME_OPTIONS.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => setSelectedTheme(theme.value)}
                                    className={`w-8 h-8 rounded-full ${theme.bg} flex items-center justify-center transition-transform hover:scale-110 ring-2 ring-offset-2 ${selectedTheme === theme.value ? 'ring-zinc-400 scale-110' : 'ring-transparent'}`}
                                    title={theme.name}
                                >
                                    {selectedTheme === theme.value && <Check size={14} className="text-white" />}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>

                {/* --- FOOTER (DİNAMİK) --- */}
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-500 hover:bg-zinc-200 transition-colors">
                        Vazgeç
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="flex-[2] py-3 px-4 rounded-xl font-bold text-white bg-zinc-900 hover:bg-zinc-800 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Check size={18} />
                        {isEditMode ? "Değişiklikleri Kaydet" : "Listeye Ekle"}
                    </button>
                </div>

            </div>
        </div>
    )
}