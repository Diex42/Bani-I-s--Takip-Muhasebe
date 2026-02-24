import { CalendarDays, CircleCheckBig, Repeat, SearchX, Wallet, Zap } from "lucide-react";
import type { Finance } from "../../types/finance"
import { formatCurrency, formatDate } from "../../utils/format";

interface FinanceListProps {
    data: Finance[];
    onPaymentClick: (item:Finance) => void;
}

function FinanceList({ data, onPaymentClick }: FinanceListProps) {

    // Data boş mu dolu mu kontrolü
    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-5 bg-white rounded-3xl border border-dashed border-zinc-300 text-zinc-400 mt-8">
                <div className="bg-zinc-50 p-4 rounded-full mb-3">
                    <SearchX className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-bold text-zinc-600">Sonuç Bulunamadı</h3>
                <p className="text-sm">Seçilen kriterlere uygun bir kayıt yok.</p>
            </div>
        )
    }


    return (
        <div className="w-full mx-10 mt-10 bg-white rounded-4xl border border-text-muted">
            <div className="hidden md:grid grid-cols-12 px-12   py-1 rounded-t-4xl bg-gray-300/50 font-heading font-bold text-lg ">
                <div className="col-span-5">MARKA</div>
                <div className="col-span-4">DURUM</div>
                <div className="col-span-2">TUTAR</div>
                <div className="col-span-1">İŞLEM</div>
            </div>

            {data.map((item) => (
                <div
                    key={item.id}
                    className=" "
                >
                    {/* Masaüstü */}
                    <div className="hidden md:grid grid-cols-12 py-3 px-12 border-b border-gray-200">
                        {/* Marka */}
                        <div className="col-span-5 grid grid-cols-6  ">
                            <div className="col-span-1">
                                {item.sourceType === 'RETAINER' ? (
                                    <Repeat className="w-7 h-7 text-blue-700" />
                                ) : item.sourceType === 'JOB' ? (
                                    <Zap className="w-7 h-7 text-orange-700" />
                                ) : null}
                            </div>

                            <p className="col-span-2 flex flex-col justify-center font-heading font-black text-lg text-text-primary leading-none">
                                {item.brandName}
                                <span className="font-text font-bold text-xs text-text-muted">{item.sourceType === 'RETAINER' ? 'Aylık Ödeme' : item.sourceType === 'JOB' ? 'Ekstra İş' : null}</span>
                            </p>

                            <p className="col-span-3 font-text font-light text-text-primary flex items-center">{item.description}</p>
                        </div>

                        {/* Durum */}
                        <div className="col-span-4 grid grid-cols-8 ">
                            <div className={`rounded-lg px-2 col-span-2 flex items-center justify-center drop-shadow-md
                            ${item.status === 'PAID' ? 'bg-emerald-500 drop-shadow-emerald-400' : item.status === 'PENDING' ? 'bg-amber-500 drop-shadow-amber-400' : item.status === 'OVERDUE' ? 'bg-rose-500 drop-shadow-rose-400' : ''}`}
                            >
                                <p className="font-text text-nowrap text-xs tracking-wide text-text-inverse">
                                    {item.status === 'PAID' ? 'ÖDENDİ' : item.status === 'PENDING' ? 'ÖDEME BEKLİYOR' : 'GECİKMİŞ ÖDEME'}
                                </p>
                            </div>
                            <div className="col-span-5 col-start-4 flex items-center ">
                                {item.status === 'PAID' ? (
                                    <div className="">
                                        <p className="font-text font-medium">Tahsil : <span className="text-emerald-500 font-bold">{formatDate(item.paymentDate)}</span></p>
                                    </div>
                                ) : item.status === 'PENDING' ? (
                                    <div>
                                        <p className="font-text font-medium">Vade : <span className="text-amber-500 font-bold">{formatDate(item.dueDate)}</span></p>
                                    </div>
                                ) : item.status === 'OVERDUE' ? (
                                    <div>
                                        <p className="font-text font-medium">Vade : <span className="text-rose-500 font-bold">{formatDate(item.dueDate)}</span></p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {/* Tutar */}
                        <div className="col-span-2 flex items-center">
                            {item.status === 'PAID' ? (
                                <p className="font-heading font-bold text-lg line-through text-text-muted decoration-text-primary ">{formatCurrency(item.amount)}</p>
                            ) : item.status === 'PENDING' || item.status === 'OVERDUE' ? (
                                <p className="font-heading font-bold text-lg">{formatCurrency(item.amount)}</p>
                            ) : null}
                        </div>
                        {/* İşlem */}
                        <div className="col-span-1 flex items-center  ">
                            {item.status === 'PAID' ? (
                                <div className="w-7 h-7 rounded-full p-1 bg-emerald-100 flex items-center justify-center" title="Ödeme Alındı">
                                    <CircleCheckBig className=" text-emerald-500" />
                                </div>
                            ) : item.status === 'PENDING' || item.status === 'OVERDUE' ? (
                                <button
                                    className="flex flex-row items-center justify-center cursor-pointer gap-1 bg-white px-2 py-1 rounded-xl shadow-md border border-gray-300 hover:bg-blue-500/50 transition-all hover:shadow-blue-500"
                                    onClick={() => onPaymentClick(item)}
                                >
                                    <Wallet className="w-5 h-auto text-text-primary" />
                                    <button className="text-sm font-text  "
                                        
                                    >
                                        Tahsilat Gir
                                    </button>
                                </button>
                            ) : null}
                        </div>
                    </div>
                    
                    {/* Mobil Kısım */}
                    <div className="md:hidden flex flex-col p-4 gap-3 border-b border-gray-200">
                            
                            {/* Üst: Marka ve Tutar */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 
                                        ${item.sourceType === 'RETAINER' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                        {item.sourceType === 'RETAINER' ? <Repeat size={18} /> : <Zap size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-heading font-bold text-zinc-800">{item.brandName}</p>
                                        <p className="text-xs text-zinc-400 font-medium">{item.sourceType === 'RETAINER' ? 'Aylık Sabit' : 'Ekstra Proje'}</p>
                                    </div>
                                </div>
                                <p className={`font-heading font-bold text-lg ${item.status === 'PAID' ? 'text-zinc-300 line-through' : 'text-zinc-800'}`}>
                                    {formatCurrency(item.amount)}
                                </p>
                            </div>

                            {/* Orta: Açıklama */}
                            <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                                <p className="text-xs text-zinc-600 line-clamp-2">{item.description}</p>
                            </div>

                            {/* Alt: Durum, Tarih ve Aksiyon */}
                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-2">
                                    {/* Durum Rozeti */}
                                    <span className={`w-2.5 h-2.5 rounded-full 
                                        ${item.status === 'PAID' ? 'bg-emerald-500' : item.status === 'PENDING' ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                    />
                                    <span className={`text-xs font-bold 
                                        ${item.status === 'PAID' ? 'text-emerald-600' : item.status === 'PENDING' ? 'text-amber-600' : 'text-rose-600'}`}>
                                        {item.status === 'PAID' ? 'Ödendi' : item.status === 'PENDING' ? 'Ödeme Bekliyor' : 'Gecikmiş Ödeme'}
                                    </span>
                                    <span className="text-zinc-300 text-xs">•</span>
                                    <span className="text-xs text-zinc-500 font-medium flex items-center gap-1">
                                        <CalendarDays size={12} />
                                        {formatDate(item.status === 'PAID' ? item.paymentDate : item.dueDate)}
                                    </span>
                                </div>

                                {/* Mobil Aksiyon Butonu */}
                                {item.status !== 'PAID' && (
                                    <button className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                                        onClick={() => onPaymentClick}
                                    >
                                        <Wallet size={12} />
                                        Tahsil Et
                                    </button>
                                )}
                            </div>

                        </div>

                </div>
            ))}


        </div>
    )
}

export default FinanceList
