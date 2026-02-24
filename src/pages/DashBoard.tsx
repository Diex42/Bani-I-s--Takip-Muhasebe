import AdminDashboardView from "../components/dashboard/AdminDashboardView";
import UserDashboardView from "../components/dashboard/UserDashboardView";
import { useDashboard } from "../hooks/useDashboard";


function DashBoard() {

    const isAdmin = false;
    const currentUserEmail = "seyithan@banilab.co";

    const { 
        stats,              // Admin verisi
        revenueTrend,       // Admin verisi
        jobDistribution,    // Admin verisi
        userStats           // User verisi
    } = useDashboard(currentUserEmail);

  return (
    <section>

        {isAdmin ? (
                // ADMIN İSE: Admin bileşenini yükle ve sadece ona lazım olan verileri yolla
                <AdminDashboardView 
                    stats={stats} 
                    revenueTrend={revenueTrend} 
                    jobDistribution={jobDistribution} 
                />
            ) : (
                // USER İSE: Kullanıcı bileşenini yükle ve userStats'ı yolla
                <UserDashboardView data={userStats}/>
            )}

    </section>
  )
}

export default DashBoard

//Aylık Toplam Gelir. Toplam Gider, Kar, Aktif Proje SAyısı
//Aylık Gelir Trend Grafiği
//Aylık bekleyen revize olan ve tamamlanan işler pasta grafiği

//Son tarihi yaklaşan işler. Maks 3 adet.
//Aktif proje sayısı
// O ayki toplam yaptığı iş
