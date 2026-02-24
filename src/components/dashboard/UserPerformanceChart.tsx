import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Zap } from "lucide-react";

interface UserPerformanceChartProps {
    data: any[];
    activeCount: number;
}

export default function UserPerformanceChart({ data, activeCount }: UserPerformanceChartProps) {

    return (
        <div className="flex flex-col gap-6 h-full">
            
            {/* 1. KART: AKTİF İŞ SAYISI (KPI) */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-[2rem] shadow-lg shadow-indigo-200 text-white relative overflow-hidden group">
                {/* Arka plan süsü */}
                <Zap className="absolute -right-4 -bottom-4 text-white opacity-10 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Zap size={20} className="text-white" />
                        </div>
                        <span className="text-indigo-100 text-xs font-bold uppercase tracking-wider">Mevcut Yükün</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-5xl font-black tracking-tighter">{activeCount}</h3>
                        <span className="text-lg font-medium text-indigo-200">Aktif İş</span>
                    </div>
                    <p className="mt-2 text-indigo-200 text-xs font-medium">
                        Şu an üzerinde çalıştığın ve revizede olan toplam proje sayısı.
                    </p>
                </div>
            </div>

            {/* 2. KART: PASTA GRAFİK */}
            <div className="bg-white p-6 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 flex flex-col">
                <h4 className="text-zinc-900 font-bold text-sm mb-4">Aylık Dağılımın</h4>
                
                <div className="flex-1 min-h-[200px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={5}
                            >
                                {data.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181B', border: 'none', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                formatter={(value: any) => [`${value} Adet`, ""]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    
                    {/* Lejant (Grafik Altı) */}
                    <div className="flex justify-center gap-3 mt-[-20px]">
                         {data.map((item, i) => (
                             <div key={i} className="flex items-center gap-1.5">
                                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-[10px] font-bold text-zinc-500 uppercase">{item.name}</span>
                             </div>
                         ))}
                    </div>
                </div>
            </div>

        </div>
    );
}