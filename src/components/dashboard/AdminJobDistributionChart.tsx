import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChart as PieIcon } from "lucide-react";

interface AdminJobDistributionChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}

export default function AdminJobDistributionChart({ data }: AdminJobDistributionChartProps) {
    
    const totalJobs = data.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
            
            {/* 1. BAŞLIK */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-zinc-900 font-black text-lg tracking-tight">İş Dağılımı</h3>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-1">
                        Bu Ayki Operasyon
                    </p>
                </div>
                <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl">
                    <PieIcon size={20} />
                </div>
            </div>

            {/* 2. İÇERİK ALANI (Flex ile Yan Yana) */}
            <div className="flex flex-col lg:flex-row items-center gap-6 flex-1">
                
                {/* SOL: GRAFİK ALANI (Daha Geniş) */}
                <div className="relative w-full lg:w-1/2 h-[250px]">
                    {totalJobs === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm font-medium">
                            Henüz veri yok
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="60%" // Oran kullanarak responsive yaptık
                                    outerRadius="100%" // Alanı tam doldur
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={6}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#18181B', 
                                        border: 'none', 
                                        borderRadius: '12px', 
                                        padding: '8px 12px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}
                                    formatter={(value: any) => [`${value} Adet`, ""]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    )}

                    {/* Ortadaki Toplam Sayı */}
                    {totalJobs > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-4xl font-black text-zinc-800 tracking-tighter">{totalJobs}</span>
                            <span className="text-[10px] uppercase font-bold text-zinc-400">Toplam</span>
                        </div>
                    )}
                </div>

                {/* SAĞ: DETAYLI LEJANT LİSTESİ */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4 pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-zinc-100 pt-4 lg:pt-0">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                {/* Renk Çubuğu */}
                                <div 
                                    className="w-1.5 h-8 rounded-full" 
                                    style={{ backgroundColor: item.color }} 
                                />
                                <div className="flex flex-col">
                                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-wide group-hover:text-zinc-800 transition-colors">
                                        {item.name}
                                    </span>
                                    <span className="text-zinc-900 font-black text-lg">
                                        {item.value} <span className="text-[10px] text-zinc-400 font-medium">Adet</span>
                                    </span>
                                </div>
                            </div>
                            
                            {/* Yüzde Rozeti */}
                            <div className="text-xs font-bold px-2 py-1 rounded-lg bg-zinc-50 text-zinc-500">
                                {totalJobs > 0 ? Math.round((item.value / totalJobs) * 100) : 0}%
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}