import { useMemo } from "react";
import { useJobs } from "./useJobs";
import useTeam from "./useTeam"
import { Mock_Finance } from "../data/mock";

export const useDashboard = (currentUserEmail?: string) => {

    const { FilteredData: users } = useTeam();
    const { pending, revision, completed } = useJobs();

    // Güncel Tarih Bilgisi
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // O ayki toplam beklenen ciro. Vadesi o ay olan tüm finance verisi
    const monthlyRevenue = useMemo(() => {
        return Mock_Finance
            .filter((item) => {
                const itemDate = new Date(item.dueDate);
                return (
                    itemDate.getMonth() === currentMonth &&
                    itemDate.getFullYear() === currentYear
                );
            })
            .reduce((total, item) => total + item.amount, 0);
    }, [currentMonth, currentYear]);

    // Personel Maaşlarının toplamı
    const monthlyExpenses = useMemo(() => {
        return users.reduce((total, user) => total + (user.salary || 0), 0);
    }, [users]);

    // Aktif İşlerin sayısı
    const activeProjectCount = useMemo(() => {
        return pending.length + revision.length;
    }, [pending, revision]);

    // Aylık Gelir Trend Grafiği için
    const revenueTrend = useMemo(() => {
        const monthsData = [];

        // Bugünden geriye doğru 6 adım git (5, 4, 3, 2, 1, 0)
        for (let i = 5; i >= 0; i--) {
            // Geçici bir tarih objesi oluştur
            const d = new Date();
            d.setMonth(currentDate.getMonth() - i);

            const monthIndex = d.getMonth();
            const year = d.getFullYear();

            // Ay ismini al (Oca, Şub...)
            const monthName = d.toLocaleString('tr-TR', { month: 'short' });

            // O aya ait finans verilerini topla
            const totalAmount = Mock_Finance
                .filter(item => {
                    const itemDate = new Date(item.dueDate);
                    return itemDate.getMonth() === monthIndex && itemDate.getFullYear() === year;
                })
                .reduce((acc, curr) => acc + curr.amount, 0);

            // Listeye ekle: { name: "Şub", value: 25000 }
            monthsData.push({
                name: monthName,
                value: totalAmount
            });
        }
        return monthsData;
    }, [currentDate]);

    // İşlerin Pasta Grafiği için
    const jobDistribution = useMemo(() => {
        // Tamamlanan işlerde sadece BU AY bitenleri alalım ki grafik anlamlı olsun.
        const doneThisMonthCount = completed.filter(job => {
            if (!job.dueDate) return false;
            const d = new Date(job.dueDate);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        }).length;

        // Recharts için uygun format:
        return [
            { name: 'Devam Eden', value: pending.length, color: '#3B82F6' }, // Blue-500
            { name: 'Revize', value: revision.length, color: '#F59E0B' },   // Amber-500
            { name: 'Tamamlanan', value: doneThisMonthCount, color: '#10B981' }, // Emerald-500
        ];
    }, [pending, revision, completed, currentMonth, currentYear]);

    // Kullanıcıya Ait tarihi yaklaşan son 3 iş
    const userStats = useMemo(() => {
        if (!currentUserEmail) return null;

        // Yardımcı fonksiyon: İş bana mı ait?
        const isMine = (job: any) => job.assignedTo?.some((u: any) => u.email === currentUserEmail);

        // A. Kullanıcıya ait işleri filtrele
        const myPending = pending.filter(isMine);
        const myRevision = revision.filter(isMine);

        // B. Tamamlananlarda sadece BU AY bitenleri ve bana ait olanları al
        const myDoneThisMonth = completed.filter(job => {
            if (!isMine(job)) return false;
            if (!job.dueDate) return false;
            const d = new Date(job.dueDate);
            return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
        });

        // --- C. ACİL İŞLER LİSTESİ ---
        const allActive = [...myPending, ...myRevision];
        const myUrgentJobs = [...allActive]
            .filter(job => !!job.dueDate)
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
            .slice(0, 3);

        // --- D. KULLANICI PASTA GRAFİĞİ (YENİ) ---
        const userJobDistribution = [
            { name: 'Devam Eden', value: myPending.length, color: '#3B82F6' },
            { name: 'Revize', value: myRevision.length, color: '#F59E0B' },
            { name: 'Tamamlanan', value: myDoneThisMonth.length, color: '#10B981' },
        ];

        return {
            myActiveCount: allActive.length, // Toplam Aktif Sayısı
            myUrgentJobs,                    // Acil Liste (İlk 3)
            userJobDistribution              // Grafik Verisi
        };

    }, [pending, revision, completed, currentUserEmail, currentMonth, currentYear]);

    return {
        stats: {
            income: monthlyRevenue, // ciro
            outcome: monthlyExpenses, //maaş gideri
            activeProjects: activeProjectCount, // aktif iş sayısı
            netPotential: monthlyRevenue - monthlyExpenses //beklenen kar
        },
        revenueTrend,
        jobDistribution,
        userStats
    }
}