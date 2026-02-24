import { CircleCheck, CreditCard, Ellipsis, Flag, Package, RotateCcw, SquarePen } from "lucide-react"
import type { Job } from "../../types/job";
import { formatCurrency, formatDate, getShortName } from "../../utils/format";
import { useEffect, useRef, useState } from "react";

const Department_Styles: Record<string, string> = {
    Yazılım: "bg-blue-100 text-blue-700 border-blue-200",
    Grafik: "bg-purple-100 text-purple-700 border-purple-200",
    "Sosyal Medya": "bg-rose-100 text-rose-700 border-rose-200",
    Video: "bg-orange-100 text-orange-700 border-orange-200",
    "3D": "bg-emerald-100 text-emerald-700 border-emerald-200",
    Yönetim: "bg-zinc-100 text-zinc-700 border-zinc-200",
}

const Default_Style = "bg-zinc-100 text-zinc-700 border-zinc-200";

interface JobCardProps {
    job: Job
    variantStyle: string
    onReviseClick: () => void;
    onCompleteClick?: () => void;
}

function JobsCard({ job, variantStyle, onReviseClick, onCompleteClick }: JobCardProps) {

    const badgeStyle = Department_Styles[job.department] || Default_Style

    {/*3 noktaya basılınca açılan küçük menü */}
    const [MenuOpen, setMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null); // Menü Sınırlarını Belirleyen Ref.

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Eğer menü açıksa VE tıklanan yer menünün içi DEĞİLSE -> Kapat
            if (MenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        // Siteye tıklama dinleyicisi ekle
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [MenuOpen]); // menuOpen değişince bu ayarı güncelle


    const isAdmin = true; //Admin kontrolü için 


    return (
        <div  className={`flex flex-col relative justify-between gap-4 rounded-lg ${variantStyle} border border-border p-4 w-full transition-all duration-300 shadow-md hover:-translate-y-1 hover:border-button-yellow hover:shadow-xl 
    `}>

            {job.dueDate && new Date(job.dueDate) < new Date() ? (
                <div className="absolute left-2 -top-4 px-2 py-0.5 border-negative/20 border rounded-md shadow-sm bg-red-500">
                <span className="text-xs font-text text-text-inverse font-bold">TESLİM TARİHİ GECİKTİ</span>
            </div>
            ) : (
                <></>
            )}
            

            {/*Üst Bilgi*/}
            <div className="flex flex-row justify-between items-center relative" ref={menuRef}>
                <div className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-xl">
                    <p className="text-xs uppercase font-text font-bold text-text-muted tracking-widest">{job.brand?.name}</p>
                </div>

                {/*İşle Alakalı İşlem Butonu */}
                <button onClick={() => setMenuOpen(prev => !prev)} className="">
                    <Ellipsis className="w-5 h-5 text-text-primary" />
                </button>

                {/* İşi Tamamla Butonuna basılınca job.status tamamlandı olarak güncellenecek. */}
                {MenuOpen && (
                    <>
                        <div className="absolute top-5 right-0 rounded-lg border border-gray-400 bg-bg">
                            {(job.status === 'In_Progress' || job.status === 'Revision') && (
                                <button
                                    onClick={() => {
                                        if (onCompleteClick) onCompleteClick();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 flex "
                                >
                                    <div className="flex flex-row items-center gap-1 hover:bg-positive-bg transition-colors w-full">
                                        <CircleCheck className="w-4 h-4"/>
                                        <span className="text-sm font-text text-positive ">İşi Tamamla</span>
                                    </div>
                                </button>
                            )}
                            {/*Revize modali açılacak ve açıklama girilecek. job.status revize olarak güncellenecek */}
                            {job.status === 'Done' && isAdmin && (
                                <button
                                    onClick={() => {
                                        onReviseClick();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 flex "
                                >
                                    <div className="flex flex-row items-center gap-1 hover:bg-warning-bg transition-colors w-full">
                                        <RotateCcw className="w-4 h-4"/>
                                        <span className="text-sm font-text text-warning ">Revize İste</span>
                                    </div>
                                </button>
                            )}
                        
                        </div>
                    </>
                ) }

            </div>

            {/*Ana içerik*/}
            <div className="flex flex-col items-center text-center">

                <p className="font-heading font-bold text-lg text-text-primary line-clamp-2">{job.title}</p>

                <p className={`${badgeStyle} py-1 px-2 rounded-xl text-xs font-text mb-3`}>
                    {job.department}
                </p>

                <p className="text-sm h-[3.5rem] font-text text-text-primary line-clamp-3 leading-snug " title={job.description}>
                    {job.description}
                </p>

            </div>

            {/*Zaman Bilgisi Kısmı*/}
            <div className={`flex flex-row items-center justify-between py-2 rounded-xl px-2 `}>
                <div className="flex flex-row items-center gap-2">
                    <SquarePen className="w-5 h-5 text-text-secondary" />
                    <p className="font-text text-sm text-text-primary">{formatDate(job.startDate)}</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <Flag className="w-5 h-5 text-text-secondary" />
                    <p className="font-text text-sm text-text-primary">{formatDate(job.dueDate)}</p>
                </div>

            </div>

            {/*Alt Bilgi Kısmı*/}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-4">

                <div className="flex items-center">
                    {job.isRetainerIncluded ? (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-600">
                            <Package className="w-3.5 h-3.5" />
                            <span className="text-xs font-text">Aylık Pakete Dahil</span>

                        </div>

                    ) : (isAdmin ? (
                        <div className="flex items-center gap-2">

                            <div className={`flex items-center gap-1.5 text-text-primary px-2 py-1 rounded-md ${job.paymentStatus === 'Paid' ? 'bg-positive/20' : 'bg-negative/20'}`}>
                                <CreditCard className="w-3.5 h-3.5 text-text-secondary" />
                                <span className="text-xs font-text font-semibold tracking-tight">
                                    {formatCurrency(job.price)}
                                </span>
                                <span className={`font-text text-xs text-text-primary`}>
                                    {job.paymentStatus === 'Paid' ? "Ödendi" : "Bekleniyor"}
                                </span>

                            </div>

                        </div>
                    ) : (
                        <div>

                        </div>
                    )


                    )}

                </div>

                {/*İşi Kimin Yapacağı Kısmı */}
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                    {job.assignedTo.slice(0, 2).map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-50 border border-zinc-100 shadow-sm "
                        >
                            <div className={`w-3 h-3 rounded-full bg-linear-to-br ${item.colorTheme || 'from-gray-400 to-gray-600'}`}></div>

                            <span className="text-xs font-text text-text-primary whitespace-nowrap">
                                {getShortName(item.fullname)}
                            </span>

                        </div>
                    ))}

                    {job.assignedTo.length > 2 && (
                        <div
                            className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500 text-[10px] font-bold cursor-help transition-colors hover:bg-zinc-200 hover:text-zinc-700"
                            // Tooltip: Gizlenen kişilerin isimlerini burada gösteriyoruz
                            title={`Diğerleri: ${job.assignedTo.slice(2).map(u => u.fullname).join(", ")}`}
                        >
                            +{job.assignedTo.length - 2}
                        </div>
                    )}



                </div>

            </div>
        </div>
        
    )
}

export default JobsCard
