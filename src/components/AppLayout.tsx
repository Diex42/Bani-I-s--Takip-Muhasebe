import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { Menu } from "lucide-react"
import { useState } from "react"


function AppLayout() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-row bg-bg overflow-hidden">

      {/*Mobil için Sidebar açılınca gelen overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 md:hidden
          ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'} `}
      />

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/*Ana İçerik Yeri */}
      <main className="flex-1 overflow-y-auto p-8 bg-bg">
        <Outlet />
      </main>
      
      {/*Mobil için Sidebar butonu */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className={`fixed md:hidden bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center rounded-t-full px-2 pt-2 bg-button transition-all duration-300
          ${isSidebarOpen ? 'translate-y-full' : ''} `}
      >
        <Menu className="w-9 h-9 text-bg" />
      </button>

    </div>
  )
}

export default AppLayout
