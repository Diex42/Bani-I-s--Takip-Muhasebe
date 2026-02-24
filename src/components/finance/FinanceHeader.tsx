import { PlusCircle, Search } from 'lucide-react';
interface FinanceHeaderProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    selectedDate: string;
    setSelectedDate: (val: string) => void;
    OnAddClick: () => void;
}

function FinanceHeader({ searchTerm, setSearchTerm, selectedDate, setSelectedDate, OnAddClick }: FinanceHeaderProps) {

    return (
        <div className='relative w-full h-32 bg-bg flex flex-wrap justify-between items-center md:px-10 border-b-2 border-button-yellow'>

            {/* Başlık */}
            <div className="">
                <h1 className="text-3xl font-heading font-semibold">FİNANS</h1>
            </div>

            {/* Tarih ve Arama Yeri */}
            <div className='flex flex-row items-center gap-5 order-3 md:order-2'>

                <div className='relative group'>
                    <input type="month" value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className='bg-bg-sidebar/20 border-2 border-transparent rounded-lg outline-none text-text-primary text-xs md:text-base font-text px-1 md:px-3 py-1.5
                         focus:border-button-yellow focus:shadow-sm transition-all cursor-pointer' />

                </div>

                <div className="w-full md:w-96 py-2 flex items-center gap-3 px-4 rounded-lg bg-bg-sidebar/20 border-2 border-transparent 
                 focus-within:border-button-yellow focus-within:shadow-sm focus-within:shadow-button-yellow transition-all duration-200 group">
                    <Search className="w-5 h-5 text-text-muted group-focus-within:text-button-yellow duration-200" />
                    <input type="text" placeholder="İşlem veya Marka ara..." onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
                        className="w-full h-full bg-transparent outline-none text-text-primary "
                    />
                </div>

            </div>

            {/* Buton */}
            <div className="order-2 md:order-3">
                <button
                    onClick={OnAddClick}
                    className="bg-text-primary px-5 py-2.5 rounded-xl flex items-center gap-2 drop-shadow-md drop-shadow-button-yellow hover:drop-shadow-xl hover:drop-shadow-button-yellow hover:-translate-y-1 transition-all duration-200"
                >
                    <PlusCircle className="w-5 h-5 text-button-yellow" />
                    <span className="text-text-inverse font-heading font-semibold">İşlem Ekle</span>
                </button>
            </div>
        </div>
    )
}

export default FinanceHeader
