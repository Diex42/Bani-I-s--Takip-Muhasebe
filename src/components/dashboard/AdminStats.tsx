import { Wallet, TrendingDown, PieChart, Activity, ArrowUpRight, ArrowDownRight,type  LucideIcon } from "lucide-react";

interface AdminStatsProps {
    stats: {
        income: number;
        outcome: number;
        netPotential: number;
        activeProjects: number;
    };
}

export default function AdminStats({ stats }: AdminStatsProps) {
    const fcy = (val: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(val);

    const isProfit = stats.netPotential >= 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. GELİR KARTI */}
            <StatCard 
                title="Beklenen Ciro"
                value={fcy(stats.income)}
                icon={Wallet}
                color="emerald"
                trend="up"
            />

            {/* 2. GİDER KARTI */}
            <StatCard 
                title="Personel Gideri"
                value={fcy(stats.outcome)}
                icon={TrendingDown}
                color="rose"
                trend="down"
            />

            {/* 3. KÂR/ZARAR KARTI */}
            <StatCard 
                title={isProfit ? "Net Kâr" : "Net Zarar"}
                value={fcy(stats.netPotential)}
                icon={PieChart}
                color={isProfit ? "blue" : "orange"} // Kâr mavi, zarar turuncu
                trend={isProfit ? "up" : "down"}
            />

            {/* 4. AKTİF İŞLER KARTI */}
            <StatCard 
                title="Aktif Projeler"
                value={stats.activeProjects}
                suffix="Adet"
                icon={Activity}
                color="violet"
                trend="neutral"
            />
        </div>
    );
}

// --- ALT BİLEŞEN: PREMIUM TASARIM ---

interface StatCardProps {
    title: string;
    value: string | number;
    suffix?: string;
    icon: LucideIcon;
    color: 'emerald' | 'rose' | 'blue' | 'violet' | 'orange';
    trend: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, suffix, icon: Icon, color, trend }: StatCardProps) {
    
    // Renk Haritası (Tailwind sınıflarını dinamik yönetmek için)
    const styles = {
        emerald: { box: 'bg-emerald-500 shadow-emerald-200', text: 'text-emerald-500', bg: 'bg-emerald-50' },
        rose:    { box: 'bg-rose-500 shadow-rose-200',    text: 'text-rose-500',    bg: 'bg-rose-50' },
        blue:    { box: 'bg-blue-600 shadow-blue-200',    text: 'text-blue-600',    bg: 'bg-blue-50' },
        violet:  { box: 'bg-violet-600 shadow-violet-200', text: 'text-violet-600',  bg: 'bg-violet-50' },
        orange:  { box: 'bg-orange-500 shadow-orange-200', text: 'text-orange-500',  bg: 'bg-orange-50' },
    };

    const currentStyle = styles[color];

    return (
        <div className="relative overflow-hidden bg-white rounded-[2rem] p-6 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group">
            
            {/* ARKAPLAN WATERMARK İKONU (SİLİK DEV İKON) */}
            <Icon 
                className={`absolute -right-6 -bottom-6 w-32 h-32 opacity-[0.07] ${currentStyle.text} transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 ease-out`} 
            />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                
                {/* ÜST KISIM: İKON VE BAŞLIK */}
                <div className="flex justify-between items-start">
                    <div className={`p-3.5 rounded-2xl ${currentStyle.box} text-white shadow-lg`}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    
                    {/* Opsiyonel Trend Oku */}
                    {trend !== 'neutral' && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${currentStyle.bg} ${currentStyle.text}`}>
                            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span>Bu Ay</span>
                        </div>
                    )}
                </div>

                {/* ALT KISIM: DEĞER */}
                <div>
                    <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1 pl-1">
                        {title}
                    </h4>
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-zinc-900 tracking-tighter">
                            {value}
                        </span>
                        {suffix && (
                            <span className="text-sm font-bold text-zinc-400 uppercase">{suffix}</span>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}