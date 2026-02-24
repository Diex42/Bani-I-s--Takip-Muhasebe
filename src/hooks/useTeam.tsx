import { useMemo, useState } from "react";
import { Mock_Users } from "../data/mock";
import type { Department } from "../types/enum";
import type { User } from "../types/user";

export const useTeam = () => {

    const isAdmin = true; //Admin kontrolü

    const [isUserModalOpen, setİsUserModalOpen] = useState(false); // Hem Kullanıcı Ekleme Hem de Düzenleme modali statei
    const [userToEdit, setUserToEdit] = useState<User | null>(null); // Düzenlenen kullanıcıyı tutan state
    const [activeTab, setActiveTab] = useState<Department | "Tümü">("Tümü"); // Departman filtrelemede aktifi tutan State
    const [searchTerm, setSearchTerm] = useState(""); //Arama kısmı için State

    // Kullanıcı Silme Fonksiyonu
    const deleteMember = (id: string) => { 
        console.log("Silme isteği backend'e gönderiliyor... ID:", id);
    };

    // Kullanıcı Düzenleme Fonksiyonu
    const updateMember = (user: any) => { 
        console.log("HOOK ÇALIŞTI: Güncelleme isteği backend'e gönderiliyor...", user);
    };


    // Ekle Butonunda çalışacak fonksiyon
    const openAddModal = () => {
        setUserToEdit(null);       // Hafızayı temizle (Form boş gelsin)
        setİsUserModalOpen(true);  // Modalı aç
    };

    // Düzenle butonunda çalışacak fonksiyon
    const openEditModal = (user: User) => {
        setUserToEdit(user);       // Düzenlenecek kişiyi hafızaya al
        setİsUserModalOpen(true);  // Modalı aç
    };

    // Modal kapanınca
    const closeUserModal = () => {
        setİsUserModalOpen(false);
        setTimeout(() => setUserToEdit(null), 300); // Animasyon bitince temizle
    };

    const FilteredData = useMemo (() => {

        let users = Mock_Users;

        if(activeTab !== 'Tümü') {
            users = users.filter((user) => user.department === activeTab);
        }//Departman Filtreleme

        if (searchTerm.trim() !== "") {
            const lowerTerm = searchTerm.toLowerCase();

            users = users.filter((user) => {
                const nameMatch = user.fullname.toLowerCase().includes(lowerTerm); // İsim Araması

                return nameMatch;
            });
        }

        return users

    }, [activeTab,searchTerm]);

    return {
        isAdmin,
        activeTab,
        setActiveTab,
        FilteredData,
        searchTerm,
        setSearchTerm,
        isUserModalOpen,
        setİsUserModalOpen,
        deleteMember,
        updateMember,
        userToEdit,
        openAddModal,
        openEditModal,
        closeUserModal,

    }
}

export default useTeam
