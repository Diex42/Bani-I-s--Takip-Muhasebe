import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banilogo from '../assets/baniLogo-svg.svg';
import login from '../assets/login.jpg';

export default function Login() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // --- SİMÜLASYON (Backend bağlanınca burası değişecek) ---
    setTimeout(() => {
      
      // Basit bir kontrol (Test için)
      if (email === "hasan@banilab.co" && password === "123456") {
        // Başarılı giriş
        navigate("/"); // Dashboard'a yönlendir
      } else if (email === "personel@banilab.com" && password === "123456") {
        navigate("/");
      } else {
        setError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
        setIsLoading(false);
      }

    }, 1500); // 1.5 saniye bekleme efekti
  };

  return (
    <div className="min-h-screen w-full flex bg-bg">
      
      {/* 1. SOL TARAF: FORM ALANI */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 py-12">
        
        {/* Logo / Marka */}
        <div className="mb-10">
           <div className="w-20 h-auto  flex items-center justify-center mb-4">
            <img src={banilogo} alt="" className="object-contain w-full h-full" />
           </div>
           <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
             Hoş Geldiniz
           </h1>
           <p className="text-zinc-500 mt-2 font-medium">
             Devam etmek için hesabına giriş yap.
           </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
            
            {/* E-posta Input */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-zinc-700 ml-1">E-posta Adresi</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                    </div>
                    <input 
                        type="email" 
                        required
                        className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-zinc-900 focus:ring-0 transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                        placeholder="ornek@banilab.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            {/* Şifre Input */}
            <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-bold text-zinc-700">Şifre</label>
                </div>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                    </div>
                    <input 
                        type="password" 
                        required
                        className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:bg-white focus:border-zinc-900 focus:ring-0 transition-all font-medium text-zinc-900 placeholder:text-zinc-400"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Hata Mesajı */}
            {error && (
                <div className="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    {error}
                </div>
            )}

            {/* Giriş Butonu */}
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-zinc-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        Giriş Yapılıyor...
                    </>
                ) : (
                    <>
                        Giriş Yap <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>

      </div>

      {/* 2. SAĞ TARAF: GÖRSEL ALAN (MOBİLDE GİZLİ) */}
      <div className="hidden lg:flex w-1/2 bg-zinc-900 relative overflow-hidden items-center justify-center">
         
         {/* Arka Plan Görseli */}
         <div className="absolute inset-0 opacity-100">
            <img 
                src={login} 
                alt="Abstract Background" 
                className="w-full h-full object-cover"
            />
         </div>

      </div>

    </div>
  );
}