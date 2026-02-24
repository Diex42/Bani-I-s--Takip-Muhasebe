import { Eye, EyeOff, Mail, Phone, ShieldCheck, MoreVertical, Edit, Trash2 } from "lucide-react"; // İkonlar eklendi
import type { User } from "../../types/user";
import { useState, useRef, useEffect } from "react";
import { formatCurrency, getInitials } from "../../utils/format";

interface TeamCardProps {
    user: User;
    isAdmin: boolean;
    onEdit: (user: User) => void;  // <-- YENİ: Düzenle tıklandı
    onDelete: (id: string) => void; // <-- YENİ: Sil tıklandı
}

function TeamCard({ user, isAdmin, onEdit, onDelete }: TeamCardProps) {
    
    const [showSalary, setShowSalary] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açık mı?
    const menuRef = useRef<HTMLDivElement>(null); // Menü dışına tıklamayı algılamak için

    // Menü dışına tıklanınca kapat
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="group relative bg-white rounded-2xl border border-zinc-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-visible flex flex-col">
            
            {/* 1. HEADER (Gradient) */}
            <div className={`h-14 w-full flex justify-center relative bg-gradient-to-r ${user.colorTheme} rounded-t-2xl`}>
                
                <p className="font-heading text-3xl tracking-widest text-text-inverse/30 font-bold uppercase ">
                    {user.department}
                </p>

                {/* --- 3 NOKTA MENÜSÜ (Sadece Admin) --- */}
                {isAdmin && (
                    <div className="absolute top-2 right-2 z-20" ref={menuRef}>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-1 rounded-full text-white/80 hover:bg-white/20 transition-colors"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {/* Dropdown Menü */}
                        {isMenuOpen && (
                            <div className="absolute right-0 top-8 w-32 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                <button 
                                    onClick={() => { setIsMenuOpen(false); onEdit(user); }}
                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                                >
                                    <Edit size={14} />
                                    Düzenle
                                </button>
                                <button 
                                    onClick={() => { setIsMenuOpen(false); onDelete(user.id); }}
                                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-zinc-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-2 transition-colors border-t border-zinc-50"
                                >
                                    <Trash2 size={14} />
                                    Sil
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ... (Avatar, İsim, İletişim, Maaş kısımları AYNI kalacak) ... */}
            {/* 2. AVATAR VE KİMLİK */}
            <div className="flex flex-col items-center -mt-8 px-4 relative z-10">
                <div className={`w-16 h-16 rounded-full border-[3px] border-white shadow-sm flex items-center justify-center bg-gradient-to-br ${user.colorTheme}`}>
                    <span className="font-heading font-bold text-lg text-white tracking-widest">
                        {getInitials(user.fullname)}
                    </span>
                </div>
                {/* ... İsim ve Rol ... */}
                <div className="text-center mt-2 mb-4">
                    <h3 className="text-lg font-heading font-bold text-zinc-800 leading-tight group-hover:text-blue-600 transition-colors">
                        {user.fullname}
                    </h3>
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">
                        {user.role}
                    </span>
                </div>
                {/* ... İletişim ... */}
                 <div className="w-full space-y-2 mb-4">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 border border-zinc-100 group-hover:border-blue-100 transition-colors">
                        <Mail size={14} className="text-zinc-400 shrink-0" />
                        <span className="text-xs font-medium text-zinc-600 truncate" title={user.email}>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 border border-zinc-100 group-hover:border-blue-100 transition-colors">
                        <Phone size={14} className="text-zinc-400 shrink-0" />
                        <span className="text-xs font-medium text-zinc-600 truncate">{user.number}</span>
                    </div>
                </div>
            </div>

            {/* 4. MAAŞ FOOTER */}
            {isAdmin && (
                <div className="mt-auto border-t border-zinc-100 bg-zinc-50/30 px-4 py-2 flex items-center justify-between h-10">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                        <ShieldCheck size={12} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Maaş</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`text-sm font-heading font-bold text-zinc-700 transition-all duration-300 ${!showSalary ? 'blur-sm select-none' : ''}`}>
                            {formatCurrency(user.salary)}
                        </div>
                        <button onClick={() => setShowSalary(!showSalary)} className="text-zinc-400 hover:text-blue-600 transition-colors">
                            {showSalary ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeamCard;