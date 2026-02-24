import { formatCurrency } from "../../utils/format";


interface FinanceStatsProps {
    stats: {
        totalPotential: number;
        collected: number;
        receivables: number;
        overdue: number;
        collectionRate: number;
    };
}

function FinanceStats({stats}: FinanceStatsProps) {

    const cardData = [
        {
            title: "TOPLAM CİRO HEDEFİ",
            amount: stats.totalPotential,
            bg: "bg-blue-500/10",
            text: "from-blue-500 to-blue-700",
            border: "border-blue-200",
            subtext: "Bu ayki potansiyel"
        },
        {
            title: "KASA (TAHSİL EDİLEN)",
            amount: stats.collected,
            bg: "bg-emerald-500/10",
            text: "from-emerald-500 to-emerald-700",
            border: "border-emerald-200",
            subtext: `%${stats.collectionRate} Tahsilat Oranı`
        },
        {
            title: "BEKLEYEN ALACAKLAR",
            amount: stats.receivables,
            bg: "bg-amber-500/10",
            text: "from-amber-500 to-amber-700",
            border: "border-amber-200",
            subtext: "Vadesi gelmemiş"
        },
        {
            title: "GECİKMİŞ ÖDEMELER",
            amount: stats.overdue,
            bg: "bg-rose-500/10",
            text: "from-rose-500 to-rose-700",
            border: "border-rose-200",
            subtext: "Vadesi geçmiş"
        },
    ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-5">
        {cardData.map((card, index) => (
            <div
                key={index}
                className={`${card.bg} p-5 rounded-xl shadow-lg flex flex-col items-center gap-2  relative border ${card.border} `}
            >
                <p className="font-heading uppercase font-semibold border-b border-text-muted">{card.title}</p>
                <p className={`text-5xl font-heading font-black bg-linear-to-tl ${card.text} bg-clip-text text-transparent `}>{formatCurrency(card.amount)}</p>
                <p className="font-text font-light text-text-primary">{card.subtext}</p>

                {index === 3 && stats.overdue > 0 && (
                    <div className="absolute bottom-0 rounded-t-lg h-3 w-[75%] flex items-center justify-center py-2 bg-red-500 animate-pulse ">
                        <span className="font-text font-bold text-xs tracking-widest">UYARI !</span>

                    </div>
                )}

            </div>
        ))}
      
    </div>
  )
}

export default FinanceStats
