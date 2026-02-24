import { useState } from "react"
import JobsCard from "../components/jobs/JobsCard"
import JobsHeader from "../components/jobs/JobsHeader"
import { ArrowRight } from "lucide-react";
import { DEPARTMENTS } from "../types/enum";
import { useJobs } from "../hooks/useJobs";

function Jobs() {
  const {
    pending,
    revision,
    completed,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm
  } = useJobs();

  const [isRevizeModalOpen, setIsRevizeModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [revisionNote, setRevisionNote] = useState("");

  const handleOpenRevisionModal = (id: string) => {
    setSelectedJobId(id);
    setRevisionNote("");
    setIsRevizeModalOpen(true);
  };

  const handleCloseRevisionModal = () => {
    setIsRevizeModalOpen(false);
    setSelectedJobId(null);
    setRevisionNote("");
  };

  const handleSubmitRevision = () => {
    if (!selectedJobId) return;
    
    console.log(`İşlem ID: ${selectedJobId}`);
    console.log(`Revize Notu: ${revisionNote}`);

    handleCloseRevisionModal();
  };

  return (
    <div className="flex flex-col items-center w-full relative min-h-screen bg-bg">
      <JobsHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Departman Filtreleri */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mt-5 px-4 overflow-x-auto no-scrollbar">
        {["Tümü", ...DEPARTMENTS].map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveTab(dept as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap
              ${activeTab === dept
                ? "bg-zinc-800 text-white border-zinc-800 shadow-md transform scale-105"
                : "bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-700"
              }`}
          >
            {dept === "Social_Media" ? "Social Media" : dept}
          </button>
        ))}
      </div>

      {/* Ana Grid Sistemi: Mobilde Tek Kolon, Masaüstünde 3 Kolon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:h-full h-auto gap-8 overflow-y-auto md:overflow-hidden px-2 min-h-0 py-10">

        {/* 1. KOLON: YAPILACAK İŞLER */}
        <div className="flex flex-col lg:gap-7 items-center md:px-4">
          <div className="px-2 py-1 border-b-2 border-sky-200 mb-7">
            <p className="font-heading font-semibold italic text-lg text-text-primary uppercase tracking-wider">
              YAPILACAKLAR ({pending.length})
            </p>
          </div>

          {/* MOBİL SNAP SCROLL KORUMASI */}
          <div className="flex flex-row lg:flex-col gap-4 md:gap-6 p-4 md:p-0 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none custom-scrollbar">
            {pending.map((item) => (
              <div key={item.id} className="min-w-full md:min-w-0 snap-center">
                <JobsCard
                  job={item}
                  variantStyle="bg-sky-50 border-sky-200 hover:border-sky-400"
                  onReviseClick={() => handleOpenRevisionModal(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex lg:hidden flex-row items-center gap-2 mt-2">
            <p className="text-xs font-text text-text-muted italic">Yana kaydırın</p>
            <ArrowRight className="w-4 h-4 text-text-muted" />
          </div>
        </div>

        {/* 2. KOLON: REVİZE VERİLEN İŞLER */}
        <div className="flex flex-col lg:gap-7 items-center md:px-4 relative">
          <div className="px-2 py-1 border-b-2 border-amber-200 mb-7">
            <p className="font-heading font-semibold text-lg text-text-primary italic uppercase tracking-wider">
              REVİZELER ({revision.length})
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-4 md:gap-6 p-4 md:p-0 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none custom-scrollbar">
            {revision.map((item) => (
              <div key={item.id} className="min-w-full md:min-w-0 snap-center">
                <JobsCard
                  job={item}
                  variantStyle="bg-amber-50 border-amber-200 hover:border-amber-400"
                  onReviseClick={() => handleOpenRevisionModal(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex lg:hidden flex-row items-center gap-2 mt-2">
            <p className="text-xs font-text text-text-muted italic">Yana kaydırın</p>
            <ArrowRight className="w-4 h-4 text-text-muted" />
          </div>
        </div>

        {/* 3. KOLON: TAMAMLANAN İŞLER */}
        <div className="flex flex-col lg:gap-7 items-center md:px-4">
          <div className="px-2 py-1 border-b-2 border-emerald-200 mb-7">
            <p className="font-heading font-semibold text-lg text-text-primary italic uppercase tracking-wider">
              TAMAMLANDI ({completed.length})
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-4 md:gap-6 p-4 md:p-0 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none custom-scrollbar">
            {completed.map((item) => (
              <div key={item.id} className="min-w-full md:min-w-0 snap-center">
                <JobsCard
                  job={item}
                  variantStyle="bg-emerald-50 border-emerald-200 hover:border-emerald-400"
                  onReviseClick={() => handleOpenRevisionModal(item.id)}
                />
              </div>
            ))}
          </div>
          <div className="flex lg:hidden flex-row items-center gap-2 mt-2">
            <p className="text-xs font-text text-text-muted italic">Yana kaydırın</p>
            <ArrowRight className="w-4 h-4 text-text-muted" />
          </div>
        </div>

      </div>

      {/* Revize Modalı (Görsel dokunuşlar eklendi) */}
      {isRevizeModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-zinc-800 mb-2 font-heading tracking-tight">Revize Talebi Oluştur</h3>
            <p className="text-sm text-zinc-500 mb-6 font-text">Lütfen yapılması gereken düzeltmeleri açıklayınız.</p>
            <textarea
              className="w-full h-40 p-4 text-sm border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-button-yellow resize-none text-black bg-zinc-50"
              placeholder="Örn: Logo biraz daha büyütülmeli..."
              autoFocus
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={handleCloseRevisionModal} className="px-6 py-2.5 text-xs font-bold text-zinc-600 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-all">İptal</button>
              <button onClick={handleSubmitRevision} className="px-6 py-2.5 text-xs font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95">Revizeyi Gönder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Jobs