import { Ban, Wallet } from "lucide-react";
import type { Brand } from "../../types/brand"
import { formatCurrency, getBrandColor } from "../../utils/format";
import { useNavigate } from "react-router-dom";

interface EnhancedBrand extends Brand {
    departmenStats: Record<string, number>;
    activeJobsCount: number;
}

interface BrandCardProps {
    brand: EnhancedBrand;
    isAdmin: boolean;
}


function BrandsCard({ isAdmin, brand }: BrandCardProps) {

    const gradient = getBrandColor(Number(brand.id));
    const navigate = useNavigate();

    return (
        <section className="flex flex-col justify-between w-full bg-bg-card pt-6 px-4 pb-3 gap-3 rounded-xl relative overflow-hidden shadow-2xl ">

            {/*İnce Gradient Çizgi */}
            <div className={`absolute inset-0 w-full h-3 bg-gradient-to-br ${gradient}`}></div>

            {/*Üst Bilgi*/}
            <div className={`flex flex-row justify-between items-center`}>

                {/* Sol Üst Marka İsmi Kısmı*/}
                <div className="">
                    <p className="text-lg font-heading font-bold uppercase text-text-primary">{brand.name}</p>
                </div>

                {/* Sağ Üst Durum Göstergeleri */}
                <div className={`flex flex-row gap-1 items-center px-3 py-1 rounded-2xl overflow-hidden relative`}>
                    <div className={`absolute inset-0 w-full h-full bg-linear-to-tr ${gradient} opacity-25 z-0`}></div>

                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-tr ${gradient} animate-pulse`} />

                    <p className="font-heading font-semibold z-10 text-sm">{brand.activeJobsCount}</p>
                    <span className="text-sm font-text font-semibold text-text-muted">iş</span>
                </div>
            </div>

            {/* Orta Kısım */}
            <div className="flex flex-col items-center justify-center py-4 w-full relative">

                <div className={`absolute left-1/2 -translate-x-1/2 -bottom-3.5 w-[50%] rounded-t-lg flex items-center justify-center bg-linear-to-br ${gradient} cursor-pointer `}
                    onClick={(e) => {
                        e.stopPropagation();

                        navigate(`/isler?search=${encodeURIComponent(brand.name)}`);
                    }}
                >
                    <p className="text-xs font-heading text-text-inverse font-medium tracking-widest">İŞLERİ GÖR</p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 w-full">
                    {Object.entries(brand.departmenStats || {})
                        .filter(([_, count]) => count > 0)
                        .map(([dept, count]) => (
                            <div
                                key={dept}
                                className="flex flex-col items-center justify-between min-w-[90px] p-3 rounded-xl border border-zinc-200 bg-white shadow-sm transition-transform hover:-translate-y-0.5"
                            >
                                {/* ÜST: Departman Başlığı */}
                                <div className="flex items-center gap-1.5 mb-1">
                                    {/* Opsiyonel: Departmana göre minik bir renkli nokta */}
                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${gradient}`}></div>
                                    <span className="text-[10px] font-text font-bold text-text-primary uppercase tracking-wider">
                                        {dept}
                                    </span>
                                </div>

                                {/* ORTA: Sayı ve Açıklama */}
                                <div className="flex items-baseline gap-1">
                                    {/* Sayı: Büyük ve Gradient Renkli */}
                                    <span className={`text-3xl font-black font-text bg-gradient-to-br ${gradient} bg-clip-text text-transparent leading-none`}>
                                        {count}
                                    </span>

                                    {/* Açıklama: Net 'İş' İfadesi */}
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-text font-bold text-text-secondary uppercase">Aktİf</span>
                                        <span className="text-[10px] font-medium text-text-muted">İş</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {/* Boş Durum Kontrolü */}
                    {Object.values(brand.departmenStats || {}).every(c => c === 0) && (
                        <div className="flex flex-col items-center justify-center p-3 border border-dashed border-zinc-200 rounded-xl w-full max-w-[200px]">
                            <span className="text-xs text-zinc-400 italic">Aktif operasyon yok</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Alt Finansal Kısım (Yalnızca Admin) */}
            {isAdmin && (
                <div className="border-t border-dashed border-text-muted grid grid-cols-2 md:grid-cols-3 gap-3 pt-3">

                    {/* Alacak Kısmı */}
                    <div className={`flex flex-col items-center px-2 py-1 gap-1 rounded-lg  relative`}>
                        <div className={`absolute top-1/2 left-1/2 -translate-1/2 w-9 h-9 rounded-full blur-sm animate-pulse z-0
                            ${brand.currentDebt > 0 ? 'bg-negative/40' : 'bg-positive/40'} `}></div>
                        {/* <div className={`w-2 h-2 rounded-full animate-pulse ${brand.currentDebt > 0 ? 'bg-negative' : 'bg-positive'} `}></div> */}
                        <span className="text-sm font-text border-b border-text-muted z-10">Borç</span>
                        {brand.currentDebt > 0 ? (
                            <span className="text-sm font-heading font-black z-10">{formatCurrency(brand.currentDebt)}</span>
                        ) : (
                            <Ban className="w-4 h-4 text-text-muted z-10" />
                        )}
                    </div>


                    {/* Aylık Ücret Kısmı */}
                    <div className="flex flex-col items-center justify-center">
                        <Wallet className="w-4 h-auto text-text-primary " />
                        {brand.isRetainer ? (
                            <p className="text-sm font-text">
                                {formatCurrency(brand.monthlyRetainerAmount)}
                                <span className="ml-1 text-text-muted">/ Ay</span>
                            </p>
                        ) : (
                            <span className="text-sm font-text italic">Proje Bazlı</span>
                        )}

                    </div>


                    {/* Ödeme Tarihi */}
                    <div className="flex flex-col items-center justify-center col-span-2 md:col-span-1">
                        {/* <CalendarSync className="w-4 h-auto text-text-primary"/> */}
                        <p className="text-sm font-heading">Ödeme Günü</p>
                        {brand.paymentDay ? (
                            <p className="text-xs font-text text-text-muted flex items-center gap-0.5">
                                Ayın <span className={`bg-linear-to-br ${gradient} bg-clip-text text-transparent text-lg`}>{brand.paymentDay}</span>'i
                            </p>
                        ) : (
                            <Ban className="w-4 h-4 text-text-muted" />
                        )}

                    </div>


                </div>
            )}


        </section>
    )
}

export default BrandsCard
