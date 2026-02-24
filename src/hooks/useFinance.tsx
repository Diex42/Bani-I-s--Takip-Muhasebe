import { useMemo, useState } from "react";
import { Mock_Finance } from "../data/mock";
import { type Finance } from "../types/finance";



export const useFinance = () => {

    const nowDate = new Date().toISOString().slice(0, 7)

    const [selectedDate, setSelectedDate] = useState(nowDate) // Tarih tutan state

    const [searchTerm, setSearchTerm] = useState("") // Arama Kısmı için state

    const [selectedTransaction, setSelectedTransaction] = useState<Finance | null>(null); // Tahsil Et butonuna basılınca hangi iş olduğunu tutan state

    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false); // Tahsil Et butonuna basılınca açılacak modali tutan state

    const [isAddModalOpen, setIsAddModalOpen] = useState(false); //İşlem Ekle Butonu modali için state

    const handlePaymentClick = (transaction: Finance) => {
        setSelectedTransaction(transaction); // Veriyi alıyoruz
        setPaymentModalOpen(true); //Modali aç
    }

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedTransaction(null);
    }



    const filteredData = useMemo(() => {

        let data = Mock_Finance;

        // Aya göre filtreleme. SelectedDate de seçilen ayda başlayan dataları filtreledik
        if (selectedDate) {
            data = data.filter((item) => item.dueDate.startsWith(selectedDate));
        }

        // Arama Filtresi. Kutu Doluysa Çalışır
        if (searchTerm.trim() !== "") {

            const lowerTerm = searchTerm.toLowerCase(); //Küçük harfe çevirme

            data = data.filter((item) => {
                const inBrand = item.brandName.toLowerCase().includes(lowerTerm);
                const inDesc = item.description.toLowerCase().includes(lowerTerm);

                return inBrand || inDesc;
            });
        }

        // Tarihe Göre Sıralama. Vadesi Yakın Olan Üstte
        return data.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());


    }, [selectedDate, searchTerm]);

    const stats = useMemo(() => {
        const initialStats = {
            totalPotential: 0, //Toplam gelecek para
            collected: 0,   //Toplanan Para
            receivables: 0, // Toplanacak Para
            overdue: 0, //Ödemesi geciken para
            collectionRate: 0 // Başarı Oranı
        };

        // İnitialStatsı işleri dönerek güncelledik
        const result = filteredData.reduce((acc, item) => {

            if(item.status === 'CANCELLED') return acc;

            acc.totalPotential += item.amount;

            if (item.status === 'PAID') {
                acc.collected += item.amount;
            } else if (item.status === 'PENDING') {
                acc.receivables += item.amount;
            } else if (item.status === 'OVERDUE') {
                acc.overdue += item.amount;
            }

            return acc;
        }, initialStats)

        // Başarı Oranı
        if (result.totalPotential > 0) {
            result.collectionRate = Math.round((result.collected / result.totalPotential) * 100);
        }

        return result;
    }, [filteredData]);

    return {
        filteredData,
        stats,
        selectedDate,
        setSelectedDate,
        searchTerm,
        setSearchTerm,
        isPaymentModalOpen,
        selectedTransaction,
        handlePaymentClick,
        closePaymentModal,
        isAddModalOpen,
        setIsAddModalOpen
    }
};