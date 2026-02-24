import { PlusCircle, Search } from "lucide-react"

interface TeamHeaderProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    isAdmin: boolean
    OnAddClick: () => void;
}


function TeamHeader({ searchTerm, setSearchTerm, isAdmin, OnAddClick }: TeamHeaderProps) {
    return (
        <header className="relative w-full h-32 bg-bg flex flex-wrap justify-between items-center md:px-10 border-b-2 border-button-yellow">
            <div className="order-1">
                <h1 className="text-3xl font-heading font-semibold">EKİP</h1>
            </div>

            {/* Arama Barı (Şimdilik statik) */}
            <div className="w-96 py-2 flex items-center gap-3 px-4 rounded-lg bg-bg-sidebar/20 border-2 border-transparent order-3 md:order-2
                 focus-within:border-button-yellow focus-within:shadow-sm focus-within:shadow-button-yellow transition-all duration-200 group">
                <Search className="w-5 h-5 text-text-muted group-focus-within:text-button-yellow duration-200" />
                <input type="text" placeholder="Çalışan ismi ara..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                    className="w-full h-full bg-transparent outline-none text-text-primary "
                />
            </div>

            {/* Ekle Butonu */}
            {isAdmin && (
                <div className="order-2 md:order-3">
                    <button
                        className="bg-text-primary px-5 py-2.5 cursor-pointer rounded-xl flex items-center gap-2 drop-shadow-md drop-shadow-button-yellow hover:drop-shadow-xl hover:drop-shadow-button-yellow hover:-translate-y-1 transition-all duration-200"
                        onClick={OnAddClick}
                    >
                        <PlusCircle className="w-5 h-5 text-button-yellow" />
                        <span className="text-text-inverse font-heading font-semibold">Yeni Çalışan Ekle</span>
                    </button>
                </div>
            )}

        </header>
    )
}

export default TeamHeader
