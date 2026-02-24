import FinanceHeader from "../components/finance/FinanceHeader";
import FinanceList from "../components/finance/FinanceList";
import FinanceStats from "../components/finance/FinanceStats";
import PaymentModal from "../components/finance/PaymentModal";
import TransactionModal from "../components/finance/TransactionModal";
import { useFinance } from "../hooks/useFinance"

function Finance() {

  const {filteredData, stats, searchTerm, setSearchTerm, selectedDate, setSelectedDate,isPaymentModalOpen,selectedTransaction,handlePaymentClick,closePaymentModal, isAddModalOpen, setIsAddModalOpen} = useFinance();

  const handleConfirmPaymnet = () => { //Ödeme onaylama fonksyionu
    console.log("ödeme onaylandı");
    closePaymentModal();
  }

  const handleSaveNewTransaction = () => {
    console.log("Yeni İşlem Kaydedildi");
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full relative min-h-screen bg-bg">
      <FinanceHeader
        searchTerm= {searchTerm}
        setSearchTerm={setSearchTerm}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        OnAddClick={() => setIsAddModalOpen(true)}
      />

      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewTransaction}
      />

      <FinanceStats
        stats={stats}
      />

      <FinanceList
        data={filteredData}
        onPaymentClick={handlePaymentClick}
      />

      <PaymentModal
        isOpen= {isPaymentModalOpen}
        onClose={closePaymentModal}
        transaction={selectedTransaction}
        onConfirm={handleConfirmPaymnet}
      />

        
      
    </div>
  )
}

export default Finance
