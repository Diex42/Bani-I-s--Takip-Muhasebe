import type { Brand } from "../types/brand";
import type { Finance } from "../types/finance";
import type { Job } from "../types/job";
import type { User } from "../types/user";

export const Mock_Users: User[] = [
    {
        id: "1",
        fullname: "Hasan Hüseyin Ünalmış",
        email: "hasan@banilab.co",
        number: "05555555555",
        salary: 100000,
        role: "Admin",
        department: "Yazılım",
        colorTheme: "from-blue-500 to-indigo-600"
    },
    {
        id: "2",
        fullname: "Seyithan Özbay",
        email: "seyithan@banilab.co",
        number: "05555555555",
        salary: 28000,
        role: "Admin",
        department: "Yazılım",
        colorTheme: "from-rose-400 to-orange-500"
    },
    {
        id: "3",
        fullname: "Savaş Silpağar",
        email: "savaş@banilab.co",
        number: "05555555555",
        salary: 28000,
        role: "Admin",
        department: "Sosyal Medya",
        colorTheme: "from-emerald-500 to-green-600"
    },
    {
        id: "4",
        fullname: "Serdar Ekin",
        email: "serdar@banilab.co",
        number: "05555555555",
        salary: 1,
        role: "Admin",
        department: "Video",
        colorTheme: "from-orange-500 to-amber-600"
    },
    {
        id: "5",
        fullname: "Kağan Danler",
        email: "kağan@banilab.co",
        number: "05555555555",
        salary: 75000,
        role: "User",
        department: "3D",
        colorTheme: "from-cyan-500 to-teal-600",
    },
    {
        id: "6",
        fullname: "Furkan Yaylalı",
        email: "furkan@banilab.co",
        number: "05555555555",
        salary: 75001,
        role: "User",
        department: "Video",
        colorTheme: "from-rose-500 to-red-600"
    },
     {
        id: "7",
        fullname: "Ahmetcan Şimşek",
        email: "ahmetcan@banilab.co",
        number: "05555555555",
        salary: 44999,
        role: "User",
        department: "Video",
        colorTheme: "from-[#C99A84] to-[#9B7766]"
    },
    {
        id: "8",
        fullname: "Sinem Can",
        email: "sinem@banilab.co",
        number: "05555555555",
        salary: 30000,
        role: "User",
        department: "Grafik",
        colorTheme: "from-[#7EBB9A] to-[#619076]"
    },
    {
        id: "9",
        fullname: "Fatmagül Yılmaz",
        email: "fatmagül@banilab.co",
        number: "05555555555",
        salary: 12000,
        role: "User",
        department: "Grafik",
        colorTheme: "from-[#FF00BB] to-[#9500FF]",
    },
    {
         id: "10",
        fullname: "Alime Salan",
        email: "alime@banilab.co",
        number: "05555555555",
        salary: 60000,
        role: "User",
        department: "Yönetim",
        colorTheme: "from-green-500 to-yellow-500",
    },
    {
         id: "11",
        fullname: "Sevda Özer",
        email: "sevda@banilab.co",
        number: "05555555555",
        salary: 75000,
        role: "User",
        department: "Yönetim",
        colorTheme: "from-blue-300 to-[#9500FF]",
    }
   
]

export const Mock_Brands: Brand[] = [
    {
        id: "1",
        name: "Warkas Trailer",
        email: "warkas@info.com",
        phone: "+90 555 555 55 55",
        isRetainer: true,
        monthlyRetainerAmount: 25000,
        paymentDay: 5,
        totalActiveJobs: 4,
        currentDebt: 0,
    },
    {
        id: "2",
        name: "Ressam Metal",
        email: "ressam@info.com",
        phone: "+90 555 555 55 56",
        isRetainer: false,
        totalActiveJobs: 1,
        currentDebt: 10000,
    },
    {
        id: "3",
        name: "Ruby",
        email: "ruby@info.com",
        phone: "+90 555 555 55 57",
        isRetainer: true,
        monthlyRetainerAmount: 40000,
        paymentDay: 5,
        totalActiveJobs: 3,
        currentDebt: 15000,
    },
    {
        id: "4",
        name: "Miss",
        email: "miss@info.com",
        phone: "+90 555 555 55 57",
        isRetainer: false,
        paymentDay: 5,
        totalActiveJobs: 8,
        currentDebt: 0,
    },
]

export const Mock_Jobs: Job[] = [
    {
        id: "j1",
        title: "İnstagram Post Tasarımı",
        description: "Warkas Trailer için 3'lü Post Tasarımı",
        brandId: "1",
        brand: Mock_Brands[0],
        assignedTo: [Mock_Users[6], Mock_Users[7]],
        department: "Grafik",
        startDate: "2026-01-20",
        dueDate: "2026-02-10",
        status: "In_Progress",
        isRetainerIncluded: true,
        price: 0,
    },

    {
        id: 'j2',
        title: 'Website Geliştirme',
        description: "PQOWJFEPOQPOMWQPEF PW EFP WQEFP PMPWOEMFP PWQMEFP PWEFNPQW PWEMFPWQ FPWEFPWEF asdasdsadasdsadsadsa",
        brandId: '1',
        brand: Mock_Brands[0],
        department: "Yazılım",
        status: 'Revision',
        startDate: '2025-01-12T10:00:00Z',
        dueDate: '2025-01-15T14:00:00Z',
        assignedTo: [Mock_Users[1], Mock_Users[0]],
        isRetainerIncluded: false,
        price: 20000,
        paymentStatus: 'Paid',
    },

    {
        id: "j3",
        title: "Tanıtım Videosu",
        description: "Firmayı tanıtan büyükwkqefpwqmoımoıas  asoınwofnoqw qwoeıfnwqoı asonıoqwef oıwnfoıqw oıwqnefoıqn oıwnef",
        brandId: "2",
        brand: Mock_Brands[1],
        department: "Video",
        status: "Done",
        startDate: "2024-06-15",
        dueDate: "2024-06-30",
        assignedTo: [Mock_Users[3], Mock_Users[5], Mock_Users[2], Mock_Users[1]],
        isRetainerIncluded: false,
        price: 15000,
        paymentStatus: "Unpaid",
    },
    {
        id: 'j4',
        title: 'Yeni Ürün 3D Modelleme',
        description: "Yem Karma Makinesi için detaylı bir ürün modelleme ve animasyon videosu",
        brandId: '2',
        brand: Mock_Brands[1],
        department: '3D',
        status: 'In_Progress',
        startDate: '2025-01-14T11:00:00Z',
        dueDate: '2025-01-30T17:00:00Z',
        assignedTo: [Mock_Users[4]],
        isRetainerIncluded: true,
        price: 0
    },

    {
        id: "j5",
        title: "E-Ticaret Arayüz Tasarımı",
        description: "Ruby markası için modern ve kullanıcı dostu UI/UX çalışması.",
        brandId: "3",
        brand: Mock_Brands[2],
        department: "Grafik",
        status: "In_Progress",
        startDate: "2026-02-01",
        dueDate: "2026-02-15",
        assignedTo: [Mock_Users[0], Mock_Users[6]],
        isRetainerIncluded: true,
        price: 0,
    },
    {
        id: "j6",
        title: "Mobil Uygulama Backend Entegrasyonu",
        description: "Ödeme sistemlerinin API entegrasyonu ve veritabanı optimizasyonu.",
        brandId: "3",
        brand: Mock_Brands[2],
        department: "Yazılım",
        status: "Revision",
        startDate: "2026-02-10",
        dueDate: "2026-03-01",
        assignedTo: [Mock_Users[1]],
        isRetainerIncluded: true,
        price: 0,
    },

    // MISS (id: "4") İşleri
    {
        id: "j7",
        title: "Katalog Çekimi Post-Prodüksiyon",
        description: "Yeni sezon ürünleri için video kurgu ve color correction işlemleri.",
        brandId: "4",
        brand: Mock_Brands[3],
        department: "Video",
        status: "Revision",
        startDate: "2026-01-25",
        dueDate: "2026-02-05",
        assignedTo: [Mock_Users[5], Mock_Users[2]],
        isRetainerIncluded: false,
        price: 12500,
        paymentStatus: "Unpaid",
    },
    {
        id: "j8",
        title: "Mağaza İçi 3D Görselleştirme",
        description: "Yeni açılacak şube için iç mimari 3D render çalışmaları.",
        brandId: "4",
        brand: Mock_Brands[3],
        department: "3D",
        status: "In_Progress",
        startDate: "2026-02-01",
        dueDate: "2026-02-20",
        assignedTo: [Mock_Users[4]],
        isRetainerIncluded: false,
        price: 18000,
        paymentStatus: "Paid",
    },

    // WARKAS TRAILER (id: "1") Ek İş
    {
        id: "j9",
        title: "Lansman Teaser Videosu",
        description: "Yeni dorse modeli için 15 saniyelik sosyal medya teaser kurgusu.",
        brandId: "1",
        brand: Mock_Brands[0],
        department: "Video",
        status: "Done",
        startDate: "2026-01-10",
        dueDate: "2026-01-15",
        assignedTo: [Mock_Users[3]],
        isRetainerIncluded: true,
        price: 0,
    },

    // RESSAM METAL (id: "2") Ek İş
    {
        id: "j10",
        title: "Kurumsal Web Sitesi Güncellemesi",
        description: "PHP sürüm yükseltme ve güvenlik yamalarının uygulanması.",
        brandId: "2",
        brand: Mock_Brands[1],
        department: "Yazılım",
        status: "In_Progress",
        startDate: "2026-02-05",
        dueDate: "2026-02-12",
        assignedTo: [Mock_Users[1], Mock_Users[0]],
        isRetainerIncluded: false,
        price: 8500,
        paymentStatus: "Unpaid",
    },


]

export const Mock_Finance: Finance[] = [
    // --- 1. RESSAM METAL (Eski Bakiye - Alarm Veren) ---
    // Mock_Jobs j3 (Tanıtım Videosu) - 15.000 TL - Ödenmemiş
    {
        id: "f1",
        brandId: "2",
        brandName: "Ressam Metal",
        sourceType: "JOB",
        sourceId: "j3", 
        description: "Tanıtım Videosu (Proje Bedeli)",
        amount: 15000,
        dueDate: "2024-06-30", // Çok eski tarih -> OVERDUE görünecek
        status: "OVERDUE"
    },

    // --- 2. WARKAS TRAILER (Retainer - Ödenmiş) ---
    // Şubat Ayı Sabit Ödemesi - Zamanında ödenmiş
    {
        id: "f2",
        brandId: "1",
        brandName: "Warkas Trailer",
        sourceType: "RETAINER",
        // sourceId boş olabilir veya "2026-02" gibi dönem kodu olabilir
        description: "2026 Şubat - Aylık Retainer Bedeli",
        amount: 25000,
        dueDate: "2026-02-05",
        paymentDate: "2026-02-05", // Tahsil edilmiş
        status: "PAID"
    },

    // --- 3. WARKAS TRAILER (Ekstra İş - Ödenmiş) ---
    // Mock_Jobs j2 (Website) - 20.000 TL - Ödenmiş
    {
        id: "f3",
        brandId: "1",
        brandName: "Warkas Trailer",
        sourceType: "JOB",
        sourceId: "j2",
        description: "Website Geliştirme (Ekstra Proje)",
        amount: 20000,
        dueDate: "2026-01-15",
        paymentDate: "2026-01-20",
        status: "PAID"
    },

    // --- 4. RUBY (Retainer - Gecikmiş) ---
    // Şubat Ayı ödemesi. Vadesi ayın 5'iydi, bugün ayın 7'si varsayalım -> Gecikmiş.
    {
        id: "f4",
        brandId: "3",
        brandName: "Ruby",
        sourceType: "RETAINER",
        description: "2026 Şubat - Aylık Retainer Bedeli",
        amount: 40000,
        dueDate: "2026-02-05", 
        status: "OVERDUE"
    },

    // --- 5. MISS (Ekstra İş - Gecikmiş) ---
    // Mock_Jobs j7 (Katalog) - 12.500 TL. Ödeme günü geçmiş.
    {
        id: "f5",
        brandId: "4",
        brandName: "Miss",
        sourceType: "JOB",
        sourceId: "j7",
        description: "Katalog Çekimi Post-Prodüksiyon",
        amount: 12500,
        dueDate: "2026-02-05",
        status: "OVERDUE"
    },

    // --- 6. RESSAM METAL (Ekstra İş - Gelecek) ---
    // Mock_Jobs j10 (Web Update) - 8.500 TL. Vadesi ayın 12'si (Gelecek)
    {
        id: "f6",
        brandId: "2",
        brandName: "Ressam Metal",
        sourceType: "JOB",
        sourceId: "j10",
        description: "Kurumsal Web Sitesi Güncellemesi",
        amount: 8500,
        dueDate: "2026-02-12", // Henüz gelmedi
        status: "PENDING"
    },

    // --- 7. MISS (Ekstra İş - Ödenmiş/Erken) ---
    // Mock_Jobs j8 (3D Mağaza) - 18.000 TL. Vadesi ayın 20'si ama erken ödemişler.
    {
        id: "f7",
        brandId: "4",
        brandName: "Miss",
        sourceType: "JOB",
        sourceId: "j8",
        description: "Mağaza İçi 3D Görselleştirme",
        amount: 18000,
        dueDate: "2026-02-20",
        paymentDate: "2026-02-06",
        status: "PAID"
    },
    
    // --- 8. RUBY (Geçmiş Ay Retainer - Ödenmiş) ---
    // Ocak ayı ödemesi. Geçmiş veri olsun diye.
    {
        id: "f8",
        brandId: "3",
        brandName: "Ruby",
        sourceType: "RETAINER",
        description: "2026 Ocak - Aylık Retainer Bedeli",
        amount: 40000,
        dueDate: "2026-01-05",
        paymentDate: "2026-01-05",
        status: "PAID"
    }
];