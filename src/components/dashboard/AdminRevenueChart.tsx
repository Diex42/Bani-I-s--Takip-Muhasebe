import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

interface RevenueChartProps {
    data: {
        name: string;
        value: number;
    }[];
}

export default function AdminRevenueChart({ data }: RevenueChartProps) {
    
    const formatCurrency = (value: number) => 
        new Intl.NumberFormat('tr-TR', { 
            style: 'currency', 
            currency: 'TRY', 
            maximumFractionDigits: 0 
        }).format(value);

    const formatYAxis = (value: number) => {
        if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
        return value.toString();
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
            
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="text-zinc-900 font-black text-lg tracking-tight">Gelir Trendi</h3>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-1">Son 6 Ayın Finansal Özeti</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <TrendingUp size={20} />
                </div>
            </div>

            <div className="flex-1 w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E4E7" />

                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 600 }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#A1A1AA', fontSize: 12, fontWeight: 600 }} 
                            tickFormatter={formatYAxis}
                        />

                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#18181B', 
                                border: 'none', 
                                borderRadius: '12px', 
                                padding: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                            // HATA BURADAYDI: value tipini 'any' yaparak çözdük
                            formatter={(value: any) => [formatCurrency(Number(value)), "Gelir"]}
                            labelStyle={{ display: 'none' }}
                            cursor={{ stroke: '#10B981', strokeWidth: 2, strokeDasharray: '4 4' }}
                        />

                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#10B981" 
                            strokeWidth={4} 
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                            activeDot={{ r: 8, strokeWidth: 0, fill: '#059669' }} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}