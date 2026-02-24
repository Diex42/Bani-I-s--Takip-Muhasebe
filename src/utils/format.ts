/**
 * Tarihi Türkçe formatına çevirir (Örn: 31 Oca 2026)
 */
export function formatDate(dateString: string | Date | undefined | null): string {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "short", // "Oca", "Şub" gibi kısaltma
    year: "numeric",
  }).format(date);
}

/**
 * Para birimini TL formatına çevirir (Örn: ₺15.000)
 */
export function formatCurrency(amount: number | undefined): string  {

    if (amount === undefined || amount === null) {
        return "0₺"
    }
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0, // Kuruşları gizlemek istersen 0 yap (₺15.000)
    maximumFractionDigits: 0, // Kuruşsuz daha temiz durur
  }).format(amount);
}



// Girdi: "Hasan Hüseyin Ünalmış" -> Çıktı: "Hasan Ü."
export function getShortName(fullname: string): string {
  if (!fullname) return "";
  const parts = fullname.trim().split(" ");
  
  const firstName = parts[0]; // İlk isim (Hasan)
  const lastName = parts[parts.length - 1]; // Soyisim (Ünalmış)
  
  // Soyismin ilk harfi + nokta
  return `${firstName} ${lastName[0]}.`; 
}

// Marka İd'sine göre renk oluşturan fonksiyon
export function getBrandColor(id: number): string {
  const brandGradients = [
    "from-blue-500 to-blue-700",
    "from-purple-500 to-purple-700",
    "from-emerald-500 to-emerald-700",
    "from-rose-500 to-rose-700",
    "from-amber-500 to-amber-700",
    "from-indigo-500 to-indigo-700",
    "from-teal-500 to-teal-700",
    "from-pink-500 to-pink-700",
    "from-orange-500 to-orange-700",
    "from-sky-500 to-sky-700",
    "from-cyan-500 to-cyan-700",
    "from-violet-500 to-violet-700",
    "from-fuchsia-500 to-fuchsia-700",
    "from-lime-500 to-lime-700",
    "from-red-500 to-red-700",
    "from-slate-500 to-slate-700",
    "from-zinc-500 to-zinc-700",
    "from-neutral-500 to-neutral-700",
    "from-stone-500 to-stone-700",
    "from-orange-600 to-orange-800"
  ];

  const index = id % brandGradients.length;
  
  return brandGradients[index];

}

export function getInitials(name: string):string {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };