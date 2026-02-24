import AdminJobDistributionChart from "./AdminJobDistributionChart";
import AdminRevenueChart from "./AdminRevenueChart";
import AdminStats from "./AdminStats";

interface AdminViewProps {
    stats: any;
    revenueTrend: any[];
    jobDistribution: any[];
}

function AdminDashboardView({ stats, revenueTrend, jobDistribution }: AdminViewProps) {
    return (
        <div className="flex flex-col gap-10">

            <div className="flex  justify-between items-center px-3 h-32">
                <p className="font-heading font-bold text-3xl italic">YÖNETİCİ / ANASAYFA</p>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.15em] mb-1">
                    {new Date().toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        weekday: 'long'
                    })}
                </p>

            </div>


            <AdminStats stats={stats} />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* SOL: GELİR GRAFİĞİ (RevenueChart) */}
                <div className="lg:col-span-2 h-[400px]"> {/* Yükseklik verdik ki grafik ezilmesin */}
                    {/* Veriyi buraya paslıyoruz */}
                    <AdminRevenueChart data={revenueTrend} />
                </div>

                {/* SAĞ: PASTA GRAFİK (Şimdilik yer tutucu) */}
                <div className="lg:col-span-1 h-[400px]">
                    <AdminJobDistributionChart data={jobDistribution} />
                </div>

            </section>


        </div>
    )
}

export default AdminDashboardView
