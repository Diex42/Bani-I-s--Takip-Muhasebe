import MemberModal from "../components/team/MemberModal";
import TeamCard from "../components/team/TeamCard";
import TeamHeader from "../components/team/TeamHeader"
import useTeam from "../hooks/useTeam"
import { DEPARTMENTS } from "../types/enum";


function Team() {

  const { activeTab, setActiveTab, searchTerm, setSearchTerm, isAdmin, FilteredData, setİsUserModalOpen, isUserModalOpen, deleteMember, userToEdit, openEditModal, closeUserModal, } = useTeam();




  return (
    <div className="flex flex-col items-center w-full relative min-h-screen bg-bg">

      <TeamHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isAdmin={isAdmin}
        OnAddClick={() => setİsUserModalOpen(true)}
      />


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

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-5 mt-5  w-full">
        {FilteredData.map((user) => (
          <TeamCard
            key={user.id}
            user={user}
            isAdmin={isAdmin}
            onDelete={deleteMember}
            onEdit={() => openEditModal(user)}
          />
        ))}

      </div>

      <MemberModal
        isOpen={isUserModalOpen}
        onClose={closeUserModal}
        userToEdit={userToEdit}
        onSave={(data) => {
          console.log("Kaydedilen veri:", data);
          closeUserModal();
        }}
      />


    </div>
  )
}

export default Team
