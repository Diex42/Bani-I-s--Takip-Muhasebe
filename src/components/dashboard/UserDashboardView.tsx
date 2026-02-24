import UserPerformanceChart from "./UserPerformanceChart";
import UserUrgentJobs from "./UserUrgentJobs";

interface UserViewProps {
    data: any;
}

function UserDashboardView({ data }: UserViewProps) {

    if (!data) return null;

    return (
        <div className="flex flex-col gap-10">

            <div className="flex  justify-between items-center px-3 h-32">
                <p className="font-heading font-bold text-3xl italic">ÇALIŞAN / ANASAYFA</p>
                <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.15em] mb-1">
                    {new Date().toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        weekday: 'long'
                    })}
                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* SOL TARAF: ACİL İŞLER (2 Birim Genişlik) */}
                <div className="lg:col-span-2 h-full">
                    <UserUrgentJobs jobs={data.myUrgentJobs} />
                </div>
                {/* SAĞ TARAF: PERFORMANS (1 Birim Genişlik) */}
                <div className="lg:col-span-1 h-full">
                    <UserPerformanceChart
                        data={data.userJobDistribution}
                        activeCount={data.myActiveCount}
                    />
                </div>
            </div>

        </div>
    )
}

export default UserDashboardView
